// The "Selfie Frame" overlay. Now uses a real PNG asset uploaded by the user
// (NHS — "Proudly Support the NHS" / #SupportingKeyWorkers).
//
// PhotoPlaceholder fills the photo area underneath; SelfieFrame is the PNG
// overlay on top.

function PhotoPlaceholder({ kind = "capture", filter = "none", flipped = false }) {
  const filterCss = {
    none: "none",
    instant: "grayscale(100%) contrast(110%)",
    vintage: "sepia(70%) brightness(108%) saturate(120%)",
    chrome: "saturate(180%) contrast(115%)",
    transfer: "sepia(30%) saturate(150%) hue-rotate(-10deg)",
    process: "saturate(150%) hue-rotate(180deg) contrast(110%)",
  }[filter] || "none";

  const bg =
    kind === "live"
      ? "radial-gradient(120% 90% at 50% 35%, #d6cdb9 0%, #8a8e94 45%, #4b4d56 100%)"
      : "radial-gradient(120% 90% at 50% 30%, #e9d6b2 0%, #b39575 40%, #5d5247 100%)";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: bg,
        filter: filterCss,
        transform: flipped ? "scaleX(-1)" : "none",
        overflow: "hidden",
      }}
    >
      {/* mock head silhouette */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          width: "42%",
          aspectRatio: "1 / 1.15",
          borderRadius: "50% 50% 48% 48%",
          background:
            "radial-gradient(60% 60% at 45% 35%, rgba(255,235,210,0.55) 0%, rgba(180,140,100,0.35) 60%, transparent 100%)",
          filter: "blur(1px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "-4%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "44%",
          borderRadius: "50% 50% 0 0",
          background:
            "radial-gradient(80% 100% at 50% 0%, rgba(40,40,50,0.55) 0%, rgba(20,20,30,0.85) 60%, rgba(10,10,15,1) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          mixBlendMode: "overlay",
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      {kind === "live" && (
        <>
          {[
            { t: 16, l: 16, r: null, b: null, rot: 0 },
            { t: 16, l: null, r: 16, b: null, rot: 90 },
            { t: null, l: 16, r: null, b: 16, rot: -90 },
            { t: null, l: null, r: 16, b: 16, rot: 180 },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: m.t,
                left: m.l,
                right: m.r,
                bottom: m.b,
                width: 22,
                height: 22,
                borderTop: "2px solid rgba(255,255,255,0.85)",
                borderLeft: "2px solid rgba(255,255,255,0.85)",
                transform: `rotate(${m.rot}deg)`,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

// Overlay frame. Uses the uploaded PNG which already contains the campaign
// branding (header, hashtag banner, confetti). The image is 4:5 with a
// transparent center.
function SelfieFrame() {
  return (
    <img
      src="assets/frame-nhs.png"
      alt=""
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
        display: "block",
      }}
    />
  );
}

Object.assign(window, { PhotoPlaceholder, SelfieFrame });
