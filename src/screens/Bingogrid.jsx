import {
  Heart, Video, PenLine, Music, Sparkles, Users, Cake, Laugh, Camera,
  CheckCircle2, Trophy,
} from "lucide-react";
import { MISSIONS } from "../App.jsx";

const ICON_MAP = { Heart, Video, PenLine, Music, Sparkles, Users, Cake, Laugh, Camera };

function MissionIcon({ name, size = 26 }) {
  const Icon = ICON_MAP[name];
  return Icon ? <Icon size={size} /> : null;
}

export default function BingoGrid({ guest, progress, completed, allDone, onMission, onWinner }) {
  const total = MISSIONS.length;
  const pct   = Math.round((completed / total) * 100);

  return (
    <div className="bingo-screen">
      <div className="bingo-header">
        <div className="bingo-greeting">
          <span>Olá, <strong>{guest}</strong></span>
        </div>
        <h2 className="bingo-title">Foto Bingo</h2>
        <p className="bingo-sub">João &amp; Camila</p>

        <div className="progress-wrap">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="progress-label">{completed}/{total}</span>
        </div>
      </div>

      <div className="bingo-grid">
        {MISSIONS.map((m, idx) => {
          const done = !!progress[m.id];
          return (
            <button
              key={m.id}
              className={`mission-card ${done ? "done" : ""}`}
              onClick={() => onMission(m)}
              style={{ "--idx": idx }}
            >
              {done && (
                <div className="done-check">
                  <CheckCircle2 size={16} />
                </div>
              )}
              <div className="card-icon">
                <MissionIcon name={m.icon} size={26} />
              </div>
              <div className="card-label">{m.title}</div>
              <div className="card-type">
                {m.type === "video"
                  ? <Video size={12} />
                  : m.type === "any"
                  ? <><Camera size={12} /><Video size={12} /></>
                  : <Camera size={12} />
                }
              </div>
            </button>
          );
        })}
      </div>

      {allDone && (
        <button className="btn-winner-cta" onClick={onWinner}>
          <Trophy size={16} style={{ marginRight: 8, verticalAlign: "middle" }} />
          Ver meu Selo Especial
        </button>
      )}

      {!allDone && completed > 0 && (
        <p className="bingo-encourage">
          {completed === 1 ? "Ótimo começo! Continue." :
           completed < 5  ? "Você está indo muito bem!" :
                            "Quase lá! Força!"}
        </p>
      )}
    </div>
  );
}
