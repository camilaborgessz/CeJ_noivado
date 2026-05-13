import { useRef, useState } from "react";

export default function MissionScreen({ mission, status, onBack, onSubmit }) {
  const [preview, setPreview]   = useState(null);
  const [previewUrl, setUrl]    = useState(null);
  const photoRef = useRef();
  const videoRef = useRef();
  const anyPhotoRef = useRef();
  const anyVideoRef = useRef();

  function pickFile(file) {
    if (!file) return;
    setPreview(file);
    setUrl(URL.createObjectURL(file));
  }

  const isVideo = preview && preview.type.startsWith("video");

  if (status === "uploading") {
    return (
      <div className="status-screen">
        <div className="status-spinner">🌸</div>
        <h3>Enviando para o álbum...</h3>
        <p>Sua mídia está indo direto para o álbum de João &amp; Camila 💕</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="status-screen success">
        <div className="status-icon">✅</div>
        <h3>Missão Cumprida!</h3>
        <p>Sua foto/vídeo foi salvo no álbum dos noivos 🎉</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="status-screen success">
        <div className="status-icon">✅</div>
        <h3>Missão Cumprida!</h3>
        <p>Progresso salvo! (verifique a conexão para o envio ao álbum)</p>
      </div>
    );
  }

  return (
    <div className="mission-screen">
      <button className="btn-back" onClick={onBack}>← Voltar</button>

      <div className="mission-hero">
        <div className="mission-emoji-big">{mission.emoji}</div>
        <h2 className="mission-name">{mission.title}</h2>
        <p className="mission-desc">{mission.desc}</p>
        <div className="mission-type-badge">
          {mission.type === "video" ? "🎥 Vídeo" : mission.type === "any" ? "📸 Foto ou 🎥 Vídeo" : "📸 Foto"}
        </div>
      </div>

      {!preview ? (
        <div className="upload-options">
          {(mission.type === "photo" || mission.type === "any") && (
            <>
              <button className="upload-btn" onClick={() => photoRef.current.click()}>
                <span>📸</span>
                <strong>Tirar Foto</strong>
                <small>Abrir câmera</small>
              </button>
              <button className="upload-btn" onClick={() => anyPhotoRef.current.click()}>
                <span>🖼️</span>
                <strong>Da Galeria</strong>
                <small>Escolher foto</small>
              </button>
              <input ref={photoRef} type="file" accept="image/*" capture="environment"
                style={{ display: "none" }} onChange={e => pickFile(e.target.files[0])} />
              <input ref={anyPhotoRef} type="file" accept="image/*"
                style={{ display: "none" }} onChange={e => pickFile(e.target.files[0])} />
            </>
          )}
          {(mission.type === "video" || mission.type === "any") && (
            <>
              <button className="upload-btn" onClick={() => videoRef.current.click()}>
                <span>🎥</span>
                <strong>Gravar Vídeo</strong>
                <small>Abrir câmera</small>
              </button>
              <button className="upload-btn" onClick={() => anyVideoRef.current.click()}>
                <span>📁</span>
                <strong>Da Galeria</strong>
                <small>Escolher vídeo</small>
              </button>
              <input ref={videoRef} type="file" accept="video/*" capture="environment"
                style={{ display: "none" }} onChange={e => pickFile(e.target.files[0])} />
              <input ref={anyVideoRef} type="file" accept="video/*"
                style={{ display: "none" }} onChange={e => pickFile(e.target.files[0])} />
            </>
          )}
        </div>
      ) : (
        <div className="preview-wrap">
          {isVideo
            ? <video src={previewUrl} controls className="media-preview" />
            : <img   src={previewUrl} alt="preview" className="media-preview" />
          }
          <div className="preview-actions">
            <button className="btn-secondary" onClick={() => { setPreview(null); setUrl(null); }}>
              Trocar
            </button>
            <button className="btn-primary" onClick={() => onSubmit(preview)}>
              Enviar ✅
            </button>
          </div>
        </div>
      )}
    </div>
  );
}