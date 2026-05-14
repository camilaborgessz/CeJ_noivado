import { useEffect, useState } from "react";
import { Crown, Gem, Star, Diamond } from "lucide-react";

const CONFETTI_COLORS = [
  "#C9A84C","#EDD89A","#A07830","#D4C07A",
  "#F0E4C0","#B89040","#E8D5A0","#FAF3DC",
];

function makeConfetti() {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2.5,
    dur: 2.5 + Math.random() * 1.5,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 5 + Math.random() * 8,
    shape: Math.random() > 0.5 ? "circle" : "rect",
  }));
}

const WINNER_DECOS = [Star, Diamond, Star, Diamond, Star];

export default function WinnerScreen({ guest }) {
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
        <div className="winner-crown">
          <Crown size={56} />
        </div>
        <h1 className="winner-title">Parabéns, {guest}!</h1>
        <p className="winner-sub">
          Você completou todas as missões do Foto Bingo.<br/>
          Suas memórias foram salvas no álbum de João &amp; Camila.
        </p>

        <div className={`seal-wrap ${showSeal ? "seal-animate" : ""}`}>
          <div className="seal-star-shape">
            <div className="seal-body">
              <div className="seal-ring" />
              <div className="seal-center">
                <div className="seal-top-text">NOIVADO</div>
                <div className="seal-gem-icon"><Gem size={28} /></div>
                <div className="seal-couple">João &amp; Camila</div>
                <div className="seal-bot-text">BINGO ✓</div>
              </div>
            </div>
          </div>
        </div>

        <div className="winner-instruction">
          <p><strong>Mostre esse selo para os noivos</strong><br/>e ganhe sua lembrancinha especial!</p>
        </div>

        <div className="winner-decos">
          {WINNER_DECOS.map((Icon, i) => (
            <span key={i} className="winner-deco-item" style={{ "--hi": i }}>
              <Icon size={i % 2 === 0 ? 18 : 14} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
