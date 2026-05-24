// All 4 screens for the BEZL × Tide Turners flow.
// Each is a function component that takes:
//   ctx: { accent, pattern, campaign, go(name), reset(), captureFilter, setCaptureFilter, flipped, setFlipped, capturedFilter }

const BEZL_APP_URL = "https://apps.apple.com/us/app/bezl/id6763313319";

const openBezl = () => window.open(BEZL_APP_URL, "_blank", "noopener,noreferrer");

const BG = "#fbfbfc";

// ─────────────────────────────────────────────────────────────
// 1. CAMPAIGN ENTRY
// ─────────────────────────────────────────────────────────────
function EntryScreen({ ctx }) {
  const { accent, campaign, go } = ctx;
  return (
    <div
      style={{
        height: "100%",
        background: BG,
        display: "flex",
        flexDirection: "column",
        paddingTop: 50,
      }}
    >
      {/* org header */}
      <div
        style={{
          padding: "10px 22px 6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#0c0d12",
            letterSpacing: "-0.005em",
          }}
        >
          {campaign.partner}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 15,
            height: 15,
            borderRadius: 999,
            background: "#1d9bf0",
            color: "#fff",
          }}
          aria-label="verified"
        >
          <I.Check size={10} />
        </span>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "8px 22px 16px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          {/* preview card */}
          <div
            style={{
              width: "100%",
              aspectRatio: "4 / 5",
              position: "relative",
              boxShadow:
                "0 18px 40px -16px rgba(12,13,18,0.25), 0 2px 6px rgba(12,13,18,0.08)",
              borderRadius: 4,
              overflow: "hidden",
              background: "#ddd",
            }}
          >
            <PhotoPlaceholder kind="capture" />
            <SelfieFrame />
          </div>

          {/* campaign info */}
          <div style={{ textAlign: "center", marginTop: 2 }}>
            <h1
              className="display"
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "#0c0d12",
                lineHeight: 1.2,
              }}
            >
              {campaign.headline}
            </h1>
            <p
              style={{
                margin: "6px 14px 0",
                color: "#54565e",
                fontSize: 13,
                lineHeight: 1.45,
              }}
            >
              {campaign.subhead}
            </p>
          </div>

          {/* stats + trending — single row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 12,
              color: "#54565e",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div>
              <span style={{ color: "#0c0d12", fontWeight: 600 }}>{campaign.supporters}</span>{" "}
              <span style={{ color: "#9b9ea6" }}>joined</span>
            </div>
            <div style={{ width: 3, height: 3, borderRadius: 999, background: "#d0d2d8" }} />
            <div>
              <span style={{ color: "#0c0d12", fontWeight: 600 }}>{campaign.shares}</span>{" "}
              <span style={{ color: "#9b9ea6" }}>shares</span>
            </div>
            <div style={{ width: 3, height: 3, borderRadius: 999, background: "#d0d2d8" }} />
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                color: "#5A43FE",
                fontWeight: 600,
              }}
            >
              <I.Spark size={12} />
              Trending
            </div>
          </div>

          {/* urgency banner — compact horizontal */}
          <div
            style={{
              background: "#0c0d12",
              color: "#fff",
              borderRadius: 12,
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: accent,
              }}
            />
            <div style={{ fontSize: 12, fontWeight: 600 }}>{campaign.event}</div>
            <div
              style={{
                marginLeft: "auto",
                fontSize: 10,
                color: accent,
                fontFamily: "JetBrains Mono, monospace",
                letterSpacing: "0.08em",
              }}
            >
              ENDS IN {campaign.endsIn}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
          <PrimaryButton accent={accent} onClick={() => go("camera")}>
            Use Instantly
          </PrimaryButton>
          <SecondaryButton onClick={openBezl}>Open in BEZL App</SecondaryButton>
          <PoweredByBezl marginTop={6} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. CAMERA EXPERIENCE
// ─────────────────────────────────────────────────────────────
const FILTERS = [
  { id: "none", label: "None", short: "N" },
  { id: "instant", label: "Instant", short: "I" },
  { id: "vintage", label: "Vintage", short: "V" },
  { id: "chrome", label: "Chrome", short: "C" },
  { id: "transfer", label: "Transfer", short: "T" },
  { id: "process", label: "Process", short: "P" },
];

function CameraScreen({ ctx }) {
  const { accent, campaign, go, captureFilter, setCaptureFilter, flipped, setFlipped } =
    ctx;
  const [mode, setMode] = React.useState("photo");
  const [shutter, setShutter] = React.useState(false);
  const [flash, setFlash] = React.useState("off"); // off | on | auto
  const [timer, setTimer] = React.useState(0); // 0 | 3 | 10
  const [grid, setGrid] = React.useState(false);

  const cycleFlash = () =>
    setFlash(flash === "off" ? "auto" : flash === "auto" ? "on" : "off");
  const cycleTimer = () =>
    setTimer(timer === 0 ? 3 : timer === 3 ? 10 : 0);

  const capture = () => {
    if (timer > 0) {
      setCountdown(timer);
      return;
    }
    doCapture();
  };

  const doCapture = () => {
    setShutter(true);
    setTimeout(() => {
      setShutter(false);
      go("preview");
    }, 380);
  };

  const [countdown, setCountdown] = React.useState(0);
  React.useEffect(() => {
    if (countdown <= 0) return;
    const id = setTimeout(() => {
      if (countdown === 1) {
        setCountdown(0);
        doCapture();
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  return (
    <div
      style={{
        height: "100%",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          paddingTop: 58,
          paddingBottom: 10,
          paddingLeft: 14,
          paddingRight: 14,
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: "1px solid #eef0f3",
        }}
      >
        <button
          onClick={() => go("entry")}
          style={iconButtonStyle()}
          aria-label="close"
        >
          <I.Close size={18} />
        </button>

        {/* Quick controls — tap to cycle */}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <QuickToggle
            active={flash !== "off"}
            accent={accent}
            label={flash === "off" ? null : flash === "auto" ? "Auto" : "On"}
            icon={
              flash === "off" ? <I.FlashOff size={15} /> :
              flash === "auto" ? <I.FlashAuto size={15} /> :
              <I.Flash size={15} />
            }
            onClick={cycleFlash}
            aria-label="flash"
          />
          <QuickToggle
            active={timer !== 0}
            accent={accent}
            label={timer === 0 ? null : `${timer}s`}
            icon={<I.Timer size={15} />}
            onClick={cycleTimer}
            aria-label="timer"
          />
          <QuickToggle
            active={grid}
            accent={accent}
            icon={<I.Grid size={15} />}
            onClick={() => setGrid(!grid)}
            aria-label="grid"
          />
        </div>
      </div>

      {/* VIEWFINDER */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 14px",
          background: "#fff",
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "4 / 5",
            position: "relative",
            background: "#0c0d12",
            overflow: "hidden",
            borderRadius: 2,
            boxShadow: "0 14px 32px -16px rgba(12,13,18,0.4)",
          }}
        >
          <PhotoPlaceholder kind="live" filter={captureFilter} flipped={flipped} />
          <SelfieFrame />

          {/* shutter flash */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#fff",
              opacity: shutter ? 0.95 : 0,
              transition: "opacity 0.18s",
              pointerEvents: "none",
              zIndex: 20,
            }}
          />

          {/* countdown overlay */}
          {countdown > 0 && (
            <div
              key={countdown}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 15,
                pointerEvents: "none",
              }}
            >
              <div
                className="display"
                style={{
                  fontSize: 120,
                  fontWeight: 600,
                  color: "#fff",
                  textShadow: "0 4px 24px rgba(0,0,0,0.5)",
                  animation: "bezlPulse 1s ease-out",
                }}
              >
                {countdown}
              </div>
            </div>
          )}

          {/* grid overlay */}
          {grid && (
            <div
              style={{
                position: "absolute",
                top: 56,
                bottom: 56,
                left: 26,
                right: 26,
                pointerEvents: "none",
                zIndex: 4,
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
                backgroundSize: "33.333% 33.333%",
              }}
            />
          )}

          {/* REC pill if video */}
          {mode === "video" && (
            <div
              style={{
                position: "absolute",
                top: 64,
                left: 36,
                zIndex: 6,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(12,13,18,0.7)",
                color: "#fff",
                padding: "4px 10px",
                borderRadius: 999,
                fontSize: 10,
                letterSpacing: "0.12em",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "#E94952",
                  animation: "bezlBlink 1.1s infinite",
                }}
              />
              REC 00:00
            </div>
          )}
        </div>
      </div>

      {/* FILTERS */}
      <div
        style={{
          padding: "14px 0 4px",
          borderTop: "1px solid #eef0f3",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 14,
            padding: "0 14px",
            overflowX: "auto",
            justifyContent: "center",
            flexWrap: "nowrap",
          }}
        >
          {FILTERS.map((f) => {
            const active = captureFilter === f.id;
            return (
              <FilterSwatch
                key={f.id}
                filter={f}
                active={active}
                accent={accent}
                onClick={() => setCaptureFilter(f.id)}
              />
            );
          })}
        </div>
      </div>

      {/* CONTROLS */}
      <div
        style={{
          padding: "14px 24px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button style={squareIconStyle()} aria-label="gallery">
            <I.Gallery size={22} />
          </button>

          {/* shutter */}
          <button
            onClick={capture}
            style={{
              width: 72,
              height: 72,
              borderRadius: 999,
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              position: "relative",
              outline: "none",
            }}
            aria-label="capture"
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                border: `2.5px solid ${mode === "video" ? "#E94952" : "#0c0d12"}`,
                background: "transparent",
                transition: "border-color 0.2s",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 6,
                borderRadius: mode === "video" ? (shutter ? 8 : 999) : 999,
                background: mode === "video" ? "#E94952" : "#fff",
                border: mode === "photo" ? "1px solid rgba(0,0,0,0.08)" : "none",
                transform: shutter ? "scale(0.86)" : "scale(1)",
                transition:
                  "transform 0.15s ease, border-radius 0.18s ease, background 0.2s",
              }}
            />
          </button>

          <button
            onClick={() => setFlipped((f) => !f)}
            style={squareIconStyle()}
            aria-label="flip"
          >
            <I.Flip size={22} />
          </button>
        </div>

        <ModeToggle mode={mode} onChange={setMode} />
        <PoweredByBezl marginTop={2} />
      </div>

      <style>{`
        @keyframes bezlBlink { 0%,49%{opacity:1} 50%,100%{opacity:0.2} }
        @keyframes bezlPulse {
          0% { opacity: 0; transform: scale(1.4); }
          25% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.8; transform: scale(0.95); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. PREVIEW & SHARE
// ─────────────────────────────────────────────────────────────
function PreviewScreen({ ctx }) {
  const { accent, campaign, go, capturedFilter, flipped } = ctx;
  const [inviteCopied, setInviteCopied] = React.useState(false);

  const handleInvite = async () => {
    const url = window.location.href;
    const shareData = {
      title: `Join me — ${campaign.hashtag}`,
      text:
        `I just added my photo to support the NHS. Take yours and join the campaign — ${campaign.hashtag}`,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch (e) {
      // user dismissed or share failed — fall through to copy
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch (e) {
      // ignore
    }
    setInviteCopied(true);
    setTimeout(() => setInviteCopied(false), 1800);
  };

  return (
    <div
      style={{
        height: "100%",
        background: BG,
        display: "flex",
        flexDirection: "column",
        paddingTop: 54,
      }}
    >
      {/* top bar — subtle retake */}
      <div
        style={{
          padding: "10px 18px 4px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => go("camera")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "transparent",
            border: "none",
            color: "#54565e",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            padding: "6px 8px 6px 0",
            fontFamily: "inherit",
          }}
        >
          <I.ArrowLeft size={16} />
          Retake
        </button>
        <div
          style={{
            marginLeft: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 10,
            color: "#9b9ea6",
            letterSpacing: "0.12em",
            fontFamily: "JetBrains Mono, monospace",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "#34C759",
            }}
          />
          READY TO SHARE
        </div>
      </div>

      {/* photo hero */}
      <div
        style={{
          padding: "10px 22px 14px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "4 / 5",
            position: "relative",
            background: "#0c0d12",
            overflow: "hidden",
            borderRadius: 6,
            boxShadow:
              "0 22px 44px -18px rgba(12,13,18,0.35), 0 4px 10px rgba(12,13,18,0.06)",
          }}
        >
          <PhotoPlaceholder kind="capture" filter={capturedFilter} flipped={flipped} />
          <SelfieFrame />
        </div>
      </div>

      {/* share section */}
      <div
        style={{
          flex: 1,
          padding: "0 22px 16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          className="display"
          style={{
            margin: "0 0 14px",
            fontSize: 18,
            fontWeight: 600,
            color: "#0c0d12",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            textAlign: "center",
          }}
        >
          Almost done.{" "}
          <span style={{ color: "#9b9ea6", fontWeight: 500 }}>
            Now spread it.
          </span>
        </h2>

        {/* share row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <ShareCircle color="#1877F2">
            <I.Facebook size={20} />
          </ShareCircle>
          <ShareCircle color="#E1306C">
            <I.Instagram size={20} />
          </ShareCircle>
          <ShareCircle color="#25D366">
            <I.WhatsAppOutline size={20} />
          </ShareCircle>
          <ShareCircle color="#0c0d12">
            <I.Snapchat size={20} />
          </ShareCircle>
          <ShareCircle color="#fff" bg="#54565e" border="transparent">
            <I.ShareUp size={17} />
          </ShareCircle>
        </div>

        {/* supporter count pill — sits just under the icons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 12,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 14px",
              borderRadius: 999,
              background: "#f0f1f4",
              color: "#1877F2",
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            <I.Users size={15} />
            {campaign.supporters}
          </div>
        </div>

        {/* secondary actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginTop: 14,
            flexWrap: "wrap",
          }}
        >
          <ActionChip
            icon={inviteCopied ? <I.Check size={14} /> : <I.Users size={14} />}
            label={inviteCopied ? "Link copied" : "Invite friends"}
            onClick={handleInvite}
            active={inviteCopied}
          />
          <ActionChip
            icon={<I.Download size={14} />}
            label="Download BEZL"
            onClick={openBezl}
          />
        </div>

        <PoweredByBezl marginTop={"auto"} />
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
// 4. SUCCESS
// ─────────────────────────────────────────────────────────────
const DISCOVER = [
  { title: "Bloom The Block", sub: "Urban gardening", tint: "#5A43FE" },
  { title: "Trail Stewards", sub: "Volunteer hikers", tint: "#E94952" },
  { title: "Letterpress Library", sub: "Literacy drive", tint: "#54E6D4" },
  { title: "Night Run Club", sub: "5K weeknights", tint: "#FFB454" },
];

function SuccessScreen({ ctx }) {
  const { accent, campaign, reset } = ctx;

  // Derive a goal + progress from supporters string.
  const supporterCount = parseInt(
    String(campaign.supporters).replace(/,/g, ""),
    10
  );
  const goal = 50000;
  const progressPct = Math.min((supporterCount / goal) * 100, 100);
  const goalLabel = "50K";

  return (
    <div
      style={{
        height: "100%",
        background: BG,
        display: "flex",
        flexDirection: "column",
        paddingTop: 50,
      }}
    >
      {/* top close */}
      <div
        style={{
          padding: "8px 16px 0",
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          onClick={reset}
          style={{
            ...iconButtonStyle(),
            marginLeft: "auto",
            width: 32,
            height: 32,
          }}
          aria-label="close"
        >
          <I.Close size={16} />
        </button>
      </div>

      {/* hero */}
      <div
        style={{
          padding: "8px 22px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <AnimatedCheck accent={accent} />

        <div
          style={{
            marginTop: 14,
            fontSize: 11,
            fontFamily: "JetBrains Mono, monospace",
            color: accent === "#0c0d12" ? "#54565e" : accent,
            fontWeight: 600,
            letterSpacing: "0.16em",
          }}
        >
          SUPPORTER #{campaign.supporters}
        </div>

        <h1
          className="display"
          style={{
            margin: "8px 0 0",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "#0c0d12",
            maxWidth: 280,
            lineHeight: 1.2,
          }}
        >
          Your support is in
        </h1>
        <p
          style={{
            margin: "8px 14px 0",
            fontSize: 13,
            color: "#54565e",
            lineHeight: 1.5,
            maxWidth: 320,
          }}
        >
          Your post is live — together we're showing up for the people showing
          up for us.
        </p>
      </div>

      {/* progress card */}
      <div style={{ padding: "18px 22px 0" }}>
        <div
          style={{
            background: "#fff",
            border: "1px solid #ececef",
            borderRadius: 16,
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 9.5,
                  letterSpacing: "0.18em",
                  color: "#9b9ea6",
                  fontFamily: "JetBrains Mono, monospace",
                  marginBottom: 4,
                }}
              >
                CAMPAIGN PROGRESS
              </div>
              <div
                className="display"
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#0c0d12",
                  lineHeight: 1,
                }}
              >
                {campaign.supporters}
                <span
                  style={{
                    fontSize: 13,
                    color: "#9b9ea6",
                    fontWeight: 500,
                  }}
                >
                  {" "}/ {goalLabel} goal
                </span>
              </div>
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: accent === "#0c0d12" ? "#0c0d12" : accent,
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {Math.round(progressPct)}%
            </div>
          </div>

          {/* bar */}
          <div
            style={{
              height: 8,
              borderRadius: 999,
              background: "#f0f1f4",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                width: `${progressPct}%`,
                background: `linear-gradient(90deg, ${accent}, ${accent})`,
                borderRadius: 999,
                transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </div>

          {/* recently joined avatars */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 12,
              gap: 10,
            }}
          >
            <div style={{ display: "flex" }}>
              {[
                "#FFB454",
                "#5A43FE",
                "#E94952",
                "#34C759",
                "#54E6D4",
              ].map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    background: c,
                    border: "2px solid #fff",
                    marginLeft: i === 0 ? 0 : -8,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#54565e",
              }}
            >
              <span style={{ color: "#0c0d12", fontWeight: 600 }}>+287</span>{" "}
              joined today
            </div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "16px 22px 20px",
          gap: 8,
        }}
      >
        <PrimaryButton accent={accent} onClick={reset}>
          <I.Users size={18} />
          <span style={{ marginLeft: 9 }}>Invite a friend</span>
        </PrimaryButton>

        <button
          onClick={openBezl}
          style={{
            width: "100%",
            padding: "10px 16px",
            borderRadius: 12,
            border: "none",
            background: "transparent",
            color: "#54565e",
            fontWeight: 500,
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontFamily: "inherit",
          }}
        >
          Download BEZL for more campaigns
          <span style={{ color: "#0c0d12", fontWeight: 700 }}>→</span>
        </button>

        <PoweredByBezl marginTop={2} />
      </div>

      <style>{`
        @keyframes bezlCheckIn {
          0% { transform: scale(0.4); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bezlCheckDraw {
          0% { stroke-dashoffset: 28; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes bezlRing {
          0% { transform: scale(1); opacity: 0.45; }
          80% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Animated check puck — pops in with a ring pulse + drawn checkmark.
function AnimatedCheck({ accent }) {
  return (
    <div
      style={{
        position: "relative",
        width: 72,
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "bezlCheckIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 999,
          border: `2px solid ${accent}`,
          animation: "bezlRing 1.2s ease-out 0.3s",
        }}
      />
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 999,
          background: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 12px 28px -10px ${accent}66`,
        }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12.5l4 4 10-10"
            stroke={accent === "#0c0d12" ? "#fff" : "#0c0d12"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="28"
            style={{
              animation: "bezlCheckDraw 0.45s ease-out 0.25s both",
            }}
          />
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared subcomponents
// ─────────────────────────────────────────────────────────────
function PrimaryButton({ children, onClick, accent = "#54E6D4" }) {
  // Decide foreground based on accent luminance — mint/yellow need dark text.
  const dark = ["#54E6D4", "#FFB454"].includes(accent);
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "16px 16px",
        borderRadius: 16,
        border: "none",
        background: dark ? accent : accent,
        color: dark ? "#0c0d12" : "#fff",
        fontWeight: 600,
        fontSize: 15,
        letterSpacing: "-0.005em",
        cursor: "pointer",
        boxShadow: `0 8px 20px -8px ${accent}88`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.08s ease",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.985)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, compact = false }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: compact ? "12px 14px" : "14px 16px",
        borderRadius: 16,
        border: "1.5px solid #e3e4e8",
        background: "#fff",
        color: "#0c0d12",
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </button>
  );
}

function StatCard({ label, value, icon, accent }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ececef",
        borderRadius: 14,
        padding: "14px 12px",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: `${accent}22`,
          color: "#0c0d12",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 6,
        }}
      >
        {icon}
      </div>
      <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#9b9ea6", textTransform: "uppercase", fontFamily: "JetBrains Mono, monospace" }}>
        {label}
      </div>
      <div
        className="display"
        style={{ fontSize: 22, fontWeight: 600, color: "#0c0d12", marginTop: 2 }}
      >
        {value}
      </div>
    </div>
  );
}

function iconButtonStyle(active = false) {
  return {
    width: 36,
    height: 36,
    borderRadius: 999,
    border: active ? "1px solid #0c0d12" : "1px solid #ececef",
    background: active ? "#0c0d12" : "#fff",
    color: active ? "#fff" : "#0c0d12",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    transition: "all 0.15s",
  };
}

function TrayRow({ icon, label, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 78 }}>
        <span style={{ opacity: 0.85 }}>{icon}</span>
        <span style={{ fontSize: 12, fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ marginLeft: "auto" }}>{children}</div>
    </div>
  );
}

function TraySegment({ value, onChange, options, labels, accent = "#54E6D4" }) {
  return (
    <div
      style={{
        display: "inline-flex",
        background: "rgba(255,255,255,0.1)",
        borderRadius: 999,
        padding: 2,
      }}
    >
      {options.map((opt, i) => {
        const active = value === opt;
        const label = labels ? labels[i] : String(opt);
        return (
          <button
            key={String(opt)}
            onClick={() => onChange(opt)}
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              border: "none",
              background: active ? accent : "transparent",
              color: active ? "#0c0d12" : "rgba(255,255,255,0.7)",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              textTransform: "capitalize",
              transition: "all 0.15s",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
// Tap-to-cycle quick control in the camera top bar (Flash, Timer, Grid).
function QuickToggle({ active, icon, label, accent, onClick, ...rest }) {
  return (
    <button
      onClick={onClick}
      {...rest}
      style={{
        height: 28,
        padding: label ? "0 9px 0 7px" : "0 7px",
        minWidth: 28,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        borderRadius: 999,
        border: "none",
        background: active ? "#0c0d12" : "transparent",
        color: active ? "#fff" : "#54565e",
        fontSize: 11,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "JetBrains Mono, monospace",
        letterSpacing: "0.02em",
        transition: "all 0.15s",
        position: "relative",
      }}
    >
      {icon}
      {label && <span>{label}</span>}
      {active && !label && (
        <span
          style={{
            position: "absolute",
            top: 4,
            right: 5,
            width: 5,
            height: 5,
            borderRadius: 999,
            background: accent,
          }}
        />
      )}
    </button>
  );
}

// Mini live-preview swatch for a filter.
function FilterSwatch({ filter, active, accent, onClick }) {
  const filterCss = {
    none: "none",
    instant: "grayscale(100%) contrast(110%)",
    vintage: "sepia(70%) brightness(108%) saturate(120%)",
    chrome: "saturate(180%) contrast(115%)",
    transfer: "sepia(30%) saturate(150%) hue-rotate(-10deg)",
    process: "saturate(150%) hue-rotate(180deg) contrast(110%)",
  }[filter.id] || "none";

  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        background: "none",
        border: "none",
        cursor: "pointer",
        flexShrink: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          width: 48,
          height: 56,
          borderRadius: 9,
          padding: 2,
          background: active ? accent : "transparent",
          transform: active ? "translateY(-2px)" : "none",
          transition: "transform 0.18s, background 0.18s",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 7,
            overflow: "hidden",
            position: "relative",
            background:
              "radial-gradient(120% 90% at 50% 30%, #e9d6b2 0%, #b39575 40%, #5d5247 100%)",
            filter: filterCss,
            border: active ? "1.5px solid #fff" : "1.5px solid #e7e8ec",
            boxShadow: active ? "0 6px 14px -6px rgba(12,13,18,0.25)" : "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "44%",
              transform: "translate(-50%, -50%)",
              width: "44%",
              aspectRatio: "1 / 1.15",
              borderRadius: "50% 50% 48% 48%",
              background:
                "radial-gradient(60% 60% at 45% 35%, rgba(255,235,210,0.55) 0%, rgba(180,140,100,0.35) 60%, transparent 100%)",
              filter: "blur(0.5px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "-12%",
              transform: "translateX(-50%)",
              width: "100%",
              height: "50%",
              borderRadius: "50% 50% 0 0",
              background:
                "radial-gradient(80% 100% at 50% 0%, rgba(40,40,50,0.55) 0%, rgba(20,20,30,0.85) 60%, rgba(10,10,15,1) 100%)",
            }}
          />
        </div>
      </div>
      <div
        style={{
          fontSize: 10,
          color: active ? "#0c0d12" : "#9b9ea6",
          fontWeight: active ? 600 : 500,
          letterSpacing: "0.01em",
        }}
      >
        {filter.label}
      </div>
    </button>
  );
}

// Photo / Video segmented control with sliding indicator.
function ModeToggle({ mode, onChange }) {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        background: "#f0f1f4",
        borderRadius: 999,
        padding: 3,
        width: 168,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          bottom: 3,
          left: mode === "photo" ? 3 : "50%",
          width: "calc(50% - 3px)",
          borderRadius: 999,
          background: "#0c0d12",
          transition: "left 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
        }}
      />
      {["photo", "video"].map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          style={{
            flex: 1,
            padding: "6px 0",
            borderRadius: 999,
            border: "none",
            background: "transparent",
            color: mode === m ? "#fff" : "#54565e",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            cursor: "pointer",
            textTransform: "uppercase",
            position: "relative",
            zIndex: 1,
            transition: "color 0.18s",
          }}
        >
          {m}
        </button>
      ))}
    </div>
  );
}

// A subtle pill-shaped secondary action (icon + label).
function ActionChip({ icon, label, onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 12px",
        borderRadius: 999,
        background: active ? "#0c0d12" : "#fff",
        border: active ? "1.5px solid #0c0d12" : "1.5px solid #e3e4e8",
        color: active ? "#fff" : "#0c0d12",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "background 0.18s, color 0.18s, border 0.18s, transform 0.12s",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <span
        style={{
          color: active ? "#fff" : "#54565e",
          display: "inline-flex",
          transition: "color 0.18s",
        }}
      >
        {icon}
      </span>
      {label}
    </button>
  );
}

// Outlined share-target circle — white bg, thin gray ring, brand-color icon.
function ShareCircle({ children, color = "#0c0d12", bg = "#fff", border = "#e3e4e8", onClick, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: 44,
        height: 44,
        borderRadius: 999,
        background: bg,
        border: border === "transparent" ? "none" : `1.5px solid ${border}`,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        cursor: "pointer",
        flexShrink: 0,
        transition: "transform 0.12s",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.93)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  );
}

// Subtle "Powered by BEZL" footer used across screens.
function PoweredByBezl({ marginTop = 8, light = false }) {
  return (
    <div
      style={{
        textAlign: "center",
        color: light ? "rgba(255,255,255,0.55)" : "#9b9ea6",
        fontSize: 10,
        letterSpacing: "0.22em",
        fontFamily: "JetBrains Mono, monospace",
        marginTop,
      }}
    >
      POWERED BY{" "}
      <span style={{ color: light ? "#fff" : "#0c0d12", fontWeight: 700 }}>BEZL</span>
    </div>
  );
}

function squareIconStyle() {
  return {
    width: 48,
    height: 48,
    borderRadius: 14,
    border: "1.5px solid #e3e4e8",
    background: "#fff",
    color: "#0c0d12",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
  };
}

Object.assign(window, { EntryScreen, CameraScreen, PreviewScreen, SuccessScreen });
