import React, { useState, useEffect, useMemo } from "react";
// Agrega esto cerca de donde están tus otros useState

export default function Quiz() {
  console.log("Quiz component loaded successfully");
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState([]);
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const userId = `user_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  // Tracking simple
  const trackProgress = async (screenNumber) => {
    console.log(`INTENTANDO enviar pantalla ${screenNumber}`); // ← AGREGA ESTA LÍNEA
    try {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = `https://docs.google.com/forms/d/1K8X9wLYN1qQyy4-a4zvlEhUgS9B7m2mFzBKaGqrA5nY/formResponse?entry.1918518787=${userId}&entry.413958521=${screenNumber}&submit=Submit`;

      document.body.appendChild(iframe);
      console.log(`Pantalla ${screenNumber} enviada a Google Forms`);

      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const staticData = useMemo(
    () => ({
      genders: [
        {
          gender: "masculino",
          emoji: "👨",
          text: "Masculino",
          gradient: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
        },
        {
          gender: "femenino",
          emoji: "👩",
          text: "Femenino",
          gradient: "linear-gradient(135deg, #EC4899, #F59E0B)",
        },
      ],
      distractionOptions: [
        {
          emoji: "🤯",
          text: "Me distraigo todo el tiempo, si pasa una mosca pierdo la atención",
        },
        { emoji: "😅", text: "Ocasionalmente" },
        { emoji: "🙂", text: "Rara vez pierdo la concentración" },
        { emoji: "🤓", text: "Siempre estoy muy concentrado" },
      ],
    }),
    []
  );
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const returnScreen = urlParams.get("return_screen");

    if (returnScreen === "15") {
      window.history.replaceState({}, document.title, window.location.pathname);

      setCurrentScreen(15);
      setTimeout(() => setCurrentScreen(15), 100);
      setTimeout(() => setCurrentScreen(15), 300);
      setTimeout(() => setCurrentScreen(15), 500);
    }
  }, []);
  useEffect(() => {
    if (step === 15 && timeLeft === null) {
      setTimeLeft(300); // Inicia el contador solo cuando llega a la pantalla 15
    }
  }, [step]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);
  useEffect(() => {
    if (step === 8) {
      setProgress(0);
      const timer = setInterval(() => {
        setProgress((p) =>
          p >= 100
            ? (clearInterval(timer), setTimeout(() => setStep(9), 1000), 100)
            : p + 3.33
        );
      }, 100);
      return () => clearInterval(timer);
    }
  }, [step]);
  useEffect(() => {
    // Múltiples métodos para asegurar que funcione
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      trackProgress(step);
    };

    // Scroll inmediato
    scrollToTop();

    // Scroll con delays
    setTimeout(scrollToTop, 10);
    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 100);
    setTimeout(scrollToTop, 200);
  }, [step]);

  const handleMultiple = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const next = (key, value) => {
    setAnswers({ ...answers, [key]: value });
    setStep(step + 1);
    // Tracking - registrar la nueva pantalla
    // Tracking - registrar la nueva pantalla
    trackProgress(step + 1);

    // Múltiples intentos de scroll
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 300);
  };

  const s = {
    container: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "40px 20px", // Aumenta el padding
      paddingTop: "60px",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "30px",
      width: "min(800px, 90vw)",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      margin: "0px",
    },
    title: {
      fontSize: "clamp(20px, 5vw, 28px)",
      fontWeight: "800",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textAlign: "center",
      marginBottom: "6px",
      lineHeight: "1.2",
    },
    button: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "16px",
      padding: "14px 20px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 10px 25px -5px rgba(102, 126, 234, 0.4)",
      width: "100%",
    },
    option: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      border: "2px solid rgba(102, 126, 234, 0.2)",
      borderRadius: "16px",
      padding: "16px",
      margin: "10px 0",
      cursor: "pointer",
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      textAlign: "left",
      boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.1)",
    },
    input: {
      width: "100%",
      padding: "16px 20px",
      fontSize: "16px",
      border: "2px solid rgba(79, 70, 229, 0.2)",
      borderRadius: "16px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(10px)",
      outline: "none",
      boxSizing: "border-box",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.1)",
      fontWeight: "500",
      color: "#1F2937",
      marginBottom: "20px",
    },
    // 🖼️ NUEVO: Estilos para la imagen
    testimonialImage: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid rgba(79, 70, 229, 0.2)",
      boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.1)",
      marginRight: "12px",
    },
  };

  const OptionButton = ({ onClick, children }) => (
    <button
      onClick={onClick}
      style={s.option}
      onMouseEnter={(e) => (
        (e.target.style.transform = "translateY(-4px)"),
        (e.target.style.boxShadow = "0 15px 30px -5px rgba(79, 70, 229, 0.3)")
      )}
      onMouseLeave={(e) => (
        (e.target.style.transform = "translateY(0)"),
        (e.target.style.boxShadow = "0 4px 15px -3px rgba(0, 0, 0, 0.1)")
      )}
    >
      {children}
    </button>
  );

  const data = {
    1: {
      genders: [
        {
          gender: "masculino",
          emoji: "👨",
          text: "Masculino",
          gradient: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
        },
        {
          gender: "femenino",
          emoji: "👩",
          text: "Femenino",
          gradient: "linear-gradient(135deg, #EC4899, #F59E0B)",
        },
      ],
    },
    2: [
      {
        emoji: "🤯",
        text: "Me distraigo todo el tiempo, si pasa una mosca pierdo la atención",
      },
      { emoji: "😅", text: "Ocasionalmente" },
      { emoji: "🙂", text: "Rara vez pierdo la concentración" },
      { emoji: "🤓", text: "Siempre estoy muy concentrado" },
    ],
    3: [
      {
        title: "Nunca",
        emoji: "⏰",
        gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
      },
      {
        title: "Casi nunca",
        emoji: "⏳",
        gradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
      },
      {
        title: "A menudo",
        emoji: "🤔",
        gradient: "linear-gradient(135deg, #EC4899, #BE185D)",
      },
      {
        title: "Siempre",
        emoji: "🏃‍♂️",
        gradient: "linear-gradient(135deg, #10B981, #047857)",
      },
    ],
    5: [
      { emoji: "😴", text: "Siempre" },
      { emoji: "🤔", text: "A veces" },
      { emoji: "📖", text: "Casi nunca" },
      { emoji: "📚", text: "Nunca" },
    ],
    6: [
      { emoji: "😔", text: "Sí, mucho" },
      { emoji: "😊", text: "No" },
    ],
    7: [
      { emoji: "😔", text: "Pierdo el tiempo volviendo a leer varias veces" },
      { emoji: "📈", text: "La lista de lecturas pendientes sigue creciendo" },
      { emoji: "😕", text: "Leo, leo, leo, reviso y no entiendo" },
      { emoji: "😰", text: "Me siento ansioso por mucho contenido pendiente" },
    ],
  };

  const screens = {
    1: (
      <div>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={s.title}>Aumenta tu</h1>
          <h1
            style={{
              ...s.title,
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            velocidad de lectura
          </h1>
          <h1 style={s.title}>sin perder capacidad de</h1>
          <h1
            style={{
              ...s.title,
              background: "linear-gradient(135deg, #EC4899, #F59E0B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            comprensión
          </h1>
          <p
            style={{
              fontSize: "clamp(14px, 4vw, 18px)",
              color: "#6B7280",
              textAlign: "center",
              marginBottom: "20px",
              fontWeight: "500",
            }}
          >
            Test rápido, menos de 1 minuto
          </p>
          <div
            style={{
              background: "linear-gradient(135deg, #10B981, #059669)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "25px",
              display: "inline-block",
              fontSize: "clamp(12px, 3vw, 14px)",
              fontWeight: "600",
              boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)",
            }}
          >
            Para empezar, elije tu género
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          {data[1].genders.map((option) => (
            <button
              key={option.gender}
              onClick={() => next("gender", option.gender)}
              style={{
                ...s.option,
                flexDirection: "column",
                height: "auto",
                background:
                  "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                padding: "20px 12px",
              }}
            >
              <div
                style={{
                  width: "clamp(60px, 15vw, 80px)",
                  height: "clamp(60px, 15vw, 80px)",
                  background: option.gradient,
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(24px, 6vw, 40px)",
                  marginBottom: "12px",
                  boxShadow: "0 8px 20px -5px rgba(59, 130, 246, 0.4)",
                }}
              >
                {option.emoji}
              </div>
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "clamp(14px, 4vw, 18px)",
                  margin: 0,
                  color: "#1F2937",
                }}
              >
                {option.text}
              </p>
            </button>
          ))}
        </div>
        <div
          style={{
            fontSize: "10px",
            color: "#9CA3AF",
            textAlign: "center",
            lineHeight: "1.4",
            padding: "0 10px",
          }}
        >
          <p style={{ margin: "2px 0" }}>
            Al continuar, aceptas nuestros términos y condiciones
          </p>
          <p style={{ margin: "2px 0" }}>Política de privacidad y cookies</p>
        </div>
      </div>
    ),
    2: (
      <div>
        <h2
          style={{
            fontSize: "clamp(18px, 5vw, 24px)",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "24px",
            color: "#1F2937",
            lineHeight: "1.3",
          }}
        >
          ¿Te{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            distraes fácilmente
          </span>{" "}
          mientras lees?
        </h2>
        {data[2].map((option, i) => (
          <OptionButton
            key={i}
            onClick={() => next("distraction", option.text)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontSize: "clamp(20px, 5vw, 28px)",
                  marginRight: "12px",
                  flexShrink: 0,
                }}
              >
                {option.emoji}
              </span>
              <span
                style={{
                  fontSize: "clamp(13px, 3.5vw, 16px)",
                  color: "#374151",
                  fontWeight: "500",
                  lineHeight: "1.3",
                }}
              >
                {option.text}
              </span>
            </div>
            <div
              style={{
                width: "28px",
                height: "28px",
                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "16px",
                flexShrink: 0,
              }}
            >
              →
            </div>
          </OptionButton>
        ))}
      </div>
    ),
    3: (
      <div>
        <h2
          style={{
            fontSize: "clamp(18px, 5vw, 24px)",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "24px",
            color: "#1F2937",
          }}
        >
          ¿Dejas las cosas para el último momento?
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {data[3].map((option) => (
            <button
              key={option.title}
              onClick={() => next("procrastination", option.title)}
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "20px",
                padding: "16px 12px",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
                boxShadow: "0 6px 20px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  width: "clamp(50px, 12vw, 72px)",
                  height: "clamp(50px, 12vw, 72px)",
                  background: option.gradient,
                  borderRadius: "16px",
                  margin: "0 auto 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(20px, 5vw, 32px)",
                  boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.3)",
                }}
              >
                {option.emoji}
              </div>
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "clamp(14px, 4vw, 18px)",
                  margin: 0,
                  color: "#1F2937",
                }}
              >
                {option.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    ),
    4: (
      <div>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "32px",
            color: "#1F2937",
          }}
        >
          Soy{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Gabriel
          </span>{" "}
          ¿cómo te llamas{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #EC4899, #F59E0B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            tú?
          </span>
        </h2>
        <input
          type="text"
          placeholder="Introduce tu nombre..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && name.trim() && setStep(5)}
          style={s.input}
        />
        <button
          onClick={() => setStep(5)}
          disabled={!name.trim()}
          style={{
            ...s.button,
            background: name.trim()
              ? "linear-gradient(135deg, #4F46E5, #7C3AED)"
              : "linear-gradient(135deg, #9CA3AF, #6B7280)",
            cursor: name.trim() ? "pointer" : "not-allowed",
            marginBottom: "24px",
          }}
        >
          Continuar
        </button>
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            padding: "20px",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "#065F46",
              textAlign: "center",
              margin: 0,
              fontWeight: "500",
            }}
          >
            Para ayudarte de forma personalizada, necesito conocerte un poco
            mejor. 📚{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "600",
              }}
            >
              ¡Imagínate que sí!
            </span>
          </p>
        </div>
      </div>
    ),
    5: (
      <div>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "32px",
            color: "#1F2937",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {name}
          </span>
          , ¿te{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #EC4899, #F59E0B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            quedas dormido
          </span>{" "}
          mientras lees?
        </h2>
        {data[5].map((option, i) => (
          <OptionButton key={i} onClick={() => next("sleepy", option.text)}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "28px", marginRight: "16px" }}>
                {option.emoji}
              </span>
              <span
                style={{
                  fontSize: "18px",
                  color: "#374151",
                  fontWeight: "500",
                }}
              >
                {option.text}
              </span>
            </div>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "18px",
              }}
            >
              →
            </div>
          </OptionButton>
        ))}
      </div>
    ),
    6: (
      <div>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "32px",
            color: "#1F2937",
          }}
        >
          ¿Te sientes{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #EC4899, #F59E0B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            culpable o mal
          </span>{" "}
          por ello?
        </h2>
        {data[6].map((option, i) => (
          <OptionButton key={i} onClick={() => next("guilt", option.text)}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "28px", marginRight: "16px" }}>
                {option.emoji}
              </span>
              <span
                style={{
                  fontSize: "18px",
                  color: "#374151",
                  fontWeight: "500",
                }}
              >
                {option.text}
              </span>
            </div>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "18px",
              }}
            >
              →
            </div>
          </OptionButton>
        ))}
      </div>
    ),
    7: (
      <div>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "16px",
            color: "#1F2937",
          }}
        >
          Cuando esto sucede ¿Cuáles cree usted que son las consecuencias
          negativas?
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#6B7280",
            marginBottom: "24px",
            fontSize: "14px",
          }}
        >
          Seleccione una o más opciones para continuar
        </p>
        {data[7].map((option, i) => (
          <div
            key={i}
            onClick={() => handleMultiple(option.text)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              margin: "4px 0",
              backgroundColor: selected.includes(option.text)
                ? "#DBEAFE"
                : "#EBF3FF",
              border: `2px solid ${
                selected.includes(option.text)
                  ? "#3B82F6"
                  : "rgba(102, 126, 234, 0.2)"
              }`,
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            <span style={{ fontSize: "20px", marginRight: "12px" }}>
              {option.emoji}
            </span>
            <span
              style={{
                fontSize: "14px",
                flex: 1,
                color: "#374151",
                fontWeight: "500",
              }}
            >
              {option.text}
            </span>
            <div
              style={{
                width: "20px",
                height: "20px",
                border: "2px solid #4F46E5",
                borderRadius: "4px",
                backgroundColor: selected.includes(option.text)
                  ? "#4F46E5"
                  : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "14px",
              }}
            >
              {selected.includes(option.text) ? "✓" : ""}
            </div>
          </div>
        ))}
        {selected.length > 0 && (
          <button
            onClick={() => (
              setAnswers({ ...answers, consequences: selected }), setStep(8)
            )}
            style={{ ...s.button, marginTop: "20px" }}
          >
            Continuar
          </button>
        )}
      </div>
    ),
    8: (
      <div>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "16px",
              color: "#1F2937",
            }}
          >
            Testimonios de estudiantes del Método FocusRead
          </h2>
          <p
            style={{ fontSize: "14px", color: "#6B7280", marginBottom: "16px" }}
          >
            <span style={{ fontWeight: "600" }}>{name}</span>, no eres un
            conejillo de indias. El Método MIL cuenta con{" "}
            <span style={{ color: "#4F46E5", fontWeight: "600" }}>
              más de 10,000 estudiantes
            </span>{" "}
            y recibimos testimonios diarios sobre mejoras en la velocidad y
            comprensión lectora.
          </p>
          <div style={{ textAlign: "left", marginBottom: "16px" }}>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Analizando tus respuestas
            </p>
            <div
              style={{
                width: "100%",
                height: "8px",
                backgroundColor: "#e5e7eb",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "8px",
                  background: "linear-gradient(90deg, #4F46E5, #7C3AED)",
                  borderRadius: "10px",
                  transition: "width 0.1s",
                }}
              ></div>
            </div>
            <p
              style={{
                textAlign: "right",
                fontSize: "12px",
                color: "#6B7280",
                marginTop: "4px",
              }}
            >
              {Math.round(progress)}%
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <img
              src="/images/estudiantes.webp"
              alt="Testimonio"
              loading="lazy"
              style={{
                width: "100%",
                maxWidth: "320px", // puedes ajustar este valor
                height: "auto",
                borderRadius: "12px",
                objectFit: "cover",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    9: (
      <div>
        <h2
          style={{
            fontSize: "clamp(18px, 5vw, 24px)",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "16px",
            color: "#1F2937",
            lineHeight: "1.3",
          }}
        >
          ¿Eres{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            neurodivergente?
          </span>
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#6B7280",
            marginBottom: "20px",
            fontSize: "clamp(12px, 3vw, 14px)",
            fontWeight: "500",
          }}
        >
          Seleccione una o más opciones para continuar
        </p>
        <p
          style={{
            textAlign: "center",
            color: "#10B981",
            marginBottom: "24px",
            fontSize: "clamp(11px, 3vw, 12px)",
            fontWeight: "600",
          }}
        >
          *Tu puntuación se revelará en las siguientes pantallas.
        </p>

        {["No sé", "No", "TDAH/TDA", "Dislexia"].map((option, i) => (
          <div
            key={i}
            onClick={() => handleMultiple(option)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              margin: "10px 0",
              backgroundColor: selected.includes(option)
                ? "rgba(79, 70, 229, 0.1)"
                : "rgba(255, 255, 255, 0.8)",
              border: `2px solid ${
                selected.includes(option)
                  ? "#4F46E5"
                  : "rgba(102, 126, 234, 0.2)"
              }`,
              borderRadius: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              if (!selected.includes(option)) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 8px 20px -3px rgba(79, 70, 229, 0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (!selected.includes(option)) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px -3px rgba(0, 0, 0, 0.1)";
              }
            }}
          >
            <span
              style={{
                fontSize: "clamp(14px, 4vw, 16px)",
                color: selected.includes(option) ? "#4F46E5" : "#374151",
                fontWeight: selected.includes(option) ? "600" : "500",
              }}
            >
              {option}
            </span>
            <div
              style={{
                width: "20px",
                height: "20px",
                border: `2px solid ${
                  selected.includes(option) ? "#4F46E5" : "#D1D5DB"
                }`,
                borderRadius: "4px",
                backgroundColor: selected.includes(option)
                  ? "#4F46E5"
                  : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "12px",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
            >
              {selected.includes(option) ? "✓" : ""}
            </div>
          </div>
        ))}

        {selected.length > 0 && (
          <button
            onClick={() => (
              setAnswers({ ...answers, neurodivergent: selected }), setStep(10)
            )}
            style={{
              ...s.button,
              marginTop: "20px",
              fontSize: "clamp(14px, 4vw, 16px)",
              fontWeight: "600",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow =
                "0 15px 30px -5px rgba(102, 126, 234, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow =
                "0 10px 25px -5px rgba(102, 126, 234, 0.4)";
            }}
          >
            Continuar
          </button>
        )}
      </div>
    ),
    javascript10: (
      <div>
        <h2
          style={{
            fontSize: "clamp(18px, 5vw, 24px)",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "16px",
            color: "#1F2937",
            lineHeight: "1.3",
          }}
        >
          ¿Cuál es tu{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            mayor objetivo
          </span>{" "}
          para mejorar tu lectura?
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#6B7280",
            marginBottom: "24px",
            fontSize: "clamp(12px, 3vw, 14px)",
            fontWeight: "500",
          }}
        >
          Seleccione una o más opciones para continuar
        </p>

        {[
          {
            emoji: "🧠",
            text: "Aprender más rápido",
            color: "linear-gradient(135deg, #EC4899, #F59E0B)",
          },
          {
            emoji: "🧡",
            text: "Ser una persona más inteligente",
            color: "linear-gradient(135deg, #F59E0B, #D97706)",
          },
          {
            emoji: "📊",
            text: "Mejorar mi desempeño laboral",
            color: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
          },
          {
            emoji: "🌍",
            text: "Aprender una nueva habilidad o idioma",
            color: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
          },
        ].map((option, i) => (
          <div
            key={i}
            onClick={() => handleMultiple(option.text)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px 20px",
              margin: "10px 0",
              backgroundColor: selected.includes(option.text)
                ? "rgba(79, 70, 229, 0.1)"
                : "rgba(255, 255, 255, 0.8)",
              border: `2px solid ${
                selected.includes(option.text)
                  ? "#4F46E5"
                  : "rgba(102, 126, 234, 0.2)"
              }`,
              borderRadius: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              if (!selected.includes(option.text)) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 8px 20px -3px rgba(79, 70, 229, 0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (!selected.includes(option.text)) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px -3px rgba(0, 0, 0, 0.1)";
              }
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background: option.color,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                marginRight: "16px",
                boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.2)",
              }}
            >
              {option.emoji}
            </div>
            <span
              style={{
                fontSize: "clamp(14px, 4vw, 16px)",
                color: selected.includes(option.text) ? "#4F46E5" : "#374151",
                fontWeight: selected.includes(option.text) ? "600" : "500",
                flex: 1,
              }}
            >
              {option.text}
            </span>
            <div
              style={{
                width: "20px",
                height: "20px",
                border: `2px solid ${
                  selected.includes(option.text) ? "#4F46E5" : "#D1D5DB"
                }`,
                borderRadius: "4px",
                backgroundColor: selected.includes(option.text)
                  ? "#4F46E5"
                  : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "12px",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
            >
              {selected.includes(option.text) ? "✓" : ""}
            </div>
          </div>
        ))}

        {selected.length > 0 && (
          <button
            onClick={() => (
              setAnswers({ ...answers, goals: selected }), setStep(11)
            )}
            style={{
              ...s.button,
              marginTop: "20px",
              fontSize: "clamp(14px, 4vw, 16px)",
              fontWeight: "600",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow =
                "0 15px 30px -5px rgba(102, 126, 234, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow =
                "0 10px 25px -5px rgba(102, 126, 234, 0.4)";
            }}
          >
            Continuar
          </button>
        )}
      </div>
    ),
    10: (
      <div>
        <h2
          style={{
            fontSize: "clamp(18px, 5vw, 24px)",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "16px",
            color: "#1F2937",
            lineHeight: "1.3",
          }}
        >
          ¿Cuál es tu{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            mayor objetivo
          </span>{" "}
          para mejorar tu lectura?
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#6B7280",
            marginBottom: "16px",
            fontSize: "clamp(12px, 3vw, 14px)",
            fontWeight: "500",
          }}
        >
          Seleccione una o más opciones para continuar
        </p>

        {[
          {
            emoji: "🧠",
            text: "Aprender más rápido",
            color: "linear-gradient(135deg, #EC4899, #F59E0B)",
          },
          {
            emoji: "🧡",
            text: "Ser una persona más inteligente",
            color: "linear-gradient(135deg, #F59E0B, #D97706)",
          },
          {
            emoji: "📊",
            text: "Mejorar mi desempeño laboral",
            color: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
          },
          {
            emoji: "🌍",
            text: "Aprender una nueva habilidad o idioma",
            color: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
          },
        ].map((option, i) => (
          <div
            key={i}
            onClick={() => handleMultiple(option.text)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12x 16px",
              margin: "6px 0",
              backgroundColor: selected.includes(option.text)
                ? "rgba(79, 70, 229, 0.1)"
                : "rgba(255, 255, 255, 0.8)",
              border: `2px solid ${
                selected.includes(option.text)
                  ? "#4F46E5"
                  : "rgba(102, 126, 234, 0.2)"
              }`,
              borderRadius: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              if (!selected.includes(option.text)) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 8px 20px -3px rgba(79, 70, 229, 0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (!selected.includes(option.text)) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px -3px rgba(0, 0, 0, 0.1)";
              }
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background: option.color,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                marginRight: "16px",
                boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.2)",
              }}
            >
              {option.emoji}
            </div>
            <span
              style={{
                fontSize: "clamp(14px, 4vw, 16px)",
                color: selected.includes(option.text) ? "#4F46E5" : "#374151",
                fontWeight: selected.includes(option.text) ? "600" : "500",
                flex: 1,
              }}
            >
              {option.text}
            </span>
            <div
              style={{
                width: "20px",
                height: "20px",
                border: `2px solid ${
                  selected.includes(option.text) ? "#4F46E5" : "#D1D5DB"
                }`,
                borderRadius: "4px",
                backgroundColor: selected.includes(option.text)
                  ? "#4F46E5"
                  : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "12px",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
            >
              {selected.includes(option.text) ? "✓" : ""}
            </div>
          </div>
        ))}

        {selected.length > 0 && (
          <button
            onClick={() => (
              setAnswers({ ...answers, goals: selected }), setStep(11)
            )}
            style={{
              ...s.button,
              marginTop: "20px",
              fontSize: "clamp(14px, 4vw, 16px)",
              fontWeight: "600",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow =
                "0 15px 30px -5px rgba(102, 126, 234, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow =
                "0 10px 25px -5px rgba(102, 126, 234, 0.4)";
            }}
          >
            Continuar
          </button>
        )}
      </div>
    ),
    11: (
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* Título */}
        <h2
          style={{
            fontSize: "clamp(18px, 4.5vw, 24px)",
            fontWeight: "800",
            textAlign: "center",
            margin: "0",
            color: "#1F2937",
            lineHeight: "1.2",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {name}
          </span>
        </h2>

        {/* Card de puntuación */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(124, 58, 237, 0.05))",
            border: "1px solid rgba(79, 70, 229, 0.2)",
            borderRadius: "12px",
            padding: "12px",
            backdropFilter: "blur(10px)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "clamp(13px, 3.5vw, 15px)",
              color: "#374151",
              marginBottom: "4px",
              fontWeight: "500",
              lineHeight: "1.2",
            }}
          >
            En base a tus respuestas,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #EC4899, #F59E0B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "700",
              }}
            >
              tu puntuación es de {Math.floor(Math.random() * 7) + 22}
            </span>
          </p>
          <p
            style={{
              fontSize: "clamp(12px, 3vw, 14px)",
              color: "#6B7280",
              margin: 0,
              fontWeight: "500",
              lineHeight: "1.2",
            }}
          >
            <span style={{ fontWeight: "600", color: "#EC4899" }}>
              sobre 100 puntos
            </span>
            , necesitas y estás listo para leer más rápido, comprender mejor,
            memorizar más y eliminar el estrés mientras lees.
          </p>
        </div>

        {/* Gráfico simple y funcional */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "12px",
            padding: "12px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(79, 70, 229, 0.1)",
          }}
        >
          <svg
            width="100%"
            height="120"
            viewBox="0 0 300 120"
            style={{ display: "block" }}
          >
            <defs>
              <linearGradient
                id="curveGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#EF4444", stopOpacity: 1 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "#F59E0B", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#10B981", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>

            {/* Línea base */}
            <line
              x1="40"
              y1="80"
              x2="260"
              y2="80"
              stroke="rgba(107, 114, 128, 0.2)"
              strokeWidth="1"
            />

            {/* Curva exponencial natural */}
            <path
              d="M 50 75 Q 120 65 150 50 Q 200 25 250 15"
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                strokeDasharray: "250",
                strokeDashoffset: "250",
                animation: "drawCurve 1.5s ease-out forwards",
              }}
            />

            {/* Puntos */}
            <circle
              cx="50"
              cy="75"
              r="4"
              fill="#EF4444"
              style={{
                opacity: 0,
                animation: "fadeInPoint 0.4s ease-out 0.5s forwards",
              }}
            />
            <circle
              cx="150"
              cy="50"
              r="4"
              fill="#F59E0B"
              style={{
                opacity: 0,
                animation: "fadeInPoint 0.4s ease-out 1s forwards",
              }}
            />
            <circle
              cx="250"
              cy="15"
              r="4"
              fill="#10B981"
              style={{
                opacity: 0,
                animation: "fadeInPoint 0.4s ease-out 1.5s forwards",
              }}
            />

            {/* Etiquetas ARRIBA de los puntos - bien separadas */}
            <text
              x="50"
              y="65"
              textAnchor="middle"
              fill="#EF4444"
              fontSize="10"
              fontWeight="600"
              style={{
                opacity: 0,
                animation: "fadeInPoint 0.4s ease-out 0.7s forwards",
              }}
            >
              Tú hoy
            </text>
            <text
              x="150"
              y="40"
              textAnchor="middle"
              fill="#F59E0B"
              fontSize="10"
              fontWeight="600"
              style={{
                opacity: 0,
                animation: "fadeInPoint 0.4s ease-out 1.2s forwards",
              }}
            >
              7 días
            </text>
            <text
              x="250"
              y="35"
              textAnchor="middle"
              fill="#10B981"
              fontSize="10"
              fontWeight="600"
              style={{
                opacity: 0,
                animation: "fadeInPoint 0.4s ease-out 1.7s forwards",
              }}
            >
              14 días
            </text>

            {/* Etiquetas del eje X - bien separadas */}
            <text
              x="50"
              y="95"
              textAnchor="middle"
              fill="#6B7280"
              fontSize="10"
              fontWeight="500"
            >
              Poco
            </text>
            <text
              x="150"
              y="95"
              textAnchor="middle"
              fill="#6B7280"
              fontSize="10"
              fontWeight="500"
            >
              Medio
            </text>
            <text
              x="250"
              y="95"
              textAnchor="middle"
              fill="#6B7280"
              fontSize="10"
              fontWeight="500"
            >
              Mucho
            </text>
          </svg>
        </div>

        {/* Texto de promedio */}
        <p
          style={{
            fontSize: "clamp(11px, 2.8vw, 13px)",
            color: "#6B7280",
            textAlign: "center",
            margin: "0",
            fontWeight: "500",
            lineHeight: "1.1",
          }}
        >
          Promedio: Por debajo del promedio - Lectura básica
        </p>

        {/* Botón */}
        <button
          onClick={() => setStep(12)}
          style={{
            ...s.button,
            fontSize: "clamp(14px, 3.8vw, 16px)",
            fontWeight: "600",
            width: "100%",
            padding: "14px 24px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 8px 20px -5px rgba(102, 126, 234, 0.4)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow =
              "0 12px 25px -5px rgba(102, 126, 234, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow =
              "0 8px 20px -5px rgba(102, 126, 234, 0.4)";
          }}
        >
          Continuar
        </button>

        <style>
          {`
            @keyframes drawCurve {
              to {
                stroke-dashoffset: 0;
              }
            }
            
            @keyframes fadeInPoint {
              to {
                opacity: 1;
              }
            }
          `}
        </style>
      </div>
    ),
    12: (
      <div>
        <h2
          style={{
            fontSize: "clamp(18px, 5vw, 24px)",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "32px",
            color: "#1F2937",
            lineHeight: "1.3",
          }}
        >
          ¿Te imaginas{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            leyendo más rápido
          </span>
          <br />y con{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #EC4899, #F59E0B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            mayor comprensión?
          </span>
        </h2>

        {[
          {
            emoji: "🔥",
            text: "¡Sí, sería mucho más fácil aprender cosas nuevas!",
            color: "linear-gradient(135deg, #EF4444, #DC2626)",
          },
          {
            emoji: "😔",
            text: "Todavía estoy indeciso",
            color: "linear-gradient(135deg, #F59E0B, #D97706)",
          },
        ].map((option, i) => (
          <OptionButton
            key={i}
            onClick={() => next("imagination", option.text)}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                background: option.color,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                marginRight: "16px",
                boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.3)",
                flexShrink: 0,
              }}
            >
              {option.emoji}
            </div>
            <span
              style={{
                fontSize: "clamp(14px, 4vw, 16px)",
                color: "#374151",
                fontWeight: "500",
                flex: 1,
                lineHeight: "1.4",
                textAlign: "left",
              }}
            >
              {option.text}
            </span>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "18px",
                flexShrink: 0,
              }}
            >
              →
            </div>
          </OptionButton>
        ))}
      </div>
    ),
    13: (
      <div>
        <h2
          style={{
            fontSize: "clamp(18px, 5vw, 24px)",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "32px",
            color: "#1F2937",
            lineHeight: "1.3",
          }}
        >
          ¿Mejorar tu lectura con{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            entrenamiento (8 minutos al día)
          </span>
          <br />
          traería{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #EC4899, #F59E0B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            grandes resultados
          </span>{" "}
          a tu vida?
        </h2>

        {[
          {
            emoji: "🔥",
            text: "¡Sí, tendría un gran impacto!",
            color: "linear-gradient(135deg, #EF4444, #DC2626)",
          },
          {
            emoji: "😔",
            text: "Realmente no sé qué impacto tendría",
            color: "linear-gradient(135deg, #F59E0B, #D97706)",
          },
        ].map((option, i) => (
          <OptionButton key={i} onClick={() => next("impact", option.text)}>
            <div
              style={{
                width: "50px",
                height: "50px",
                background: option.color,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                marginRight: "16px",
                boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.3)",
                flexShrink: 0,
              }}
            >
              {option.emoji}
            </div>
            <span
              style={{
                fontSize: "clamp(14px, 4vw, 16px)",
                color: "#374151",
                fontWeight: "500",
                flex: 1,
                lineHeight: "1.4",
                textAlign: "left",
              }}
            >
              {option.text}
            </span>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "18px",
                flexShrink: 0,
              }}
            >
              →
            </div>
          </OptionButton>
        ))}
      </div>
    ),
    14: (
      <div>
        <h2
          style={{
            fontSize: "clamp(20px, 5vw, 28px)",
            fontWeight: "800",
            textAlign: "center",
            marginBottom: "16px",
            color: "#1F2937",
            lineHeight: "1.2",
          }}
        >
          Antes de mostrarte el entrenamiento...
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #D2691E, #CD853F, #A0522D)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              boxShadow: "0 10px 25px -5px rgba(210, 105, 30, 0.4)",
              transform: "rotateX(15deg) rotateY(-15deg)",
              border: "3px solid rgba(160, 82, 45, 0.3)",
            }}
          >
            📦
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginBottom: "12px",
            lineHeight: "1.5",
          }}
        >
          <p
            style={{
              fontSize: "clamp(14px, 4vw, 16px)",
              color: "#374151",
              margin: "0 0 8px 0",
              fontWeight: "500",
            }}
          >
            un{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "700",
              }}
            >
              REGALO
            </span>{" "}
            para quienes se unan al Método,
          </p>
          <p
            style={{
              fontSize: "clamp(14px, 4vw, 16px)",
              color: "#374151",
              margin: "0 0 8px 0",
              fontWeight: "500",
            }}
          >
            acceso al{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #EC4899, #F59E0B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "700",
              }}
            >
              Grupo VIP (donde sólo yo envío
            </span>
          </p>
          <p
            style={{
              fontSize: "clamp(14px, 4vw, 16px)",
              color: "#374151",
              margin: "0 0 16px 0",
              fontWeight: "500",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #10B981, #059669)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "700",
              }}
            >
              mensajes)
            </span>{" "}
            con contenido extra.
          </p>
        </div>

        <input
          type="email"
          placeholder="Ingresa tu email aquí..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && email.trim() && setStep(15)}
          style={{
            ...s.input,
            marginBottom: "8px",
          }}
        />

        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(124, 58, 237, 0.05))",
            border: "1px solid rgba(79, 70, 229, 0.2)",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "12px",
            backdropFilter: "blur(10px)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "clamp(12px, 3vw, 14px)",
              color: "#4C1D95",
              margin: 0,
              fontWeight: "500",
              lineHeight: "1.4",
            }}
          >
            Para agregarte al{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "600",
              }}
            >
              Grupo VIP
            </span>{" "}
            necesito tu email para enviarte el link del grupo, recordando que el{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #EF4444, #DC2626)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "600",
              }}
            >
              grupo está silenciado
            </span>{" "}
            y solo yo{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #10B981, #059669)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "600",
              }}
            >
              envío mensajes
            </span>{" "}
            allí.
          </p>
        </div>

        <button
          onClick={() => setStep(15)}
          disabled={!email.trim()}
          style={{
            ...s.button,
            background: email.trim()
              ? "linear-gradient(135deg, #4F46E5, #7C3AED)"
              : "linear-gradient(135deg, #9CA3AF, #6B7280)",
            cursor: email.trim() ? "pointer" : "not-allowed",
            fontSize: "clamp(14px, 4vw, 16px)",
            fontWeight: "600",
          }}
          onMouseEnter={(e) => {
            if (email.trim()) {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow =
                "0 15px 30px -5px rgba(79, 70, 229, 0.5)";
            }
          }}
          onMouseLeave={(e) => {
            if (email.trim()) {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow =
                "0 10px 25px -5px rgba(102, 126, 234, 0.4)";
            }
          }}
        >
          Continuar
        </button>
      </div>
    ),
    15: (
      <div
        className="final-screen"
        style={{
          width: "100%",
          maxWidth: "100%",
          overflow: "visible",
          boxSizing: "border-box",
          minHeight: "auto",
        }}
      >
        {/* Blue Banner - Fixed positioning */}
        <div
          style={{
            backgroundColor: "#4F46E5",
            margin: "0 0 24px 0",
            padding: "20px 16px",
            color: "white",
            textAlign: "center",
            borderRadius: "16px",
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "block",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "8px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  flexShrink: 0,
                }}
              >
                ✅
              </span>
              <span
                style={{
                  fontSize: "clamp(14px, 3.5vw, 16px)",
                  fontWeight: "700",
                  lineHeight: "1.3",
                  textAlign: "center",
                }}
              >
                <strong>{name}</strong>, ya analizamos tus respuestas del test.
              </span>
            </div>
            <p
              style={{
                fontSize: "clamp(12px, 3vw, 14px)",
                margin: "0",
                opacity: "0.95",
                lineHeight: "1.4",
                maxWidth: "100%",
                wordWrap: "break-word",
              }}
            >
              Y esto fue lo que revelaron sobre tu estilo de lectura y nivel
              actual de comprensión:
            </p>
          </div>
        </div>

        {/* Main benefit text */}
        <div
          style={{
            marginBottom: "24px",
            textAlign: "center",
            padding: "0 4px",
          }}
        >
          <p
            style={{
              fontSize: "clamp(14px, 3.5vw, 16px)",
              fontWeight: "600",
              color: "#1F2937",
              lineHeight: "1.5",
              marginBottom: "16px",
              wordWrap: "break-word",
            }}
          >
            <strong>
              Con base en tus respuestas, podemos ayudarte a leer libros
              completos en menos de 2 horas, retener hasta el 80% de lo que lees
              y aplicar ese conocimiento de forma práctica desde la primera
              semana.
            </strong>
          </p>
        </div>

        {/* Results title */}
        <h3
          style={{
            fontSize: "clamp(16px, 4vw, 20px)",
            fontWeight: "700",
            color: "#1F2937",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          Tus resultados:
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {/* Columna Antes */}
          <div style={{ textAlign: "center" }}>
            <h4
              style={{
                fontSize: "clamp(13px, 3.5vw, 16px)",
                fontWeight: "700",
                color: "#6B7280",
                marginBottom: "12px",
                margin: "0 0 12px 0",
              }}
            >
              Antes
            </h4>
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: "16px",
                boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src="/images/antes.webp"
                alt="Antes"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Métricas Antes - Optimized */}
            <div style={{ marginBottom: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "6px",
                  minHeight: "auto",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(10px, 2.5vw, 12px)",
                    fontWeight: "600",
                    color: "#374151",
                    lineHeight: "1.2",
                    textAlign: "left",
                    maxWidth: "70%",
                    wordWrap: "break-word",
                  }}
                >
                  Velocidad de lectura
                </span>
                <span
                  style={{
                    fontSize: "clamp(10px, 2.5vw, 12px)",
                    fontWeight: "700",
                    color: "#EF4444",
                    flexShrink: 0,
                    marginLeft: "4px",
                  }}
                >
                  22%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(8px, 2vw, 10px)",
                    color: "#9CA3AF",
                    fontWeight: "500",
                  }}
                >
                  Bajo
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "22%",
                    height: "100%",
                    background: "linear-gradient(90deg, #EF4444, #DC2626)",
                    borderRadius: "3px",
                    animation: "fillBar 2s ease-out forwards",
                    transformOrigin: "left",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "6px",
                  minHeight: "auto",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(10px, 2.5vw, 12px)",
                    fontWeight: "600",
                    color: "#374151",
                    lineHeight: "1.2",
                    textAlign: "left",
                    maxWidth: "70%",
                    wordWrap: "break-word",
                  }}
                >
                  Enfoque y comprensión
                </span>
                <span
                  style={{
                    fontSize: "clamp(10px, 2.5vw, 12px)",
                    fontWeight: "700",
                    color: "#EF4444",
                    flexShrink: 0,
                    marginLeft: "4px",
                  }}
                >
                  24%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(8px, 2vw, 10px)",
                    color: "#9CA3AF",
                    fontWeight: "500",
                  }}
                >
                  Bajo
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "24%",
                    height: "100%",
                    background: "linear-gradient(90deg, #EF4444, #DC2626)",
                    borderRadius: "3px",
                    animation: "fillBar 2s ease-out 0.5s forwards",
                    transformOrigin: "left",
                    transform: "scaleX(0)",
                  }}
                />
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "6px",
                  minHeight: "auto",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(10px, 2.5vw, 12px)",
                    fontWeight: "600",
                    color: "#374151",
                    lineHeight: "1.2",
                    textAlign: "left",
                    maxWidth: "70%",
                    wordWrap: "break-word",
                  }}
                >
                  Nivel de energía
                </span>
                <span
                  style={{
                    fontSize: "clamp(10px, 2.5vw, 12px)",
                    fontWeight: "700",
                    color: "#EF4444",
                    flexShrink: 0,
                    marginLeft: "4px",
                  }}
                >
                  18%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(8px, 2vw, 10px)",
                    color: "#9CA3AF",
                    fontWeight: "500",
                  }}
                >
                  Bajo
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "18%",
                    height: "100%",
                    background: "linear-gradient(90deg, #EF4444, #DC2626)",
                    borderRadius: "3px",
                    animation: "fillBar 2s ease-out 1s forwards",
                    transformOrigin: "left",
                    transform: "scaleX(0)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Columna Después */}
          <div style={{ textAlign: "center" }}>
            <h4
              style={{
                fontSize: "clamp(13px, 3.5vw, 16px)",
                fontWeight: "700",
                color: "#6B7280",
                marginBottom: "12px",
                margin: "0 0 12px 0",
              }}
            >
              Después
            </h4>
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: "16px",
                boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src="/images/despues.webp"
                alt="Después"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Métricas Después - Optimized */}
            <div style={{ marginBottom: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "6px",
                  minHeight: "auto",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(10px, 2.5vw, 12px)",
                    fontWeight: "600",
                    color: "#374151",
                    lineHeight: "1.2",
                    textAlign: "left",
                    maxWidth: "70%",
                    wordWrap: "break-word",
                  }}
                >
                  Velocidad de lectura
                </span>
                <span
                  style={{
                    fontSize: "clamp(10px, 2.5vw, 12px)",
                    fontWeight: "700",
                    color: "#10B981",
                    flexShrink: 0,
                    marginLeft: "4px",
                  }}
                >
                  100%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(8px, 2vw, 10px)",
                    color: "#9CA3AF",
                    fontWeight: "500",
                  }}
                >
                  Rápida
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, #10B981, #059669)",
                    borderRadius: "3px",
                    animation: "fillBar 2s ease-out 1.5s forwards",
                    transformOrigin: "left",
                    transform: "scaleX(0)",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "6px",
                  minHeight: "auto",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(10px, 2.5vw, 12px)",
                    fontWeight: "600",
                    color: "#374151",
                    lineHeight: "1.2",
                    textAlign: "left",
                    maxWidth: "70%",
                    wordWrap: "break-word",
                  }}
                >
                  Enfoque y comprensión
                </span>
                <span
                  style={{
                    fontSize: "clamp(10px, 2.5vw, 12px)",
                    fontWeight: "700",
                    color: "#10B981",
                    flexShrink: 0,
                    marginLeft: "4px",
                  }}
                >
                  92%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(8px, 2vw, 10px)",
                    color: "#9CA3AF",
                    fontWeight: "500",
                  }}
                >
                  Fuerte
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "92%",
                    height: "100%",
                    background: "linear-gradient(90deg, #10B981, #059669)",
                    borderRadius: "3px",
                    animation: "fillBar 2s ease-out 2s forwards",
                    transformOrigin: "left",
                    transform: "scaleX(0)",
                  }}
                />
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "6px",
                  minHeight: "auto",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(10px, 2.5vw, 12px)",
                    fontWeight: "600",
                    color: "#374151",
                    lineHeight: "1.2",
                    textAlign: "left",
                    maxWidth: "70%",
                    wordWrap: "break-word",
                  }}
                >
                  Nivel de energía
                </span>
                <span
                  style={{
                    fontSize: "clamp(10px, 2.5vw, 12px)",
                    fontWeight: "700",
                    color: "#10B981",
                    flexShrink: 0,
                    marginLeft: "4px",
                  }}
                >
                  91%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(8px, 2vw, 10px)",
                    color: "#9CA3AF",
                    fontWeight: "500",
                  }}
                >
                  Alto
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "91%",
                    height: "100%",
                    background: "linear-gradient(90deg, #10B981, #059669)",
                    borderRadius: "3px",
                    animation: "fillBar 2s ease-out 2.5s forwards",
                    transformOrigin: "left",
                    transform: "scaleX(0)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Subconscious Mind Section - Super Attractive */}
        <div
          style={{
            marginTop: "40px",
            marginBottom: "32px",
            textAlign: "center",
            padding: "24px 16px",
            background: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)",
            borderRadius: "20px",
            border: "2px solid transparent",
            backgroundImage:
              "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%), linear-gradient(135deg, #4F46E5, #7C3AED)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Animated Background Elements */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "20px",
              fontSize: "24px",
              opacity: "0.3",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            🧠
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "15px",
              left: "15px",
              fontSize: "20px",
              opacity: "0.3",
              animation: "float 3s ease-in-out infinite 1.5s",
            }}
          >
            ⚡
          </div>

          <p
            style={{
              fontSize: "clamp(15px, 3.8vw, 18px)",
              fontWeight: "600",
              color: "#1F2937",
              lineHeight: "1.6",
              margin: "0",
              wordWrap: "break-word",
              position: "relative",
              zIndex: 1,
            }}
          >
            Con este entrenamiento personalizado, activarás tu{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "800",
                fontSize: "clamp(16px, 4vw, 20px)",
                textShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
                position: "relative",
              }}
            >
              mente subconsciente
            </span>{" "}
            —la parte más poderosa de tu cerebro— para leer más rápido,
            comprender mejor y retener lo que lees con total claridad.
          </p>

          <div
            style={{
              marginTop: "16px",
              padding: "12px 20px",
              background: "rgba(124, 58, 237, 0.1)",
              borderRadius: "12px",
              border: "1px solid rgba(124, 58, 237, 0.2)",
            }}
          >
            <p
              style={{
                fontSize: "clamp(14px, 3.5vw, 16px)",
                fontWeight: "600",
                color: "#7C3AED",
                margin: "0",
                fontStyle: "italic",
              }}
            >
              ✨ Es como si tu mente ya conociera el libro antes de abrirlo.
            </p>
          </div>
        </div>

        {/* CTA Button - Super Attractive Red */}
        <div
          style={{
            marginTop: "32px",
            textAlign: "center",
            padding: "0 4px",
          }}
        >
          <button
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "clamp(16px, 4vw, 20px) clamp(20px, 5vw, 32px)",
              backgroundColor: "#DC2626",
              background:
                "linear-gradient(135deg, #DC2626 0%, #EF4444 50%, #F87171 100%)",
              color: "white",
              border: "none",
              borderRadius: "16px",
              fontSize: "clamp(14px, 3.5vw, 18px)",
              fontWeight: "700",
              lineHeight: "1.3",
              textAlign: "center",
              cursor: "pointer",
              boxShadow:
                "0 8px 25px -5px rgba(220, 38, 38, 0.4), 0 4px 6px -2px rgba(220, 38, 38, 0.1)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
              transform: "translateY(0)",
              animation: "buttonPulse 2s ease-in-out infinite",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow =
                "0 12px 30px -8px rgba(220, 38, 38, 0.5), 0 6px 8px -3px rgba(220, 38, 38, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow =
                "0 8px 25px -5px rgba(220, 38, 38, 0.4), 0 4px 6px -2px rgba(220, 38, 38, 0.1)";
            }}
            onTouchStart={(e) => {
              e.target.style.transform = "translateY(-1px)";
            }}
            onTouchEnd={(e) => {
              e.target.style.transform = "translateY(0)";
            }}
            onClick={() => {
              // Guardar estado actual antes de ir a Hotmart
              sessionStorage.setItem("returnToScreen", "15");
              sessionStorage.setItem("userReturnedFromPayment", "true");

              // Ir a Hotmart con el nuevo link
              window.location.href =
                "https://pay.hotmart.com/D101097522U?checkoutMode=10&src=lp1&return_screen=15";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>🔓</span>
              <span style={{ textAlign: "center" }}>
                <strong>
                  Quiero activar mi entrenamiento personalizado ahora
                </strong>
              </span>
            </div>
          </button>
          {/* Agrega este CSS a tu componente */}
          <style jsx>{`
            @keyframes buttonPulse {
              0%,
              100% {
                transform: scale(1) translateY(0);
                box-shadow: 0 8px 25px -5px rgba(220, 38, 38, 0.4),
                  0 4px 6px -2px rgba(220, 38, 38, 0.1);
              }
              50% {
                transform: scale(1.05) translateY(0);
                box-shadow: 0 12px 35px -8px rgba(220, 38, 38, 0.7),
                  0 6px 8px -3px rgba(220, 38, 38, 0.3);
              }
            }
          `}</style>
        </div>
        {/* Why It Works Section - After Button */}
        <div
          style={{
            marginTop: "40px",
            marginBottom: "32px",
            textAlign: "center",
            padding: "24px 16px",
            background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
            borderRadius: "20px",
            border: "2px solid transparent",
            backgroundImage:
              "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%), linear-gradient(135deg, #F59E0B, #D97706)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Animated Background Elements */}
          <div
            style={{
              position: "absolute",
              top: "15px",
              right: "20px",
              fontSize: "24px",
              opacity: "0.3",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            ⚡
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "15px",
              left: "15px",
              fontSize: "20px",
              opacity: "0.3",
              animation: "float 3s ease-in-out infinite 1.5s",
            }}
          >
            🧠
          </div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              fontSize: "18px",
              opacity: "0.2",
              animation: "float 3s ease-in-out infinite 3s",
            }}
          >
            💡
          </div>

          {/* Question Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "16px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "clamp(18px, 4.5vw, 24px)" }}>❓</span>
            <h3
              style={{
                fontSize: "clamp(16px, 4vw, 20px)",
                fontWeight: "800",
                color: "#92400E",
                margin: "0",
                lineHeight: "1.2",
              }}
            >
              ¿Por qué este método funciona tan bien?
            </h3>
          </div>

          <p
            style={{
              fontSize: "clamp(14px, 3.5vw, 16px)",
              fontWeight: "600",
              color: "#1F2937",
              lineHeight: "1.6",
              margin: "0 0 16px 0",
              wordWrap: "break-word",
              position: "relative",
              zIndex: 1,
            }}
          >
            Porque no solo usa tu mente consciente (la que lee palabra por
            palabra), sino tu{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "800",
                fontSize: "clamp(15px, 3.8vw, 18px)",
              }}
            >
              mente subconsciente
            </span>
            , que entiende rápido y recuerda sin esfuerzo.
          </p>

          <div
            style={{
              padding: "16px 20px",
              background: "rgba(245, 158, 11, 0.1)",
              borderRadius: "12px",
              border: "1px solid rgba(245, 158, 11, 0.3)",
            }}
          >
            <p
              style={{
                fontSize: "clamp(13px, 3.2vw, 15px)",
                fontWeight: "500",
                color: "#92400E",
                margin: "0",
                lineHeight: "1.5",
              }}
            >
              Esto se basa en la{" "}
              <span
                style={{
                  fontWeight: "700",
                  background: "linear-gradient(135deg, #F59E0B, #D97706)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                teoría del doble procesamiento
              </span>
              , que dice que tenemos dos formas de pensar: una lenta y una
              rápida. Este método activa la rápida:{" "}
              <span
                style={{
                  fontWeight: "700",
                  background: "linear-gradient(135deg, #F59E0B, #D97706)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                tu mente subconsciente
              </span>
              , para que puedas leer más, entender mejor y recordarlo todo con
              más facilidad.
            </p>
          </div>
        </div>
        {/* What You'll Receive Section */}
        <div
          style={{
            marginTop: "24px",
            marginBottom: "32px",
          }}
        >
          {/* Title */}
          <div
            style={{
              textAlign: "center",
              padding: "24px 16px",
              background: "linear-gradient(135deg, #1F2937 0%, #374151 100%)",
              borderRadius: "20px",
              position: "relative",
              overflow: "hidden",
              border: "3px solid transparent",
              backgroundImage:
                "linear-gradient(135deg, #1F2937 0%, #374151 100%), linear-gradient(135deg, #DC2626, #EF4444)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(16px, 4.2vw, 24px)",
                fontWeight: "800",
                lineHeight: "1.3",
                margin: "0",
                textAlign: "center",
                color: "white",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              ESTO ES A TODO LO QUE TENDRÁS ACCESO,{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #DC2626, #EF4444, #F87171)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "900",
                  fontSize: "clamp(18px, 4.8vw, 28px)",
                  textShadow: "none",
                  display: "inline-block",
                }}
              >
                SI INGRESAS HOY:
              </span>
            </h2>
          </div>

          {/* Grid Container */}
          <div
            style={{
              padding: "20px 12px",
              background: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)",
              borderRadius: "20px",
              border: "2px solid rgba(71, 85, 105, 0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(18px, 4.5vw, 24px)",
                fontWeight: "800",
                color: "#334155",
                textAlign: "center",
                marginBottom: "20px",
                margin: "0 0 20px 0",
              }}
            >
              ¿Qué recibirás?
            </h3>

            {/* 2x2 Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "auto auto",
                gap: "12px",
                maxWidth: "100%",
              }}
            >
              {/* Item 1 - Método Focus Read */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "12px 8px",
                  boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(71, 85, 105, 0.1)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: "8px",
                    overflow: "hidden",
                    marginBottom: "8px",
                    backgroundColor: "#F1F5F9",
                  }}
                >
                  <img
                    src="/images/imagen1.webp"
                    alt="Método Focus Read"
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "4px",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  >
                    ✅
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(9px, 2.2vw, 12px)",
                      fontWeight: "800",
                      color: "#334155",
                      lineHeight: "1.1",
                      textAlign: "left",
                    }}
                  >
                    Método Focus Read
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "clamp(7px, 1.8vw, 11px)",
                    color: "#64748B",
                    lineHeight: "1.3",
                    margin: "0",
                    textAlign: "left",
                    fontWeight: "500",
                  }}
                >
                  Entrenamiento visual para multiplicar tu velocidad de lectura
                  en 14 días. Tu mente reconocerá ideas antes de leerlas.
                </p>
              </div>

              {/* Item 2 - Kit de Retos */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "12px 8px",
                  boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(71, 85, 105, 0.1)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: "8px",
                    overflow: "hidden",
                    marginBottom: "8px",
                    backgroundColor: "#F1F5F9",
                  }}
                >
                  <img
                    src="/images/imagen2.webp"
                    alt="Kit de Retos"
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "4px",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  >
                    ✅
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(9px, 2.2vw, 12px)",
                      fontWeight: "800",
                      color: "#334155",
                      lineHeight: "1.1",
                      textAlign: "left",
                    }}
                  >
                    Kit de Retos de Lectura
                  </span>
                </div>
                <div style={{ marginBottom: "4px" }}>
                  <span
                    style={{
                      fontSize: "clamp(6px, 1.5vw, 9px)",
                      color: "#9CA3AF",
                      textDecoration: "line-through",
                    }}
                  >
                    $14 USD
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(7px, 1.8vw, 10px)",
                      fontWeight: "700",
                      color: "#DC2626",
                      marginLeft: "4px",
                    }}
                  >
                    HOY: $0.00
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "clamp(7px, 1.8vw, 11px)",
                    color: "#64748B",
                    lineHeight: "1.3",
                    margin: "0",
                    textAlign: "left",
                    fontWeight: "500",
                  }}
                >
                  50 textos para desafiar tu velocidad y comprensión. Mide tu
                  progreso y mantén tu mente activa.
                </p>
              </div>

              {/* Item 3 - Dominando la Procrastinación */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "12px 8px",
                  boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(71, 85, 105, 0.1)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: "8px",
                    overflow: "hidden",
                    marginBottom: "8px",
                    backgroundColor: "#F1F5F9",
                  }}
                >
                  <img
                    src="/images/imagen3.webp"
                    alt="Dominando la Procrastinación"
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "4px",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  >
                    ✅
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(9px, 2.2vw, 12px)",
                      fontWeight: "800",
                      color: "#334155",
                      lineHeight: "1.1",
                      textAlign: "left",
                    }}
                  >
                    Dominando la Procrastinación
                  </span>
                </div>
                <div style={{ marginBottom: "4px" }}>
                  <span
                    style={{
                      fontSize: "clamp(6px, 1.5vw, 9px)",
                      color: "#9CA3AF",
                      textDecoration: "line-through",
                    }}
                  >
                    $12 USD
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(7px, 1.8vw, 10px)",
                      fontWeight: "700",
                      color: "#DC2626",
                      marginLeft: "4px",
                    }}
                  >
                    HOY: $0.00
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "clamp(7px, 1.8vw, 11px)",
                    color: "#64748B",
                    lineHeight: "1.3",
                    margin: "0",
                    textAlign: "left",
                    fontWeight: "500",
                  }}
                >
                  Guía definitiva para dejar de postergar y ejecutar con enfoque
                  total. Activa tu mejor versión desde hoy.
                </p>
              </div>

              {/* Item 4 - Gimnasia Ocular */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "12px 8px",
                  boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(71, 85, 105, 0.1)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: "8px",
                    overflow: "hidden",
                    marginBottom: "8px",
                    backgroundColor: "#F1F5F9",
                  }}
                >
                  <img
                    src="/images/imagen4.webp"
                    alt="Gimnasia Ocular"
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "4px",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  >
                    ✅
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(9px, 2.2vw, 12px)",
                      fontWeight: "800",
                      color: "#334155",
                      lineHeight: "1.1",
                      textAlign: "left",
                    }}
                  >
                    Gimnasia Ocular Intensiva
                  </span>
                </div>
                <div style={{ marginBottom: "4px" }}>
                  <span
                    style={{
                      fontSize: "clamp(6px, 1.5vw, 9px)",
                      color: "#9CA3AF",
                      textDecoration: "line-through",
                    }}
                  >
                    $15 USD
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(7px, 1.8vw, 10px)",
                      fontWeight: "700",
                      color: "#DC2626",
                      marginLeft: "4px",
                    }}
                  >
                    HOY: $0.00
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "clamp(7px, 1.8vw, 11px)",
                    color: "#64748B",
                    lineHeight: "1.3",
                    margin: "0",
                    textAlign: "left",
                    fontWeight: "500",
                  }}
                >
                  Ejercicios visuales en video para mejorar tu visión periférica
                  y activar tu subconsciente lector.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Special Offer Section with Countdown */}
        <div
          style={{
            marginTop: "16px",
            marginBottom: "32px",
            background: "linear-gradient(135deg, #DC2626 0%, #EF4444 100%)",
            borderRadius: "20px",
            padding: "0",
            overflow: "hidden",
            boxShadow:
              "0 20px 25px -5px rgba(220, 38, 38, 0.25), 0 10px 10px -5px rgba(220, 38, 38, 0.1)",
            position: "relative",
            border: "3px solid rgba(255,255,255,0.2)",
          }}
        >
          {/* Animated Glow Effect */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
              animation: "rotate 20s linear infinite",
            }}
          />

          {/* Header Banner */}
          <div
            style={{
              backgroundColor: "#991B1B",
              padding: "12px 16px",
              textAlign: "center",
              position: "relative",
              zIndex: 1,
              borderBottom: "2px solid rgba(255,255,255,0.1)",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(13px, 3.2vw, 16px)",
                fontWeight: "900",
                color: "white",
                margin: "0",
                textTransform: "uppercase",
                letterSpacing: "1px",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              🔥 OFERTA DISPONIBLE HASTA
            </h3>
          </div>

          {/* Countdown Timer */}
          <div
            style={{
              padding: "16px",
              textAlign: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              {/* Minutes */}
              <div
                style={{
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  minWidth: "70px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(20px, 6vw, 28px)",
                    fontWeight: "900",
                    color: "white",
                    lineHeight: "1",
                    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {timeLeft !== null
                    ? Math.floor(timeLeft / 60)
                        .toString()
                        .padStart(2, "0")
                    : "05"}
                </div>
                <div
                  style={{
                    fontSize: "clamp(8px, 2vw, 10px)",
                    color: "rgba(255,255,255,0.9)",
                    fontWeight: "600",
                    marginTop: "2px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  MINUTOS
                </div>
              </div>

              {/* Seconds */}
              <div
                style={{
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  minWidth: "70px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(20px, 6vw, 28px)",
                    fontWeight: "900",
                    color: "white",
                    lineHeight: "1",
                    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {timeLeft !== null
                    ? (timeLeft % 60).toString().padStart(2, "0")
                    : "00"}
                </div>
                <div
                  style={{
                    fontSize: "clamp(8px, 2vw, 10px)",
                    color: "rgba(255,255,255,0.9)",
                    fontWeight: "600",
                    marginTop: "2px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  SEGUNDOS
                </div>
              </div>
            </div>

            {/* Rest of the content... Special Condition Banner, Product Info, CTA Button */}
            {/* (Keep the same as before) */}
          </div>
        </div>
        {/* Special Condition Banner */}
        <div
          style={{
            marginTop: "8px",
            marginBottom: "8px",
            backgroundColor: "#2563EB",
            borderRadius: "12px",
            padding: "12px 16px",
            background: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
            boxShadow: "0 4px 15px -3px rgba(37, 99, 235, 0.3)",
          }}
        >
          <p
            style={{
              fontSize: "clamp(11px, 2.8vw, 14px)",
              fontWeight: "700",
              color: "white",
              margin: "0",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            🎯 CONDICIÓN ESPECIAL - DESCUENTO DE 47 USD
          </p>
        </div>

        {/* Product Info Card */}
        <div
          style={{
            marginTop: "8px",
            marginBottom: "8px",
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "20px 16px",
            boxShadow:
              "0 4px 20px -5px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
            border: "1px solid rgba(229, 231, 235, 0.8)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div style={{ textAlign: "left", flex: 1 }}>
              <h4
                style={{
                  fontSize: "clamp(16px, 4vw, 20px)",
                  fontWeight: "800",
                  color: "#1F2937",
                  margin: "0 0 6px 0",
                  lineHeight: "1.2",
                }}
              >
                Método FocusRead
              </h4>
              <p
                style={{
                  fontSize: "clamp(12px, 3vw, 14px)",
                  color: "#6B7280",
                  margin: "0",
                  fontWeight: "500",
                  lineHeight: "1.3",
                }}
              >
                Libro electrónico completo + 5 bonos
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: "clamp(10px, 2.5vw, 12px)",
                  color: "#9CA3AF",
                  textDecoration: "line-through",
                  marginBottom: "4px",
                  fontWeight: "500",
                }}
              >
                Antes: 57 USD
              </div>
              <div
                style={{
                  fontSize: "clamp(18px, 5vw, 24px)",
                  fontWeight: "900",
                  color: "#10B981",
                  lineHeight: "1",
                  marginBottom: "4px",
                }}
              >
                Ahora 9.99 USD
              </div>
              <div
                style={{
                  fontSize: "clamp(8px, 2vw, 10px)",
                  color: "#059669",
                  fontWeight: "600",
                  lineHeight: "1.2",
                  textAlign: "right",
                }}
              >
                Disponible para pagar a cuotas
                <br />
                con tarjeta de crédito
              </div>
            </div>
          </div>
        </div>

        {/* Super Attractive CTA Button with Pulse */}
        <div
          style={{
            marginTop: "8px",
            marginBottom: "8px",
          }}
        >
          <button
            style={{
              width: "100%",
              padding: "18px 24px",
              background:
                "linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)",
              color: "#92400E",
              border: "none",
              borderRadius: "16px",
              fontSize: "clamp(13px, 3.2vw, 17px)",
              fontWeight: "900",
              textAlign: "center",
              cursor: "pointer",
              boxShadow:
                "0 8px 25px -5px rgba(251, 191, 36, 0.5), 0 4px 6px -2px rgba(251, 191, 36, 0.2)",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              border: "2px solid rgba(146, 64, 14, 0.3)",
              position: "relative",
              overflow: "hidden",
              animation: "buttonPulse 2s ease-in-out infinite",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px) scale(1.02)";
              e.target.style.boxShadow =
                "0 12px 35px -8px rgba(251, 191, 36, 0.7), 0 6px 8px -3px rgba(251, 191, 36, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.boxShadow =
                "0 8px 25px -5px rgba(251, 191, 36, 0.5), 0 4px 6px -2px rgba(251, 191, 36, 0.2)";
            }}
            onTouchStart={(e) => {
              e.target.style.transform = "translateY(-1px) scale(1.01)";
            }}
            onTouchEnd={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
            }}
            onClick={() => {
              window.location.href =
                "https://pay.hotmart.com/D101097522U?checkoutMode=10&src=lp1&return_screen=15";
            }}
          >
            {/* Gradient overlay for extra depth */}
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
                borderRadius: "14px",
                pointerEvents: "none",
              }}
            />

            <span
              style={{
                position: "relative",
                zIndex: 1,
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              🔒 QUIERO GARANTIZAR MI ACCESO AHORA
            </span>
          </button>
        </div>
        {/* Bonuses Section */}
        <div
          style={{
            marginTop: "8px",
            marginBottom: "8px",
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "20px 16px",
            boxShadow:
              "0 4px 20px -5px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
            border: "1px solid rgba(229, 231, 235, 0.8)",
          }}
        >
          {/* Title */}
          <h3
            style={{
              fontSize: "clamp(16px, 4vw, 20px)",
              fontWeight: "800",
              color: "#1F2937",
              margin: "0 0 16px 0",
              textAlign: "center",
              lineHeight: "1.2",
            }}
          >
            🎁 Bonos que recibirás por tu compra ✨
          </h3>

          {/* Bonus List */}
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "12px", marginTop: "2px" }}>🎁</span>
              <span
                style={{
                  fontSize: "clamp(11px, 2.8vw, 13px)",
                  color: "#374151",
                  fontWeight: "600",
                  lineHeight: "1.3",
                }}
              >
                Kit de Retos de Lectura
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "12px", marginTop: "2px" }}>🎁</span>
              <span
                style={{
                  fontSize: "clamp(11px, 2.8vw, 13px)",
                  color: "#374151",
                  fontWeight: "600",
                  lineHeight: "1.3",
                }}
              >
                Dominando la Procrastinación
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "12px", marginTop: "2px" }}>🎁</span>
              <span
                style={{
                  fontSize: "clamp(11px, 2.8vw, 13px)",
                  color: "#374151",
                  fontWeight: "600",
                  lineHeight: "1.3",
                }}
              >
                Gimnasia Ocular Intensiva
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "12px", marginTop: "2px" }}>🎁</span>
              <span
                style={{
                  fontSize: "clamp(11px, 2.8vw, 13px)",
                  color: "#374151",
                  fontWeight: "600",
                  lineHeight: "1.3",
                }}
              >
                Videos de apoyo exclusivos
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "12px", marginTop: "2px" }}>🎁</span>
              <span
                style={{
                  fontSize: "clamp(11px, 2.8vw, 13px)",
                  color: "#374151",
                  fontWeight: "600",
                  lineHeight: "1.3",
                }}
              >
                Hoja de cálculo de progreso SMART
              </span>
            </div>
          </div>

          {/* Lifetime Access Banner */}
          <div
            style={{
              backgroundColor: "#1F2937",
              borderRadius: "8px",
              padding: "12px 16px",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            <h4
              style={{
                fontSize: "clamp(13px, 3.2vw, 16px)",
                fontWeight: "800",
                color: "white",
                margin: "0 0 4px 0",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              ACCESO DE POR VIDA
            </h4>
            <p
              style={{
                fontSize: "clamp(11px, 2.8vw, 13px)",
                color: "white",
                margin: "0",
                lineHeight: "1.3",
              }}
            >
              ¡Haces un pago único de 9,99 USD y tienes{" "}
              <span style={{ color: "#EF4444", fontWeight: "700" }}>
                acceso al material de por vida!
              </span>
            </p>
          </div>

          {/* Guarantee Section */}
          <div
            style={{
              backgroundColor: "#F3F4F6",
              borderRadius: "8px",
              padding: "12px 16px",
              textAlign: "center",
            }}
          >
            <h4
              style={{
                fontSize: "clamp(13px, 3.2vw, 16px)",
                fontWeight: "800",
                color: "#1F2937",
                margin: "0 0 8px 0",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              GARANTÍA DE 7 DÍAS
            </h4>
            <p
              style={{
                fontSize: "clamp(10px, 2.5vw, 12px)",
                color: "#6B7280",
                margin: "0 0 8px 0",
                lineHeight: "1.3",
                fontWeight: "500",
              }}
            >
              Garantizamos el reembolso completo del importe pagado dentro de
              los 7 días posteriores a la compra.
            </p>
            <p
              style={{
                fontSize: "clamp(9px, 2.2vw, 11px)",
                color: "#9CA3AF",
                margin: "0",
                lineHeight: "1.3",
                fontStyle: "italic",
              }}
            >
              Si por cualquier motivo no obtienes resultados, puedes solicitar
              tu garantía y te reembolsaremos tu dinero sin resentimientos.
            </p>
          </div>
          {/* Testimonials Section */}
          <div
            style={{
              marginTop: "8px",
              marginBottom: "8px",
            }}
          >
            {/* Title */}
            <h3
              style={{
                fontSize: "clamp(18px, 4.5vw, 24px)",
                fontWeight: "800",
                color: "#1F2937",
                margin: "0 0 20px 0",
                textAlign: "center",
                lineHeight: "1.2",
              }}
            >
              💬 Lo que dicen nuestros alumnos
            </h3>

            {/* Carousel Container */}
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "16px",
                marginBottom: "2px",
              }}
            >
              <div
                className="carousel-track"
                style={{
                  display: "flex",
                  animation: "slideCarousel 12s infinite linear",
                }}
              >
                {/* Testimonial 1 */}
                <div
                  style={{
                    minWidth: "100%",
                    padding: "0 4px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "16px",
                      padding: "16px",
                      boxShadow:
                        "0 4px 20px -5px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(229, 231, 235, 0.8)",
                    }}
                  >
                    <img
                      src="/images/test1.webp"
                      alt="Testimonio 1"
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "12px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div
                  style={{
                    minWidth: "100%",
                    padding: "0 4px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "16px",
                      padding: "16px",
                      boxShadow:
                        "0 4px 20px -5px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(229, 231, 235, 0.8)",
                    }}
                  >
                    <img
                      src="/images/test2.webp"
                      alt="Testimonio 2"
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "12px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>

                {/* Testimonial 3 */}
                <div
                  style={{
                    minWidth: "100%",
                    padding: "0 4px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "16px",
                      padding: "16px",
                      boxShadow:
                        "0 4px 20px -5px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(229, 231, 235, 0.8)",
                    }}
                  >
                    <img
                      src="/images/test3.webp"
                      alt="Testimonio 3"
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "12px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>

                {/* Repeat for infinite scroll */}
                <div
                  style={{
                    minWidth: "100%",
                    padding: "0 4px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "16px",
                      padding: "16px",
                      boxShadow:
                        "0 4px 20px -5px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(229, 231, 235, 0.8)",
                    }}
                  >
                    <img
                      src="/images/test1.webp"
                      alt="Testimonio 1"
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "12px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Persuasive Statement */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "8px",
                padding: "20px 16px",
                background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
                borderRadius: "16px",
                border: "2px solid rgba(16, 185, 129, 0.1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative elements */}
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "20px",
                  fontSize: "24px",
                  opacity: "0.3",
                }}
              >
                ⭐
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "20px",
                  fontSize: "20px",
                  opacity: "0.3",
                }}
              >
                🚀
              </div>

              <p
                style={{
                  fontSize: "clamp(16px, 4vw, 20px)",
                  fontWeight: "800",
                  color: "#065F46",
                  margin: "0 0 8px 0",
                  lineHeight: "1.3",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                ¡Únete a más de 10,000 alumnos que ya transformaron su forma de
                leer!
              </p>
              <p
                style={{
                  fontSize: "clamp(13px, 3.2vw, 16px)",
                  color: "#047857",
                  margin: "0",
                  fontWeight: "600",
                  lineHeight: "1.4",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                🎯 El 94% de nuestros estudiantes duplica su velocidad de
                lectura en menos de 2 semanas
              </p>
            </div>

            {/* Final CTA Button */}
            <button
              style={{
                width: "100%",
                padding: "18px 24px",
                background:
                  "linear-gradient(135deg, #DC2626 0%, #EF4444 50%, #F87171 100%)",
                color: "white",
                border: "none",
                borderRadius: "16px",
                fontSize: "clamp(14px, 3.5vw, 18px)",
                fontWeight: "900",
                textAlign: "center",
                cursor: "pointer",
                boxShadow:
                  "0 8px 25px -5px rgba(220, 38, 38, 0.5), 0 4px 6px -2px rgba(220, 38, 38, 0.2)",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                border: "2px solid rgba(185, 28, 28, 0.3)",
                position: "relative",
                overflow: "hidden",
                animation: "buttonPulse 2s ease-in-out infinite",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px) scale(1.02)";
                e.target.style.boxShadow =
                  "0 12px 35px -8px rgba(220, 38, 38, 0.7), 0 6px 8px -3px rgba(220, 38, 38, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow =
                  "0 8px 25px -5px rgba(220, 38, 38, 0.5), 0 4px 6px -2px rgba(220, 38, 38, 0.2)";
              }}
              onTouchStart={(e) => {
                e.target.style.transform = "translateY(-1px) scale(1.01)";
              }}
              onTouchEnd={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
              }}
              onClick={() => {
                window.location.href =
                  "https://pay.hotmart.com/D101097522U?checkoutMode=10&src=lp1&return_screen=15";
              }}
            >
              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
                  borderRadius: "14px",
                  pointerEvents: "none",
                }}
              />

              <span
                style={{
                  position: "relative",
                  zIndex: 1,
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                🔥 ¡SÍ, QUIERO TRANSFORMAR MI LECTURA AHORA!
              </span>
            </button>
          </div>
        </div>
        {/* Before and After Section */}
        <div
          style={{
            marginTop: "8px",
            marginBottom: "8px",
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "20px 16px",
            boxShadow:
              "0 4px 20px -5px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
            border: "1px solid rgba(229, 231, 235, 0.8)",
          }}
        >
          {/* Before Section */}
          <div style={{ marginBottom: "24px" }}>
            <h4
              style={{
                fontSize: "clamp(14px, 3.5vw, 18px)",
                fontWeight: "800",
                color: "#1F2937",
                margin: "0 0 12px 0",
                textAlign: "center",
                lineHeight: "1.2",
              }}
            >
              La vida antes del método FocusRead
            </h4>

            <div style={{ marginBottom: "8px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "#EF4444",
                    marginTop: "2px",
                  }}
                >
                  ✗
                </span>
                <span
                  style={{
                    fontSize: "clamp(11px, 2.8vw, 13px)",
                    color: "#374151",
                    fontWeight: "500",
                    lineHeight: "1.3",
                  }}
                >
                  Te gusta leer, pero te sientes cansado y somnoliento cuando
                  intentas leer por horas.
                </span>
              </div>
            </div>

            <div style={{ marginBottom: "8px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "#EF4444",
                    marginTop: "2px",
                  }}
                >
                  ✗
                </span>
                <span
                  style={{
                    fontSize: "clamp(11px, 2.8vw, 13px)",
                    color: "#374151",
                    fontWeight: "500",
                    lineHeight: "1.3",
                  }}
                >
                  No te gusta leer, pero necesitas una solución efectiva para
                  estudiar mejor.
                </span>
              </div>
            </div>

            <div style={{ marginBottom: "8px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "#EF4444",
                    marginTop: "2px",
                  }}
                >
                  ✗
                </span>
                <span
                  style={{
                    fontSize: "clamp(11px, 2.8vw, 13px)",
                    color: "#374151",
                    fontWeight: "500",
                    lineHeight: "1.3",
                  }}
                >
                  Lees, pero no puedes aprender ni recordar el contenido.
                </span>
              </div>
            </div>

            <div style={{ marginBottom: "8px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "#EF4444",
                    marginTop: "2px",
                  }}
                >
                  ✗
                </span>
                <span
                  style={{
                    fontSize: "clamp(11px, 2.8vw, 13px)",
                    color: "#374151",
                    fontWeight: "500",
                    lineHeight: "1.3",
                  }}
                >
                  Te sientes lento cuando intentas aplicar lo que has leído.
                </span>
              </div>
            </div>

            <div style={{ marginBottom: "8px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "#EF4444",
                    marginTop: "2px",
                  }}
                >
                  ✗
                </span>
                <span
                  style={{
                    fontSize: "clamp(11px, 2.8vw, 13px)",
                    color: "#374151",
                    fontWeight: "500",
                    lineHeight: "1.3",
                  }}
                >
                  No puedes estudiar todo el contenido que necesitas en el
                  tiempo.
                </span>
              </div>
            </div>
          </div>

          {/* After Section */}
          <div
            style={{
              backgroundColor: "#F0FDF4",
              borderRadius: "12px",
              padding: "16px",
              border: "1px solid rgba(16, 185, 129, 0.2)",
            }}
          >
            <h4
              style={{
                fontSize: "clamp(14px, 3.5vw, 18px)",
                fontWeight: "800",
                color: "#065F46",
                margin: "0 0 12px 0",
                textAlign: "center",
                lineHeight: "1.2",
              }}
            >
              La vida después de usar el método FocusRead
            </h4>

            <div style={{ marginBottom: "8px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "#10B981",
                    marginTop: "2px",
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontSize: "clamp(11px, 2.8vw, 13px)",
                    color: "#047857",
                    fontWeight: "500",
                    lineHeight: "1.3",
                  }}
                >
                  Puedes terminar un gran volumen de contenidos en poco tiempo.
                </span>
              </div>
            </div>

            <div style={{ marginBottom: "8px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "#10B981",
                    marginTop: "2px",
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontSize: "clamp(11px, 2.8vw, 13px)",
                    color: "#047857",
                    fontWeight: "500",
                    lineHeight: "1.3",
                  }}
                >
                  Puedes terminar libros de una manera más rápida.
                </span>
              </div>
            </div>

            <div style={{ marginBottom: "8px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "#10B981",
                    marginTop: "2px",
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontSize: "clamp(11px, 2.8vw, 13px)",
                    color: "#047857",
                    fontWeight: "500",
                    lineHeight: "1.3",
                  }}
                >
                  Puedes leer tantos libros como quieras.
                </span>
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "#10B981",
                    marginTop: "2px",
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontSize: "clamp(11px, 2.8vw, 13px)",
                    color: "#047857",
                    fontWeight: "500",
                    lineHeight: "1.3",
                  }}
                >
                  Gastarás más dinero comprando más libros porque tu carrera de
                  lector será exitosa.
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Guarantee Section */}
        <div
          style={{
            marginTop: "16px",
            marginBottom: "16px",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "24px 16px",
            boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(229, 231, 235, 0.8)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Animated background shimmer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
              animation: "shimmer 3s infinite",
            }}
          />

          {/* Floating decorative elements */}
          <div
            style={{
              position: "absolute",
              top: "15px",
              right: "20px",
              fontSize: "20px",
              opacity: "0.3",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            💎
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "15px",
              left: "15px",
              fontSize: "18px",
              opacity: "0.3",
              animation: "float 3s ease-in-out infinite 1.5s",
            }}
          >
            ⚡
          </div>

          <h3
            style={{
              fontSize: "clamp(20px, 5vw, 28px)",
              fontWeight: "800",
              background: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "16px",
              textAlign: "center",
              lineHeight: "1.2",
              animation: "titlePulse 2s ease-in-out infinite alternate",
            }}
          >
            Garantía de devolución de dinero de 7 días
          </h3>

          <p
            style={{
              fontSize: "clamp(14px, 3.5vw, 18px)",
              color: "#555",
              lineHeight: "1.6",
              marginBottom: "24px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Nuestro método está respaldado por una garantía de devolución del
            dinero del 100%.
          </p>

          {/* Features list */}
          <div style={{ marginBottom: "32px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                marginBottom: "12px",
                animation: "slideInLeft 1s ease-out 0.2s both",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  background: "linear-gradient(135deg, #00b894, #00cec9)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                ✓
              </div>
              <span
                style={{
                  fontSize: "clamp(13px, 3.2vw, 16px)",
                  color: "#374151",
                  lineHeight: "1.4",
                  fontWeight: "500",
                }}
              >
                Estamos tan seguros de que nuestro método te ayudará que si
                simplemente en cualquier momento de los 7 días no ves resultados
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                marginBottom: "24px",
                animation: "slideInLeft 1s ease-out 0.4s both",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  background: "linear-gradient(135deg, #00b894, #00cec9)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                ✓
              </div>
              <span
                style={{
                  fontSize: "clamp(13px, 3.2vw, 16px)",
                  color: "#374151",
                  lineHeight: "1.4",
                  fontWeight: "500",
                }}
              >
                te regresaremos integral el pesar de excluir el método actual
                bajo las limitaciones
              </span>
            </div>
          </div>

          {/* Guarantee Badge */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "32px",
              animation: "badgeFloat 3s ease-in-out infinite",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                position: "relative",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1) rotate(5deg)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1) rotate(0deg)";
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(45deg, #ff6b6b, #ee5a24, #feca57, #ff9ff3)",
                  backgroundSize: "400% 400%",
                  animation: "gradientShift 4s ease infinite",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 12px 30px rgba(238, 90, 36, 0.4)",
                  position: "relative",
                }}
              >
                {/* Sparkle effects */}
                <div
                  style={{
                    position: "absolute",
                    top: "10%",
                    left: "20%",
                    width: "4px",
                    height: "4px",
                    background: "#feca57",
                    borderRadius: "50%",
                    animation: "sparkleFloat 2s ease-in-out infinite",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "20%",
                    right: "15%",
                    width: "4px",
                    height: "4px",
                    background: "#feca57",
                    borderRadius: "50%",
                    animation: "sparkleFloat 2s ease-in-out infinite 0.5s",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "25%",
                    left: "10%",
                    width: "4px",
                    height: "4px",
                    background: "#feca57",
                    borderRadius: "50%",
                    animation: "sparkleFloat 2s ease-in-out infinite 1s",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "15%",
                    right: "25%",
                    width: "4px",
                    height: "4px",
                    background: "#feca57",
                    borderRadius: "50%",
                    animation: "sparkleFloat 2s ease-in-out infinite 1.5s",
                  }}
                />

                <div
                  style={{
                    width: "85%",
                    height: "85%",
                    background: "white",
                    borderRadius: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "900",
                    color: "#ee5a24",
                    boxShadow: "inset 0 3px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(24px, 6vw, 32px)",
                      lineHeight: "1",
                      marginBottom: "4px",
                    }}
                  >
                    100%
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(8px, 2vw, 10px)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Garantía
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            style={{
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto",
              display: "block",
              padding: "clamp(16px, 4vw, 20px) clamp(20px, 5vw, 32px)",
              background:
                "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 50%, #ff4757 100%)",
              color: "white",
              border: "none",
              borderRadius: "50px",
              fontSize: "clamp(14px, 3.5vw, 18px)",
              fontWeight: "700",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 15px 40px rgba(255, 107, 107, 0.4)",
              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              position: "relative",
              overflow: "hidden",
              animation: "buttonPulse 2s ease-in-out infinite",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px) scale(1.02)";
              e.target.style.boxShadow = "0 20px 50px rgba(255, 107, 107, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.boxShadow = "0 15px 40px rgba(255, 107, 107, 0.4)";
            }}
            onClick={() => {
              window.location.href =
                "https://pay.hotmart.com/D101097522U?checkoutMode=10&src=lp1&return_screen=15";
            }}
          >
            {/* Button shimmer effect */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                transition: "left 0.6s",
              }}
            />

            <span style={{ position: "relative", zIndex: 1 }}>
              🔓 Accede al Método FocusRead
            </span>
          </button>

          {/* CSS para la animación pulse */}
          <style jsx>{`
            @keyframes buttonPulse {
              0%,
              100% {
                transform: scale(1);
                box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
              }
              50% {
                transform: scale(1.05);
                box-shadow: 0 20px 50px rgba(255, 107, 107, 0.7);
              }
            }
          `}</style>
        </div>

        <style jsx>{`
          @keyframes shimmer {
            0% {
              left: -100%;
            }
            100% {
              left: 100%;
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes titlePulse {
            from {
              transform: scale(1);
            }
            to {
              transform: scale(1.02);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes badgeFloat {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @keyframes sparkleFloat {
            0%,
            100% {
              transform: translateY(0px) scale(1);
              opacity: 0.7;
            }
            50% {
              transform: translateY(-10px) scale(1.2);
              opacity: 1;
            }
          }

          @keyframes buttonGlow {
            from {
              box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
            }
            to {
              box-shadow: 0 20px 50px rgba(255, 107, 107, 0.6);
            }
          }
        `}</style>
        <style>{`
          @keyframes fillBar {
            from { 
              transform: scaleX(0);
            }
            to { 
              transform: scaleX(1);
            }
          }
          
          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: 0 8px 25px -5px rgba(220, 38, 38, 0.4), 0 4px 6px -2px rgba(220, 38, 38, 0.1);
            }
            50% {
              box-shadow: 0 8px 25px -5px rgba(220, 38, 38, 0.6), 0 4px 6px -2px rgba(220, 38, 38, 0.2);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes pulseText {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.02);
            }
          }
          
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes buttonPulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 8px 25px -5px rgba(251, 191, 36, 0.5), 0 4px 6px -2px rgba(251, 191, 36, 0.2);
            }
            50% {
              transform: scale(1.03);
              box-shadow: 0 12px 35px -8px rgba(251, 191, 36, 0.8), 0 6px 8px -3px rgba(251, 191, 36, 0.4);
            }
          }
        `}</style>
      </div>
    ),
  };

  return (
    <div style={s.container}>
      <div style={s.card}>
        <div
          style={{
            width: "100%",
            height: "6px",
            backgroundColor: "rgba(107, 114, 128, 0.2)",
            borderRadius: "9999px",
            marginBottom: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #4F46E5, #7C3AED, #EC4899)",
              borderRadius: "9999px",
              width: `${(step / 15) * 100}%`,
              transition: "width 0.5s ease",
              boxShadow: "0 0 20px rgba(79, 70, 229, 0.4)",
            }}
          ></div>
        </div>
        {screens[step]}
      </div>
    </div>
  );
}
