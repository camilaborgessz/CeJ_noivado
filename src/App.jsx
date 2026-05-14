import { useState } from "react";
import Home from "./screens/Home.jsx";
import GuestEntry from "./screens/Guestentry.jsx";
import BingoGrid from "./screens/Bingogrid.jsx";
import MissionScreen from "./screens/Missionscreen.jsx";
import WinnerScreen from "./screens/Winnerscreen.jsx";

export const MISSIONS = [
  { id: 1, icon: "Heart",    title: "Com os Noivos",      desc: "Tire uma foto com João e Camila. Esse registro é especial demais!", type: "photo" },
  { id: 2, icon: "Video",    title: "Mensagem de Amor",   desc: "Grave um vídeo mandando uma mensagem especial para os noivos. Do coração!", type: "video" },
  { id: 3, icon: "PenLine",  title: "Conselho dos Noivos",desc: "Preencha o cartãozinho com seu conselho e tire uma foto segurando ele.", type: "photo" },
  { id: 4, icon: "Music",    title: "Na Pista!",           desc: "Mostre seus passos! Foto ou vídeo arrasando na pista de dança.", type: "any" },
  { id: 5, icon: "Sparkles", title: "Brinde!",             desc: "Capture o momento do brinde especial. Saúde ao amor deles!", type: "photo" },
  { id: 6, icon: "Users",    title: "Com os Padrinhos",   desc: "Tire uma foto com os padrinhos da festa.", type: "photo" },
  { id: 7, icon: "Cake",     title: "Hora do Bolo",        desc: "Registre esse momento delicioso! Foto comendo o bolo dos noivos.", type: "photo" },
  { id: 8, icon: "Laugh",    title: "Momento Especial",   desc: "Capture algo divertido e inesquecível da festa!", type: "any" },
  { id: 9, icon: "Camera",   title: "Selfie em Grupo",    desc: "Selfie criativa com pelo menos 3 convidados. Quanto mais gente, melhor!", type: "photo" },
];

function getKey(name) {
  return "cej_bingo_" + name.toLowerCase().replace(/\s+/g, "_");
}

function loadProgress(name) {
  try { return JSON.parse(localStorage.getItem(getKey(name))) || {}; }
  catch { return {}; }
}

function saveProgress(name, data) {
  try { localStorage.setItem(getKey(name), JSON.stringify(data)); } catch {}
}

const DRIVE_URL = import.meta.env.VITE_DRIVE_UPLOAD_URL || "";

async function uploadToDrive(file, guestName, mission) {
  if (!DRIVE_URL) { await new Promise(r => setTimeout(r, 1400)); return; }
  const b64 = await new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload  = () => res(fr.result.split(",")[1]);
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });
  const ext = file.name.split(".").pop();
  const res = await fetch(DRIVE_URL, {
    method: "POST",
    body: JSON.stringify({
      fileName: `${guestName}_M${mission.id}_${mission.title.replace(/\s+/g,"_")}_${Date.now()}.${ext}`,
      mimeType: file.type,
      data: b64,
      guestName,
      missionTitle: mission.title,
    }),
  });
  if (!res.ok) throw new Error("upload failed");
}

export default function App() {
  const [screen,   setScreen]   = useState("home");
  const [guest,    setGuest]    = useState("");
  const [progress, setProgress] = useState({});
  const [mission,  setMission]  = useState(null);
  const [status,   setStatus]   = useState(null);

  const completed = Object.values(progress).filter(Boolean).length;
  const allDone   = completed === MISSIONS.length;

  function enterGuest(name) {
    setGuest(name);
    setProgress(loadProgress(name));
    setScreen("bingo");
  }

  function clickMission(m) {
    if (progress[m.id]) return;
    setMission(m); setStatus(null); setScreen("mission");
  }

  async function submitMedia(file) {
    setStatus("uploading");
    try {
      await uploadToDrive(file, guest, mission);
      setStatus("success");
    } catch {
      setStatus("error");
    }
    const next = { ...progress, [mission.id]: true };
    setProgress(next);
    saveProgress(guest, next);
    setTimeout(() => { setScreen("bingo"); setMission(null); setStatus(null); }, 1800);
  }

  return (
    <>
      {screen === "home"    && <Home    onStart={() => setScreen("guest")} />}
      {screen === "guest"   && <GuestEntry onSubmit={enterGuest} />}
      {screen === "bingo"   && <BingoGrid  guest={guest} progress={progress} completed={completed} allDone={allDone} onMission={clickMission} onWinner={() => setScreen("winner")} />}
      {screen === "mission" && mission && <MissionScreen mission={mission} status={status} onBack={() => { setScreen("bingo"); setMission(null); }} onSubmit={submitMedia} />}
      {screen === "winner"  && <WinnerScreen guest={guest} completed={completed} />}
    </>
  );
}
