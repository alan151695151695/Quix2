import React, { useState, useEffect, useMemo } from "react";
// Agrega esto cerca de donde están tus otros useState

export default function Quiz() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState([]);
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Tracking simple
  const TRACKING_URL =
    "https://script.google.com/macros/s/AKfycbzcdDNzf2AQtu_F8zca0fgNLdwtQYU23kTNPikKHy8TpfLVT9wEmB79fEqQ8u0z20_u/exec";
  const userId = `user_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const trackProgress = async (screenNumber) => {
    try {
      fetch(TRACKING_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId, screen: screenNumber }),
      });
      console.log(`Pantalla ${screenNumber} enviada`);
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
    if (step === 15 && timeLeft === null) {
      setTimeLeft(300); // Inicia el contador solo cuando llega a la pantalla 15
    }
  }, [step]);
  useEffect(() => {
    if (step === 15 && timeLeft === null) {
      setTimeLeft(300); // Inicia el contador solo cuando llega a la pantalla 15
    }
  }, [step]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 300));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);
  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 300));
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
      <div>
        <h2
          style={{
            fontSize: "clamp(20px, 5vw, 28px)",
            fontWeight: "800",
            textAlign: "center",
            marginBottom: "20px",
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

        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(124, 58, 237, 0.05))",
            border: "1px solid rgba(79, 70, 229, 0.2)",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "24px",
            backdropFilter: "blur(10px)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "clamp(14px, 4vw, 16px)",
              color: "#374151",
              marginBottom: "8px",
              fontWeight: "500",
              lineHeight: "1.4",
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
              fontSize: "clamp(13px, 3.5vw, 15px)",
              color: "#6B7280",
              margin: 0,
              fontWeight: "500",
              lineHeight: "1.4",
            }}
          >
            <span style={{ fontWeight: "600", color: "#EC4899" }}>
              sobre 100 puntos
            </span>
            , necesitas y estás listo para leer más rápido, comprender mejor,
            memorizar más y eliminar el estrés mientras lees, empezar de hoy.
          </p>
        </div>

        <div
          style={{
            position: "relative",
            height: "120px",
            marginBottom: "20px",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "16px",
            padding: "10px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(79, 70, 229, 0.1)",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 320 150"
            style={{ overflow: "visible" }}
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
                  style={{ stopColor: "#10B981", stopOpacity: 1 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "#F59E0B", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#3B82F6", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>

            {/* Líneas suaves del eje X */}
            <line
              x1="40"
              y1="30"
              x2="40"
              y2="215"
              stroke="rgba(107, 114, 128, 0.2)"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
            <line
              x1="160"
              y1="30"
              x2="160"
              y2="215"
              stroke="rgba(107, 114, 128, 0.2)"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
            <line
              x1="280"
              y1="30"
              x2="280"
              y2="215"
              stroke="rgba(107, 114, 128, 0.2)"
              strokeWidth="1"
              strokeDasharray="2,2"
            />

            {/* Línea base */}
            <line
              x1="30"
              y1="215"
              x2="290"
              y2="215"
              stroke="rgba(107, 114, 128, 0.3)"
              strokeWidth="1"
            />

            {/* Curva suave en S */}
            <path
              d="M 40 180 Q 120 160, 160 120 T 280 60"
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                strokeDasharray: "400",
                strokeDashoffset: "400",
                animation: "drawCurve 1.5s ease-out forwards",
              }}
            />

            {/* Punto y burbuja "Tú hoy" - aparece cuando la línea llega */}
            <g>
              <circle
                cx="40"
                cy="180"
                r="8"
                fill="#10B981"
                style={{
                  opacity: 0,
                  animation: "fadeInPoint 0.3s ease-out 0.3s forwards",
                }}
              />
              <g
                style={{
                  opacity: 0,
                  animation: "bubbleIn 0.5s ease-out 0.5s forwards",
                  transformOrigin: "40px 201px",
                }}
              >
                <rect
                  x="8"
                  y="188"
                  width="64"
                  height="26"
                  rx="13"
                  fill="#10B981"
                />
                <text
                  x="40"
                  y="205"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="600"
                >
                  Tú hoy
                </text>
                {/* Flecha apuntando al punto */}
                <path
                  d="M 40 188 L 35 183 L 40 178 L 45 183 Z"
                  fill="#10B981"
                />
              </g>
            </g>

            {/* Punto y burbuja "Tú en 7 días" - aparece cuando la línea llega */}
            <g>
              <circle
                cx="160"
                cy="120"
                r="8"
                fill="#F59E0B"
                style={{
                  opacity: 0,
                  animation: "fadeInPoint 0.3s ease-out 0.8s forwards",
                }}
              />
              <g
                style={{
                  opacity: 0,
                  animation: "bubbleIn 0.5s ease-out 1.0s forwards",
                  transformOrigin: "160px 106px",
                }}
              >
                <rect
                  x="120"
                  y="90"
                  width="80"
                  height="26"
                  rx="13"
                  fill="#F59E0B"
                />
                <text
                  x="160"
                  y="107"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="600"
                >
                  Tú en 7 días
                </text>
                {/* Flecha apuntando al punto */}
                <path
                  d="M 160 116 L 155 121 L 160 126 L 165 121 Z"
                  fill="#F59E0B"
                />
              </g>
            </g>

            {/* Punto y burbuja "Tú en hasta 14 días" - aparece cuando la línea llega */}
            <g>
              <circle
                cx="280"
                cy="60"
                r="8"
                fill="#3B82F6"
                style={{
                  opacity: 0,
                  animation: "fadeInPoint 0.3s ease-out 1.3s forwards",
                }}
              />
              <g
                style={{
                  opacity: 0,
                  animation: "bubbleIn 0.5s ease-out 1.5s forwards",
                  transformOrigin: "280px 46px",
                }}
              >
                <rect
                  x="220"
                  y="30"
                  width="120"
                  height="26"
                  rx="13"
                  fill="#3B82F6"
                />
                <text
                  x="280"
                  y="47"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="600"
                >
                  Tú en hasta 14 días
                </text>
                {/* Flecha apuntando al punto */}
                <path
                  d="M 280 56 L 275 61 L 280 66 L 285 61 Z"
                  fill="#3B82F6"
                />
              </g>
            </g>

            {/* Etiquetas del eje X */}
            <text
              x="40"
              y="235"
              textAnchor="middle"
              fill="#6B7280"
              fontSize="12"
              fontWeight="500"
            >
              Poco
            </text>
            <text
              x="160"
              y="235"
              textAnchor="middle"
              fill="#6B7280"
              fontSize="12"
              fontWeight="500"
            >
              Medio
            </text>
            <text
              x="280"
              y="235"
              textAnchor="middle"
              fill="#6B7280"
              fontSize="12"
              fontWeight="500"
            >
              Mucho
            </text>
          </svg>
        </div>

        <p
          style={{
            fontSize: "clamp(12px, 3vw, 14px)",
            color: "#6B7280",
            textAlign: "center",
            marginBottom: "24px",
            fontWeight: "500",
          }}
        >
          Promedio: Por debajo del promedio - Lectura básica
        </p>

        <button
          onClick={() => setStep(12)}
          style={{
            ...s.button,
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
            
            @keyframes bubbleIn {
              0% {
                opacity: 0;
                transform: scale(0.3) translateY(10px);
              }
              60% {
                transform: scale(1.1) translateY(-2px);
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0);
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
        <h2
          style={{
            fontSize: "clamp(20px, 5vw, 28px)",
            fontWeight: "800",
            textAlign: "center",
            marginBottom: "32px",
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
          , tu entrenamiento está listo!
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          {/* Columna Antes */}
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                fontSize: "clamp(14px, 4vw, 18px)",
                fontWeight: "700",
                color: "#6B7280",
                marginBottom: "16px",
              }}
            >
              Antes
            </h3>
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "16px",
                overflow: "hidden",
                marginBottom: "20px",
                boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
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

            {/* Métricas Antes - igual que antes */}
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Velocidad de lectura
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#EF4444",
                  }}
                >
                  22%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span style={{ fontSize: "10px", color: "#9CA3AF" }}>Bajo</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "22%",
                    height: "100%",
                    background: "linear-gradient(90deg, #EF4444, #DC2626)",
                    borderRadius: "4px",
                    animation: "fillBar 2s ease-out forwards",
                    transformOrigin: "left",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Enfoque y comprensión
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#EF4444",
                  }}
                >
                  24%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span style={{ fontSize: "10px", color: "#9CA3AF" }}>Bajo</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "24%",
                    height: "100%",
                    background: "linear-gradient(90deg, #EF4444, #DC2626)",
                    borderRadius: "4px",
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
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Nivel de energía
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#EF4444",
                  }}
                >
                  18%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span style={{ fontSize: "10px", color: "#9CA3AF" }}>Bajo</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "18%",
                    height: "100%",
                    background: "linear-gradient(90deg, #EF4444, #DC2626)",
                    borderRadius: "4px",
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
            <h3
              style={{
                fontSize: "clamp(14px, 4vw, 18px)",
                fontWeight: "700",
                color: "#6B7280",
                marginBottom: "16px",
              }}
            >
              Después
            </h3>
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "16px",
                overflow: "hidden",
                marginBottom: "20px",
                boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
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

            {/* Métricas Después - igual que antes */}
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Velocidad de lectura
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#10B981",
                  }}
                >
                  100%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span style={{ fontSize: "10px", color: "#9CA3AF" }}>
                  Rápida
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, #10B981, #059669)",
                    borderRadius: "4px",
                    animation: "fillBar 2s ease-out 1.5s forwards",
                    transformOrigin: "left",
                    transform: "scaleX(0)",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Enfoque y comprensión
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#10B981",
                  }}
                >
                  92%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span style={{ fontSize: "10px", color: "#9CA3AF" }}>
                  Fuerte
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "92%",
                    height: "100%",
                    background: "linear-gradient(90deg, #10B981, #059669)",
                    borderRadius: "4px",
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
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Nivel de energía
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#10B981",
                  }}
                >
                  91%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span style={{ fontSize: "10px", color: "#9CA3AF" }}>Alto</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "91%",
                    height: "100%",
                    background: "linear-gradient(90deg, #10B981, #059669)",
                    borderRadius: "4px",
                    animation: "fillBar 2s ease-out 2.5s forwards",
                    transformOrigin: "left",
                    transform: "scaleX(0)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sección ¿Qué recibirás? */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(124, 58, 237, 0.05))",
            border: "1px solid rgba(79, 70, 229, 0.2)",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "24px",
            backdropFilter: "blur(10px)",
          }}
        >
          <h3
            style={{
              fontSize: "clamp(18px, 5vw, 24px)",
              fontWeight: "800",
              textAlign: "center",
              marginBottom: "32px",
              color: "#1F2937",
            }}
          >
            ¿Qué recibirás?
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Item 1 - Entrenamiento completo */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                borderRadius: "16px",
                padding: "20px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "16px",
                }}
              >
                <img
                  src="/images/imagen1.webp"
                  alt="Entrenamiento completo"
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
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    color: "#10B981",
                    fontSize: "16px",
                    marginRight: "8px",
                    marginTop: "2px",
                  }}
                >
                  ✅
                </span>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#374151",
                    margin: "0 0 8px 0",
                  }}
                >
                  Entrenamiento completo en 14 días
                </h4>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6B7280",
                  lineHeight: "1.4",
                  margin: 0,
                  paddingLeft: "24px",
                }}
              >
                Para aumentar tu velocidad de lectura y tu capacidad de
                comprensión. Solo necesitarás 8 minutos al día para entrenar y
                obtener el resultado
              </p>
            </div>

            {/* Item 2 - Reglas de lectura */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                borderRadius: "16px",
                padding: "20px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "16px",
                }}
              >
                <img
                  src="/images/imagen2.webp"
                  alt="Reglas de lectura"
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
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    color: "#10B981",
                    fontSize: "16px",
                    marginRight: "8px",
                    marginTop: "2px",
                  }}
                >
                  ✅
                </span>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#374151",
                    margin: "0 0 8px 0",
                  }}
                >
                  Reglas de lectura
                </h4>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6B7280",
                  lineHeight: "1.4",
                  margin: "0 0 12px 0",
                  paddingLeft: "24px",
                }}
              >
                Para personas que tienen problemas para concentrarse y se
                pierden mientras leen.
              </p>
              <p
                style={{
                  fontSize: "11px",
                  color: "#9CA3AF",
                  margin: 0,
                  paddingLeft: "24px",
                  fontStyle: "italic",
                }}
              >
                Plantilla (PDF) para que puedas imprimir
              </p>
            </div>

            {/* Item 3 - Videos de apoyo */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                borderRadius: "16px",
                padding: "20px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "16px",
                }}
              >
                <img
                  src="/images/imagen3.webp"
                  alt="Videos de apoyo"
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
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    color: "#10B981",
                    fontSize: "16px",
                    marginRight: "8px",
                    marginTop: "2px",
                  }}
                >
                  ✅
                </span>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#374151",
                    margin: "0 0 8px 0",
                  }}
                >
                  Videos de apoyo
                </h4>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6B7280",
                  lineHeight: "1.4",
                  margin: 0,
                  paddingLeft: "24px",
                }}
              >
                Aprende de forma rápida y sencilla
              </p>
              <p
                style={{
                  fontSize: "11px",
                  color: "#9CA3AF",
                  margin: "8px 0 0 0",
                  paddingLeft: "24px",
                  fontStyle: "italic",
                }}
              >
                (Acceso a los videos en enlaces que encontrarás en el libro
                digital)
              </p>
            </div>

            {/* Item 4 - Hoja de cálculo SMART */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                borderRadius: "16px",
                padding: "20px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "16px",
                }}
              >
                <img
                  src="/images/imagen4.webp"
                  alt="Hoja de cálculo SMART"
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
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    color: "#10B981",
                    fontSize: "16px",
                    marginRight: "8px",
                    marginTop: "2px",
                  }}
                >
                  ✅
                </span>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#374151",
                    margin: "0 0 8px 0",
                  }}
                >
                  Hoja de cálculo SMART
                </h4>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6B7280",
                  lineHeight: "1.4",
                  margin: 0,
                  paddingLeft: "24px",
                }}
              >
                Para comprobar tu progreso diariamente
              </p>
            </div>
          </div>
        </div>
        {/* Sección Bonos */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "24px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <span style={{ fontSize: "28px", marginRight: "12px" }}>🎁</span>
            <h3
              style={{
                fontSize: "clamp(18px, 5vw, 24px)",
                fontWeight: "800",
                color: "#1F2937",
                margin: 0,
              }}
            >
              Bonos que recibirás por tu compra{" "}
              <span style={{ fontSize: "24px" }}>👇</span>
            </h3>
          </div>

          <div style={{ marginBottom: "24px" }}>
            {[
              "🎁 Videos de apoyo",
              "🎁 Atención directa vía WhatsApp",
              "🎁 Bono sorpresa (solo para estudiantes que completen los 14 días y envíen el resultado)",
              "🎁 Hoja de cálculo SMART",
              "🎁 Plantilla de regla de lectura",
            ].map((bonus, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "12px",
                  fontSize: "14px",
                  color: "#374151",
                  fontWeight: "500",
                }}
              >
                <span style={{ marginRight: "8px", fontSize: "16px" }}>
                  {bonus.split(" ")[0]}
                </span>
                <span>{bonus.split(" ").slice(1).join(" ")}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#000000",
              color: "white",
              padding: "16px",
              borderRadius: "12px",
              textAlign: "center",
              marginBottom: "20px",
              fontWeight: "700",
              fontSize: "18px",
            }}
          >
            ACCESO DE POR VIDA
          </div>

          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <p
              style={{
                fontSize: "16px",
                color: "#374151",
                margin: "0 0 8px 0",
                fontWeight: "500",
              }}
            >
              ¡Haces un pago único de{" "}
              <span style={{ color: "#EF4444", fontWeight: "700" }}>
                9,99 USD
              </span>{" "}
              y
            </p>
            <p
              style={{
                fontSize: "16px",
                color: "#374151",
                margin: 0,
                fontWeight: "500",
              }}
            >
              tienes{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #EF4444, #DC2626)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "700",
                }}
              >
                acceso al material de por vida
              </span>
              !
            </p>
          </div>

          <div
            style={{
              background: "#000000",
              color: "white",
              padding: "16px",
              borderRadius: "12px",
              textAlign: "center",
              marginBottom: "20px",
              fontWeight: "700",
              fontSize: "18px",
            }}
          >
            GARANTÍA DE 7 DÍAS
          </div>

          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <p
              style={{
                fontSize: "14px",
                color: "#6B7280",
                margin: "0 0 12px 0",
                lineHeight: "1.4",
              }}
            >
              Garantizamos el reembolso completo del importe pagado dentro de
              los 7 días posteriores a la compra.
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#6B7280",
                margin: 0,
                lineHeight: "1.4",
              }}
            >
              Si por cualquier motivo no estás satisfecho, puede solicitar su
              garantía y le reembolsaremos su dinero sin resentimientos.
            </p>
          </div>

          <div
            style={{
              background: "#EF4444",
              color: "white",
              padding: "16px",
              borderRadius: "12px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                fontWeight: "700",
                marginBottom: "12px",
              }}
            >
              OFERTA DISPONIBLE HASTA
            </div>
            <div
              style={{ display: "flex", gap: "12px", justifyContent: "center" }}
            >
              <div
                style={{
                  background: "rgba(0,0,0,0.2)",
                  padding: "12px",
                  borderRadius: "8px",
                  minWidth: "60px",
                }}
              >
                <div style={{ fontSize: "24px", fontWeight: "800" }}>
                  {timeLeft ? Math.floor(timeLeft / 60) : 5}
                </div>
                <div style={{ fontSize: "12px" }}>Minutos</div>
              </div>
              <div
                style={{
                  background: "rgba(0,0,0,0.2)",
                  padding: "12px",
                  borderRadius: "8px",
                  minWidth: "60px",
                }}
              >
                <div style={{ fontSize: "24px", fontWeight: "800" }}>
                  {timeLeft ? timeLeft % 60 : 0}
                </div>
                <div style={{ fontSize: "12px" }}>Segundos</div>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #3B82F6, #1E40AF)",
              color: "white",
              padding: "16px",
              borderRadius: "12px",
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            CONDICIÓN ESPECIAL - DESCUENTO DE 47 USD
          </div>

          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))",
              border: "2px solid #10B981",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "20px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-12px",
                left: "20px",
                background: "white",
                padding: "4px 12px",
                fontSize: "12px",
                color: "#10B981",
                fontWeight: "600",
              }}
            >
              Antes 57 USD
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#374151",
                    margin: "0 0 4px 0",
                  }}
                >
                  Método FocusRead
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#10B981",
                    fontWeight: "600",
                    margin: "0 0 8px 0",
                  }}
                >
                  Ahora 9,99 USD
                </p>
                <p style={{ fontSize: "12px", color: "#6B7280", margin: 0 }}>
                  Libro electrónico completo + 5 bonos
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#9CA3AF",
                    margin: "4px 0 0 0",
                  }}
                >
                  Disponible para pago a cuotas con tarjeta de crédito
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() =>
              (window.location.href =
                "https://pay.hotmart.com/D101097522U?checkoutMode=10&src=lp1")
            }
            style={{
              ...s.button,
              background: "linear-gradient(135deg, #EF4444, #DC2626)",
              fontSize: "clamp(16px, 4vw, 20px)",
              fontWeight: "700",
              padding: "18px 32px",
              marginBottom: "16px",
              boxShadow: "0 15px 35px -5px rgba(239, 68, 68, 0.4)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow =
                "0 20px 40px -5px rgba(239, 68, 68, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow =
                "0 15px 35px -5px rgba(239, 68, 68, 0.4)";
            }}
          >
            Quiero garantizar mi acceso ahora
          </button>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "25px",
                background: "linear-gradient(135deg, #FF5F00, #EB001B)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "10px",
                fontWeight: "600",
              }}
            >
              MC
            </div>
            <div
              style={{
                width: "40px",
                height: "25px",
                background: "linear-gradient(135deg, #1A1F71, #0066CC)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "10px",
                fontWeight: "600",
              }}
            >
              VISA
            </div>
            <div
              style={{
                width: "40px",
                height: "25px",
                background: "linear-gradient(135deg, #006FCF, #0048CC)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "8px",
                fontWeight: "600",
              }}
            >
              AMEX
            </div>
            <div
              style={{
                width: "40px",
                height: "25px",
                background: "linear-gradient(135deg, #D50000, #FF1744)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "8px",
                fontWeight: "600",
              }}
            >
              OXXO
            </div>
            <div
              style={{
                width: "40px",
                height: "25px",
                background: "linear-gradient(135deg, #00C853, #4CAF50)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "8px",
                fontWeight: "600",
              }}
            >
              PIX
            </div>
            <div
              style={{
                width: "40px",
                height: "25px",
                background: "linear-gradient(135deg, #1976D2, #42A5F5)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "7px",
                fontWeight: "600",
              }}
            >
              PAYPAL
            </div>
          </div>

          <div
            style={{
              textAlign: "center",
              padding: "16px",
              background: "rgba(255, 255, 255, 0.6)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "#10B981",
                margin: "0",
                fontWeight: "600",
              }}
            >
              🔒 Compra 100% segura
            </p>
          </div>
        </div>
        {/* Sección Testimonios */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(124, 58, 237, 0.05))",
            border: "1px solid rgba(79, 70, 229, 0.2)",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "24px",
            backdropFilter: "blur(10px)",
          }}
        >
          <h3
            style={{
              fontSize: "clamp(18px, 5vw, 24px)",
              fontWeight: "800",
              textAlign: "center",
              marginBottom: "32px",
              color: "#1F2937",
              lineHeight: "1.3",
            }}
          >
            +7.000 estudiantes están multiplicando su velocidad de lectura y
            aumentando su comprensión en este momento
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              width: "100%",
              maxWidth: "100%",
            }}
          >
            {/* Testimonio 1 */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                borderRadius: "16px",
                padding: "20px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{ display: "flex", gap: "4px", marginBottom: "12px" }}
              >
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#F59E0B", fontSize: "16px" }}>
                    ⭐
                  </span>
                ))}
              </div>
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#374151",
                  margin: "0 0 8px 0",
                }}
              >
                El primer día
              </h4>
              <p
                style={{
                  fontSize: "12px",
                  color: "#10B981",
                  margin: "0 0 12px 0",
                  fontWeight: "600",
                }}
              >
                Manuela Ramirez
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  lineHeight: "1.5",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                Confieso que el primer día me hizo pensar en cuánta energía
                desperdicio al usar la memoria auditiva y visual juntas, lo que
                dificulta y me hace lento terminar de leer un libro, un artículo
                o un noticiero. En la primera prueba, logré leer 181 palabras
                por minuto. En la segunda, 260 palabras por minuto.
              </p>
            </div>

            {/* Testimonio 2 */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                borderRadius: "16px",
                padding: "20px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{ display: "flex", gap: "4px", marginBottom: "12px" }}
              >
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#F59E0B", fontSize: "16px" }}>
                    ⭐
                  </span>
                ))}
              </div>
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#374151",
                  margin: "0 0 8px 0",
                }}
              >
                Super efectivo!!!
              </h4>
              <p
                style={{
                  fontSize: "12px",
                  color: "#10B981",
                  margin: "0 0 12px 0",
                  fontWeight: "600",
                }}
              >
                Andres Orozco
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  lineHeight: "1.5",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                Comencé a leer y me quedé dormido, con este método comenzé y no
                sentí sueño, leí al mismo tiempo que antes, pero sin dormir,
                incluso esto me impresionó.
              </p>
            </div>

            {/* Testimonio 3 */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                borderRadius: "16px",
                padding: "20px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{ display: "flex", gap: "4px", marginBottom: "12px" }}
              >
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#F59E0B", fontSize: "16px" }}>
                    ⭐
                  </span>
                ))}
              </div>
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#374151",
                  margin: "0 0 8px 0",
                }}
              >
                Mi mejor compra
              </h4>
              <p
                style={{
                  fontSize: "12px",
                  color: "#10B981",
                  margin: "0 0 12px 0",
                  fontWeight: "600",
                }}
              >
                Camila Martinez
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  lineHeight: "1.5",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                De 97 palabras por minuto a 191 palabras por minuto, con una
                comprensión mucho mejor.
              </p>
            </div>
          </div>
        </div>
        {/* Sección Más opiniones */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "24px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(18px, 5vw, 24px)",
                fontWeight: "800",
                color: "#1F2937",
                margin: 0,
                textAlign: "center",
              }}
            >
              Más opiniones de nuestros alumnos...{" "}
              <span style={{ fontSize: "24px" }}>👇</span>
            </h3>
          </div>

          <div
            style={{
              position: "relative",
              maxWidth: "400px",
              margin: "0 auto",
              overflow: "hidden",
              borderRadius: "16px",
              boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                transition: "transform 0.5s ease",
                transform: `translateX(-${(currentSlide || 0) * 100}%)`,
              }}
            >
              {["test1.webp", "test2.webp", "test3.webp"].map(
                (image, index) => (
                  <div
                    key={index}
                    style={{
                      minWidth: "100%",
                      height: "600px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#f8f9fa",
                    }}
                  >
                    <img
                      src={`/images/${image}`}
                      alt={`Testimonio ${index + 1}`}
                      loading="lazy"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                )
              )}
            </div>

            {/* Botones de navegación */}
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  (prev || 0) > 0 ? (prev || 0) - 1 : 2
                )
              }
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(0, 0, 0, 0.7)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(0, 0, 0, 0.5)";
              }}
            >
              ‹
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => ((prev || 0) + 1) % 3)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(0, 0, 0, 0.7)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(0, 0, 0, 0.5)";
              }}
            >
              ›
            </button>

            {/* Indicadores */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "8px",
              }}
            >
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: "none",
                    background:
                      (currentSlide || 0) === index
                        ? "#4F46E5"
                        : "rgba(255, 255, 255, 0.5)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Sección La vida antes y después */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "24px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* La vida antes del método FocusRead */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "24px",
              border: "1px solid rgba(239, 68, 68, 0.2)",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(16px, 4vw, 20px)",
                fontWeight: "700",
                color: "#1F2937",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              La vida antes del método FocusRead
            </h3>

            <div style={{ display: "grid", gap: "12px" }}>
              {[
                "Te gusta leer, pero te sientes cansado y somnoliento cuando intentas leer un libro.",
                "No te gusta leer, pero necesitas una solución efectiva para estudiar.",
                "Lees, pero no puedes aprender ni recordar el contenido.",
                "Lo leí varias veces y no pude entender el contenido.",
                "Aumenta la acumulación de libros que nunca se leen.",
                "Ese espacio en blanco durante un examen.",
                "No se pudo revisar el contenido a tiempo antes del examen.",
                "No puedes estudiar todo el contenido que necesitas en el tiempo",
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "12px",
                    background: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "12px",
                    border: "1px solid rgba(239, 68, 68, 0.1)",
                  }}
                >
                  <span
                    style={{
                      color: "#EF4444",
                      fontSize: "16px",
                      fontWeight: "600",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  >
                    ✗
                  </span>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#374151",
                      margin: 0,
                      lineHeight: "1.4",
                      fontWeight: "500",
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* La vida después de usar el método FocusRead */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "24px",
              border: "1px solid rgba(16, 185, 129, 0.2)",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(16px, 4vw, 20px)",
                fontWeight: "700",
                color: "#1F2937",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              La vida después de usar el método FocusRead
            </h3>

            <div style={{ display: "grid", gap: "12px" }}>
              {[
                "Podrás estudiar un gran volumen de contenidos en poco tiempo.",
                "Podrás terminar de leer sin quedarte dormido ni dormitar.",
                "Entiendes el contenido y aprendes más rápido.",
                "Recuerdas el contenido fácilmente.",
                "Puedes leer tantos libros como quieras.",
                "Gastarás más dinero comprando más libros porque tu cartera de pedidos se habrá ido.",
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "12px",
                    background: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "12px",
                    border: "1px solid rgba(16, 185, 129, 0.1)",
                  }}
                >
                  <span
                    style={{
                      color: "#10B981",
                      fontSize: "16px",
                      fontWeight: "600",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#374151",
                      margin: 0,
                      lineHeight: "1.4",
                      fontWeight: "500",
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action final */}
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              background:
                "linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(124, 58, 237, 0.05))",
              borderRadius: "16px",
              border: "1px solid rgba(79, 70, 229, 0.2)",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(20px, 5vw, 28px)",
                fontWeight: "800",
                color: "#1F2937",
                marginBottom: "20px",
                lineHeight: "1.2",
              }}
            >
              Accede al Método FocusRead ahora
            </h3>

            <button
              onClick={() =>
                (window.location.href =
                  "https://pay.hotmart.com/D101097522U?checkoutMode=10&src=lp1")
              }
              style={{
                background: "linear-gradient(135deg, #EF4444, #DC2626)",
                color: "white",
                border: "none",
                borderRadius: "16px",
                padding: "18px 40px",
                fontSize: "clamp(16px, 4vw, 20px)",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 15px 35px -5px rgba(239, 68, 68, 0.4)",
                marginBottom: "20px",
                width: "100%",
                maxWidth: "280px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow =
                  "0 20px 40px -5px rgba(239, 68, 68, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 15px 35px -5px rgba(239, 68, 68, 0.4)";
              }}
            >
              Accede al Método FocusRead
            </button>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "25px",
                  background: "linear-gradient(135deg, #FF5F00, #EB001B)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "600",
                }}
              >
                MC
              </div>
              <div
                style={{
                  width: "40px",
                  height: "25px",
                  background: "linear-gradient(135deg, #1A1F71, #0066CC)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "600",
                }}
              >
                VISA
              </div>
              <div
                style={{
                  width: "40px",
                  height: "25px",
                  background: "linear-gradient(135deg, #006FCF, #0048CC)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "8px",
                  fontWeight: "600",
                }}
              >
                AMEX
              </div>
              <div
                style={{
                  width: "40px",
                  height: "25px",
                  background: "linear-gradient(135deg, #D50000, #FF1744)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "8px",
                  fontWeight: "600",
                }}
              >
                OXXO
              </div>
              <div
                style={{
                  width: "40px",
                  height: "25px",
                  background: "linear-gradient(135deg, #00C853, #4CAF50)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "8px",
                  fontWeight: "600",
                }}
              >
                PIX
              </div>
              <div
                style={{
                  width: "40px",
                  height: "25px",
                  background: "linear-gradient(135deg, #1976D2, #42A5F5)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "7px",
                  fontWeight: "600",
                }}
              >
                PAYPAL
              </div>
            </div>
          </div>
        </div>
        {/* Sección Garantía */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "24px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "clamp(20px, 5vw, 28px)",
              fontWeight: "800",
              color: "#1F2937",
              marginBottom: "20px",
              lineHeight: "1.2",
            }}
          >
            Garantía de devolución de dinero de 7 días
          </h3>

          <p
            style={{
              fontSize: "clamp(14px, 4vw, 16px)",
              color: "#6B7280",
              marginBottom: "16px",
              lineHeight: "1.5",
              fontWeight: "500",
            }}
          >
            Nuestro método está respaldado por una garantía de devolución del
            dinero del 100%.
          </p>

          <p
            style={{
              fontSize: "clamp(14px, 4vw, 16px)",
              color: "#6B7280",
              marginBottom: "32px",
              lineHeight: "1.5",
              fontWeight: "500",
              maxWidth: "600px",
              margin: "0 auto 32px auto",
            }}
          >
            Estamos tan seguros de que nuestro método le dará los resultados que
            promete que le ofrecemos dentro de los 7 días posteriores a la
            compra si no ve resultados visibles a pesar de seguir el método
            según las instrucciones.
          </p>

          {/* Icono de Garantía */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "120px",
                height: "120px",
              }}
            >
              {/* Badge principal */}
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  background: "linear-gradient(135deg, #F59E0B, #D97706)",
                  borderRadius: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "800",
                  fontSize: "14px",
                  textAlign: "center",
                  boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)",
                  border: "4px solid white",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <div style={{ fontSize: "12px", lineHeight: "1.1" }}>
                  GARANTÍA
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "900",
                    margin: "4px 0",
                  }}
                >
                  100%
                </div>
                <div style={{ fontSize: "10px", lineHeight: "1.1" }}>
                  SATISFACCIÓN
                </div>
              </div>

              {/* Ribbons/cintas */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    width: "0",
                    height: "0",
                    borderLeft: "15px solid transparent",
                    borderRight: "15px solid transparent",
                    borderTop: "25px solid #DC2626",
                    marginRight: "5px",
                    display: "inline-block",
                  }}
                />
                <div
                  style={{
                    width: "0",
                    height: "0",
                    borderLeft: "15px solid transparent",
                    borderRight: "15px solid transparent",
                    borderTop: "25px solid #EF4444",
                    display: "inline-block",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Texto adicional */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              borderRadius: "12px",
              padding: "16px",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#065F46",
                margin: 0,
                fontWeight: "600",
                lineHeight: "1.4",
              }}
            >
              🛡️ Sin riesgo para ti. Si no estás satisfecho, te devolvemos el
              100% de tu dinero.
            </p>
          </div>
        </div>
        <style>
          {`
            @keyframes fillBar {
              from {
                transform: scaleX(0);
              }
              to {
                transform: scaleX(1);
              }
            }
            
            .hover-button {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .hover-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.3);
            }
            
            .hover-red:hover {
              box-shadow: 0 20px 40px -5px rgba(239, 68, 68, 0.5);
            }
          `}
        </style>
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
