import { useState, useRef, useEffect } from "react";

const MISSIONS = [
  { id: 1, emoji: "💑", title: "Com os Noivos", desc: "Tire uma foto com os noivos" },
  { id: 2, emoji: "🤵", title: "Com os Padrinhos", desc: "Tire uma foto com os padrinhos" },
  { id: 3, emoji: "🎂", title: "Comendo o Bolo", desc: "Registre o momento de provar o bolo" },
  { id: 4, emoji: "💃", title: "Na Pista de Dança", desc: "Uma foto arrasando na pista!" },
  { id: 5, emoji: "🥂", title: "Brinde!", desc: "Foto no momento do brinde especial" },
  { id: 6, emoji: "🌸", title: "Parte Favorita", desc: "Foto da decoração que você mais amou" },
  { id: 7, emoji: "🤣", title: "Momento Engraçado", desc: "Capture algo divertido da festa" },
  { id: 8, emoji: "🤗", title: "Com a Família", desc: "Uma foto com familiares queridos" },
  { id: 9, emoji: "🍽️", title: "Prato da Festa", desc: "Foto do seu prato favorito do buffet" },
];

const STORAGE_KEY = "bingo_festa_progress";

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function App() {
  const [screen, setScreen] = useState("home"); // home | bingo | mission | winner
  const [progress, setProgress] = useState(loadProgress);
  const [selectedMission, setSelectedMission] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [showSeal, setShowSeal] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const fileInputRef = useRef();

  const completed = Object.keys(progress).filter((k) => progress[k]).length;
  const total = MISSIONS.length;
  const allDone = completed === total;

  useEffect(() => {
    saveProgress(progress);
    if (allDone && screen === "bingo") {
      setTimeout(() => {
        setScreen("winner");
        launchConfetti();
      }, 400);
    }
  }, [progress]);

  function launchConfetti() {
    const pieces = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      color: ["#f9c74f", "#f3722c", "#f8961e", "#90be6d", "#43aa8b", "#577590", "#f94144"][
        Math.floor(Math.random() * 7)
      ],
      size: 6 + Math.random() * 10,
      rotate: Math.random() * 360,
    }));
    setConfetti(pieces);
  }

  function handleMissionClick(mission) {
    setSelectedMission(mission);
    setPreviewPhoto(null);
    setScreen("mission");
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewPhoto(ev.target.result);
    reader.readAsDataURL(file);
  }

  function handleComplete() {
    setProgress((prev) => ({ ...prev, [selectedMission.id]: true }));
    setScreen("bingo");
    setSelectedMission(null);
    setPreviewPhoto(null);
  }

  function handleShowSeal() {
    setShowSeal(true);
  }

  // ── HOME ──────────────────────────────────────────────────────────────────
  if (screen === "home") {
    return (
      <div className="screen home-screen">
        <div className="home-petals">
          {["🌸", "🌺", "✨", "🌼", "💫", "🌸", "✨"].map((e, i) => (
            <span key={i} className="petal" style={{ "--i": i }}>{e}</span>
          ))}
        </div>
        <div className="home-content">
          <div className="home-badge">Foto Bingo</div>
          <h1 className="home-title">Bingo<br />de Fotos!</h1>
          <p className="home-sub">
            Complete todas as missões,<br />
            ganhe seu <strong>selo especial</strong> 🎖️<br />
            e leve uma <strong>lembraninha!</strong> 🎁
          </p>
          <div className="home-stats">
            <span>{total} missões para completar</span>
          </div>
          <button className="btn-primary" onClick={() => setScreen("bingo")}>
            Começar a Jogar ✨
          </button>
        </div>
      </div>
    );
  }

  // ── WINNER ────────────────────────────────────────────────────────────────
  if (screen === "winner") {
    return (
      <div className="screen winner-screen">
        {confetti.map((p) => (
          <div
            key={p.id}
            className="confetti-piece"
            style={{
              left: `${p.x}%`,
              animationDelay: `${p.delay}s`,
              backgroundColor: p.color,
              width: p.size,
              height: p.size,
              transform: `rotate(${p.rotate}deg)`,
            }}
          />
        ))}
        <div className="winner-content">
          <div className="winner-crown">👑</div>
          <h1 className="winner-title">Parabéns!</h1>
          <p className="winner-sub">Você completou todas as missões!</p>

          {!showSeal ? (
            <button className="btn-seal" onClick={handleShowSeal}>
              Revelar meu Selo 🎖️
            </button>
          ) : (
            <div className="seal-container">
              <div className="seal">
                <div className="seal-inner">
                  <div className="seal-star">⭐</div>
                  <div className="seal-text-top">BINGO</div>
                  <div className="seal-emoji">🏆</div>
                  <div className="seal-text-bottom">COMPLETO</div>
                </div>
              </div>
              <p className="seal-instruction">
                📲 Mostre esse selo para a gente<br />e ganhe sua <strong>lembrancinha!</strong> 🎁
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── MISSION ───────────────────────────────────────────────────────────────
  if (screen === "mission" && selectedMission) {
    return (
      <div className="screen mission-screen">
        <button className="btn-back" onClick={() => { setScreen("bingo"); setPreviewPhoto(null); }}>
          ← Voltar
        </button>
        <div className="mission-card-big">
          <div className="mission-emoji-big">{selectedMission.emoji}</div>
          <h2 className="mission-title-big">{selectedMission.title}</h2>
          <p className="mission-desc">{selectedMission.desc}</p>
        </div>

        {previewPhoto ? (
          <div className="photo-preview-wrap">
            <img src={previewPhoto} alt="preview" className="photo-preview" />
            <div className="photo-actions">
              <button className="btn-secondary" onClick={() => setPreviewPhoto(null)}>
                Trocar foto
              </button>
              <button className="btn-primary" onClick={handleComplete}>
                Confirmar ✅
              </button>
            </div>
          </div>
        ) : (
          <div className="photo-upload-area" onClick={() => fileInputRef.current.click()}>
            <div className="upload-icon">📸</div>
            <p>Toque para tirar ou<br />escolher uma foto</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
    );
  }

  // ── BINGO GRID ────────────────────────────────────────────────────────────
  return (
    <div className="screen bingo-screen">
      <div className="bingo-header">
        <h2 className="bingo-title">Foto Bingo 📸</h2>
        <div className="progress-wrap">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(completed / total) * 100}%` }} />
          </div>
          <span className="progress-label">{completed}/{total} missões</span>
        </div>
      </div>

      <div className="bingo-grid">
        {MISSIONS.map((m) => {
          const done = !!progress[m.id];
          return (
            <button
              key={m.id}
              className={`mission-card ${done ? "done" : ""}`}
              onClick={() => !done && handleMissionClick(m)}
            >
              {done && <div className="done-overlay">✅</div>}
              <div className="mission-emoji">{m.emoji}</div>
              <div className="mission-label">{m.title}</div>
            </button>
          );
        })}
      </div>

      {allDone && (
        <button className="btn-primary btn-winner" onClick={() => { setScreen("winner"); launchConfetti(); }}>
          Ver meu Selo 🎖️
        </button>
      )}
    </div>
  );
}