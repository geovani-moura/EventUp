import { useState } from "react";

// Hook câmera: web (input/file) e nativo (Capacitor)
const useCamera = () => {
  const [imagemPreview, setImagemPreview] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // detecta Capacitor
  const temCapacitor = typeof window !== "undefined" && window.Capacitor;

  // abrir câmera (nativo -> web)
  const abrirCamera = (onResult) => {
    if (temCapacitor) {
      // Uso nativo (Capacitor)
      usarCapacitorCamera(onResult);
    } else {
      // Fallback web: input file com attribute capture
      usarInputFileCapture("environment", onResult);
    }
  };

  // abrir galeria
  const abrirGaleria = (onResult) => {
    if (temCapacitor) {
      usarCapacitorCamera(onResult, true);
    } else {
      usarInputFile(onResult);
    }
  };

  // Fallback web: input file com capture (câmera)
  const usarInputFileCapture = (capture, onResult) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = capture;

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        processarArquivo(file, onResult);
      }
    };

    input.click();
  };

  // Fallback web: input file normal (galeria)
  const usarInputFile = (onResult) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        processarArquivo(file, onResult);
      }
    };

    input.click();
  };

  // Capacitor camera (se implementado)
  const usarCapacitorCamera = async (onResult) => {
    try {
      setCarregando(true);
      // por enquanto, usar fallback web
      usarInputFileCapture("environment", onResult);
      setCarregando(false);
    } catch (error) {
      console.error("Erro câmera:", error);
      usarInputFile(onResult);
      setCarregando(false);
    }
  };

  // gerar dataURL e chamar callback
  const processarArquivo = (file, onResult) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setImagemPreview(dataUrl);

      if (onResult) {
        onResult({
          arquivo: file,
          uri: dataUrl,
          nome: file.name,
          tipo: file.type,
          tamanho: file.size,
        });
      }
      setCarregando(false);
    };

    reader.onerror = () => {
      console.error("Erro ler arquivo");
      setCarregando(false);
    };

    reader.readAsDataURL(file);
  };

  return {
    abrirCamera,
    abrirGaleria,
    imagemPreview,
    setImagemPreview,
    carregando,
    temCapacitor,
  };
};

export default useCamera;
