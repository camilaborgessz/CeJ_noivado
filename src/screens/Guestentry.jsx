import { useState } from "react";

export default function GuestEntry({ onSubmit }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  function handle() {
    if (name.trim().length < 2) {
      setError("Por favor, escreva seu nome completo 💕");
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    onSubmit(name.trim());
  }

  return (
    <div className="guest-screen">
      <div className="petals-layer" aria-hidden>
        {["🌸","✨","💕","🌺","💫"].map((p,i) => (
          <span key={i} className="petal" style={{ "--i": i, "--total": 5 }}>{p}</span>
        ))}
      </div>

      <div className="guest-card fade-in">
        <div className="guest-icon">🌸</div>
        <h2 className="guest-title">Olá, convidado!</h2>
        <p className="guest-sub">
          Como você se chama?<br/>
          Vamos guardar seu progresso pelo nome.
        </p>

        <div className={`input-wrap ${shake ? "shake" : ""}`}>
          <input
            className="name-input"
            type="text"
            placeholder="Seu nome completo"
            value={name}
            onChange={e => { setName(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handle()}
            autoFocus
          />
          {error && <p className="input-error">{error}</p>}
        </div>

        <button className="btn-primary" onClick={handle} disabled={!name.trim()}>
          Vamos lá! 💕
        </button>

        <p className="guest-note">
          Se você já jogou antes, seu progresso será recuperado automaticamente ✓
        </p>
      </div>
    </div>
  );
}