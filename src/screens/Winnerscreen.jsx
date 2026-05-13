import { useEffect, useState } from "react";

function makeConfetti() {
  return Array.from({ length: 70 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2.5,
    dur: 2.5 + Math.random() * 1.5,
    color: ["#f9c74f","#f3722c","#f8961e","#90be6d","#e8556d","#c77dff","#48cae4"][i % 7],
    size: 6 + Math.random() * 9,
    shape: Math.random() > 0.5 ? "circle" : "rect",
  }));
}

export default function WinnerScreen({ guest, completed }) {
  const [showSeal, setShowSeal] = useState(false);
  const [confetti] = useState(makeConfetti);

  useEffect(() => {
    const t = setTimeout(() => setShowSeal(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="winner-screen">
      {confetti.map(p => (
        <div key={p.id} className={`confetti-piece ${p.shape}`} style={{
          left: `${p.x}%`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.dur}s`,
          backgroundColor: p.color,
          width: p.size, height: p.size,
        }} />
      ))}

      <div className="winner-content">
        <div className="winner-crown">👑</div>
        <h1 className="winner-title">Parabéns, {guest}!</h1>
        <p className="winner-sub">Você completou todas as missões do Foto Bingo!<br/>Suas memórias foram salvas no álbum de João &amp; Camila 💕</p>

        <div className={`seal-wrap ${showSeal ? "seal-animate" : ""}`}>
          {/* Outer star shape */}
          <div className="seal-star-shape">
            <div className="seal-body">
              <div className="seal-ring" />
              <div className="seal-center">
                <div className="seal-top-text">NOIVADO</div>
                <div className="seal-main-emoji">💍</div>
                <div className="seal-couple">João &amp; Camila</div>
                <div className="seal-bot-text">BINGO ✓</div>
              </div>
            </div>
          </div>
        </div>

        <div className="winner-instruction">
          <p>📲 <strong>Mostre esse selo para os noivos</strong><br/>e ganhe sua lembrancinha especial! 🎁</p>
        </div>

        <div className="winner-hearts">
          {["💕","✨","💍","✨","💕"].map((h,i) => (
            <span key={i} className="heart-float" style={{ "--hi": i }}>{h}</span>
          ))}
        </div>
      </div>
    </div>
  );
}