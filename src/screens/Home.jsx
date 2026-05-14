import { useEffect, useState } from "react";
import { Camera, Cloud, Trophy, ChevronRight } from "lucide-react";

const DECOS = ["◆", "◇", "◆", "◇", "◆"];

const STEPS = [
  { icon: Camera, num: "01", title: "Registre", desc: "Tire fotos e grave vídeos nas missões" },
  { icon: Cloud,  num: "02", title: "Compartilhe", desc: "Tudo vai direto para o álbum dos noivos" },
  { icon: Trophy, num: "03", title: "Conquiste", desc: "Complete tudo e ganhe seu selo especial" },
];

export default function Home({ onStart }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div className="home-screen">
      <div className="decos-layer" aria-hidden>
        {DECOS.map((d, i) => (
          <span key={i} className="deco-diamond home-deco" style={{ "--i": i }}>{d}</span>
        ))}
      </div>

      <div className={`home-card ${visible ? "fade-in" : ""}`}>

        {/* Monograma */}
        <div className="couple-monogram">
          <span className="mono-letter">J</span>
          <span className="mono-sep">◆</span>
          <span className="mono-letter">C</span>
        </div>

        <div className="home-tag">✦ &nbsp; N o i v a d o &nbsp; ✦</div>

        {/* Título empilhado com ornamentos */}
        <div className="home-names-block">
          <div className="names-ornament">
            <span className="ornament-line" />
            <span className="ornament-diamond">◆</span>
            <span className="ornament-line" />
          </div>
          <h1 className="home-names">
            <em className="name-word">João</em>
            <span className="name-amp">&amp;</span>
            <em className="name-word">Camila</em>
          </h1>
          <div className="names-ornament">
            <span className="ornament-line" />
            <span className="ornament-diamond">◆</span>
            <span className="ornament-line" />
          </div>
        </div>

        <p className="home-date">Comemore conosco</p>

        <p className="home-description">
          Que alegria ter você aqui com a gente!<br/>
          Participe do nosso{" "}
          <span className="kw-mark">bingo fotográfico</span>,
          complete as missões e ganhe uma{" "}
          <span className="kw-mark">lembrancinha especial</span>.
        </p>

        {/* Cards de passos interativos */}
        <div className="home-steps">
          {STEPS.map(({ icon: Icon, num, title, desc }, i) => (
            <div
              key={num}
              className={`step-card ${hovered === i ? "step-active" : ""}`}
              style={{ "--si": i }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="step-num">{num}</div>
              <div className="step-icon-wrap">
                <Icon size={20} />
              </div>
              <div className="step-text">
                <strong>{title}</strong>
                <span>{desc}</span>
              </div>
              <ChevronRight size={14} className="step-arrow" />
            </div>
          ))}
        </div>

        <button className="btn-start" onClick={onStart}>
          Começar as Missões
        </button>

      </div>
    </div>
  );
}
