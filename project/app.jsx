// Main shell: device frame + screen router + tweaks panel.

const { useState, useEffect, useRef } = React;

const CAMPAIGN = {
  hashtag: "#SupportingKeyWorkers",
  partner: "NHS",
  cause: "KEY WORKERS",
  headline: "Proudly support the NHS",
  subhead: "Show your support for the key workers keeping us safe. Snap a photo, share the message.",
  supporters: "24,108",
  shares: "86,420",
  event: "Clap for Carers Week",
  endsIn: "4D",
};

const ACCENT_OPTIONS = [
  "#005EB8", // NHS blue
  "#0c0d12", // ink
  "#5A43FE", // BEZL purple
  "#E94952", // crimson
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
  "accent": "#005EB8",
  "startScreen": "entry"
} /*EDITMODE-END*/;

const SCREENS = ["entry", "camera", "preview", "success"];
const SCREEN_LABEL = {
  entry: "Entry",
  camera: "Camera",
  preview: "Preview",
  success: "Success",
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [screen, setScreen] = useState(t.startScreen || "entry");
  const [captureFilter, setCaptureFilter] = useState("none");
  const [capturedFilter, setCapturedFilter] = useState("none");
  const [flipped, setFlipped] = useState(false);

  // When tweak.startScreen changes, follow it.
  useEffect(() => {
    setScreen(t.startScreen);
  }, [t.startScreen]);

  const go = (name) => {
    if (name === "preview") setCapturedFilter(captureFilter);
    setScreen(name);
  };
  const reset = () => {
    setScreen("entry");
    setCaptureFilter("none");
    setCapturedFilter("none");
    setFlipped(false);
  };

  const ctx = {
    accent: t.accent,
    campaign: CAMPAIGN,
    go,
    reset,
    captureFilter,
    setCaptureFilter,
    capturedFilter,
    flipped,
    setFlipped,
  };

  return (
    <div
      data-screen-label={`${SCREENS.indexOf(screen) + 1} ${SCREEN_LABEL[screen]}`}
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "12px 12px",
        background:
          "radial-gradient(80% 60% at 50% 0%, #f3f4f7 0%, #ecedf0 60%, #e6e7eb 100%)",
      }}
    >
      {/* device — scales to fit available space */}
      <ScaledDevice>
        <ScreenRouter screen={screen} ctx={ctx} />
      </ScaledDevice>

      {/* flow stepper */}
      <FlowStepper screen={screen} onPick={setScreen} />

      {/* tweaks */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="UI accent">
          <TweakColor
            label="Accent"
            value={t.accent}
            options={ACCENT_OPTIONS}
            onChange={(v) => setTweak("accent", v)}
          />
        </TweakSection>

        <TweakSection label="Jump to screen">
          <TweakSelect
            label="Screen"
            value={screen}
            options={SCREENS.map((s) => ({ value: s, label: SCREEN_LABEL[s] }))}
            onChange={(v) => {
              setScreen(v);
              setTweak("startScreen", v);
            }}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

// ─── Router with crossfade ─────────────────────────────────────
function ScreenRouter({ screen, ctx }) {
  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {SCREENS.map((s) => {
        const active = s === screen;
        return (
          <div
            key={s}
            data-screen-label={`${SCREENS.indexOf(s) + 1} ${SCREEN_LABEL[s]}`}
            style={{
              position: "absolute",
              inset: 0,
              opacity: active ? 1 : 0,
              pointerEvents: active ? "auto" : "none",
              transition: "opacity 0.28s ease",
            }}
          >
            {s === "entry" && <EntryScreen ctx={ctx} />}
            {s === "camera" && <CameraScreen ctx={ctx} />}
            {s === "preview" && <PreviewScreen ctx={ctx} />}
            {s === "success" && <SuccessScreen ctx={ctx} />}
          </div>
        );
      })}
    </div>
  );
}

// ─── Flow Stepper (under device) ──────────────────────────────
function FlowStepper({ screen, onPick }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "#fff",
        padding: "6px 8px",
        borderRadius: 999,
        boxShadow: "0 4px 16px -8px rgba(12,13,18,0.15)",
        border: "1px solid #eaebee",
        fontFamily: "JetBrains Mono, monospace",
        flexShrink: 0,
        maxWidth: "100%",
      }}
    >
      {SCREENS.map((s, i) => {
        const active = s === screen;
        return (
          <React.Fragment key={s}>
            {i > 0 && (
              <div style={{ width: 10, height: 1, background: "#d0d2d8" }} />
            )}
            <button
              onClick={() => onPick(s)}
              style={{
                padding: "5px 8px",
                borderRadius: 999,
                border: "none",
                background: active ? "#0c0d12" : "transparent",
                color: active ? "#fff" : "#54565e",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              {String(i + 1).padStart(2, "0")} {SCREEN_LABEL[s]}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// ─── ScaledDevice: shrinks the 390×844 device to fit any viewport ──
function ScaledDevice({ children }) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const compute = () => {
      const el = wrapRef.current;
      if (!el) return;
      const parent = el.parentElement;
      if (!parent) return;
      const styles = getComputedStyle(parent);
      const availH =
        parent.clientHeight -
        parseFloat(styles.paddingTop) -
        parseFloat(styles.paddingBottom);
      const availW = parent.clientWidth - 24;
      // reserve room for stepper (≈48px) + gap (12px) below
      const reservedH = 60;
      const s = Math.min(
        (availH - reservedH) / 844,
        availW / 390,
        1
      );
      setScale(Math.max(0.2, s));
    };
    compute();
    window.addEventListener("resize", compute);
    const ro = new ResizeObserver(compute);
    if (wrapRef.current?.parentElement) ro.observe(wrapRef.current.parentElement);
    return () => {
      window.removeEventListener("resize", compute);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        width: 390 * scale,
        height: 844 * scale,
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 390,
          height: 844,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <IOSDevice width={390} height={844}>
          {children}
        </IOSDevice>
      </div>
    </div>
  );
}
