import { MISSIONS } from "../App.jsx";

export default function BingoGrid({ guest, progress, completed, allDone, onMission, onWinner }) {
  const total = MISSIONS.length;
  const pct   = Math.round((completed / total) * 100);

  return (
    <div className="bingo-screen">
      <div className="bingo-header">
        <div className="bingo-greeting">
          <span className="bingo-wave">👋</span>
          <span>Olá, <strong>{guest}</strong>!</span>
        </div>
        <h2 className="bingo-title">Foto Bingo</h2>
        <p className="bingo-sub">João &amp; Camila ♡</p>

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
              {done && <div className="done-check">✅</div>}
              <div className="card-emoji">{m.emoji}</div>
              <div className="card-label">{m.title}</div>
              <div className="card-type">{m.type === "video" ? "🎥" : m.type === "any" ? "📸🎥" : "📸"}</div>
            </button>
          );
        })}
      </div>

      {allDone && (
        <button className="btn-winner-cta" onClick={onWinner}>
          🏆 Ver meu Selo de Campeão!
        </button>
      )}

      {!allDone && completed > 0 && (
        <p className="bingo-encourage">
          {completed === 1 ? "Ótimo começo! Continue! 🌸" :
           completed < 5  ? "Você está indo muito bem! 💕" :
                            "Quase lá! Força! ✨"}
        </p>
      )}
    </div>
  );
}