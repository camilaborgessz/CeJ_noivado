import { useRef, useState } from "react";
import {
  Heart, Video, PenLine, Music, Sparkles, Users, Cake, Laugh, Camera,
  ImageIcon, Film, Loader2, CheckCircle2, ArrowLeft,
} from "lucide-react";

const ICON_MAP = { Heart, Video, PenLine, Music, Sparkles, Users, Cake, Laugh, Camera };

function MissionIcon({ name, size = 36 }) {
  const Icon = ICON_MAP[name];
  return Icon ? <Icon size={size} /> : null;
}

const TYPE_LABEL = { photo: "Foto", video: "Vídeo", any: "Foto ou Vídeo" };

export default function MissionScreen({ mission, status, onBack, onSubmit }) {
  const [preview, setPreview]   = useState(null);
  const [previewUrl, setUrl]    = useState(null);
  const photoRef    = useRef();
  const videoRef    = useRef();
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
        <div className="status-spinner"><Loader2 size={52} /></div>
        <h3>Enviando para o álbum...</h3>
        <p>Sua mídia está indo direto para o álbum de João &amp; Camila.</p>
      </div>
    );
  }

  if (status === "success" || status === "error") {
    return (
      <div className="status-screen">
        <div className="status-icon status-icon-ok"><CheckCircle2 size={64} /></div>
        <h3>Missão Cumprida!</h3>
        <p>
          {status === "success"
            ? "Sua foto/vídeo foi salvo no álbum dos noivos."
            : "Progresso salvo! Verifique a conexão para o envio ao álbum."}
        </p>
      </div>
    );
  }

  return (
    <div className="mission-screen">
      <button className="btn-back" onClick={onBack}>
        <ArrowLeft size={16} /> Voltar
      </button>

      <div className="mission-hero">
        <div className="mission-icon-big">
          <MissionIcon name={mission.icon} size={40} />
        </div>
        <h2 className="mission-name">{mission.title}</h2>
        <p className="mission-desc">{mission.desc}</p>
        <div className="mission-type-badge">
          {mission.type === "video"
            ? <><Film size={13} /> Vídeo</>
            : mission.type === "any"
            ? <><Camera size={13} /> Foto ou <Film size={13} /> Vídeo</>
            : <><Camera size={13} /> Foto</>
          }
        </div>
      </div>

      {!preview ? (
        <div className="upload-options">
          {(mission.type === "photo" || mission.type === "any") && (
            <>
              <button className="upload-btn" onClick={() => photoRef.current.click()}>
                <Camera size={28} className="upload-btn-icon" />
                <strong>Tirar Foto</strong>
                <small>Abrir câmera</small>
              </button>
              <button className="upload-btn" onClick={() => anyPhotoRef.current.click()}>
                <ImageIcon size={28} className="upload-btn-icon" />
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
                <Video size={28} className="upload-btn-icon" />
                <strong>Gravar Vídeo</strong>
                <small>Abrir câmera</small>
              </button>
              <button className="upload-btn" onClick={() => anyVideoRef.current.click()}>
                <Film size={28} className="upload-btn-icon" />
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
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
