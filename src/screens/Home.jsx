import { useEffect, useState } from "react";

const PETALS = ["🌸","🌺","✨","🌼","💫","🌹","✨","🌸","💕"];

export default function Home({ onStart }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div className="home-screen">
      {/* floating petals */}
      <div className="petals-layer" aria-hidden>
        {PETALS.map((p, i) => (
          <span key={i} className="petal" style={{ "--i": i, "--total": PETALS.length }}>{p}</span>
        ))}
      </div>

      {/* hero card */}
      <div className={`home-card ${visible ? "fade-in" : ""}`}>
        {/* couple photo placeholder */}
        <div className="couple-photo">
          <div className="photo-placeholder">
            <span>💑</span>
            <small>João &amp; Camila</small>
          </div>
        </div>

        <div className="home-tag">✦ Noivado ✦</div>
        <h1 className="home-names">João <span className="amp">&amp;</span> Camila</h1>
        <p className="home-date">Um dia inesquecível ♡</p>

        <div className="divider">
          <span>✦</span>
        </div>

        <p className="home-description">
          Que alegria ter você aqui com a gente! 🎉<br/>
          Participe do nosso <strong>Foto Bingo</strong>, complete as missões,<br/>
          e ganhe uma lembrancinha especial! 🎁
        </p>

        <div className="home-rules">
          <div className="rule"><span>📸</span><p>Tire fotos e grave vídeos nas missões</p></div>
          <div className="rule"><span>☁️</span><p>Tudo vai direto para o nosso álbum</p></div>
          <div className="rule"><span>🏆</span><p>Complete tudo e ganhe seu selo + brinde</p></div>
        </div>

        <button className="btn-start" onClick={onStart}>
          Começar as Missões ✨
        </button>
      </div>
    </div>
  );
}