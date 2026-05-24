// Minimal stroke icons used throughout the prototype.
// All accept a `size` prop and inherit currentColor.

const I = {
  Close: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Menu: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="5" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="19" cy="12" r="1.6" fill="currentColor" />
    </svg>
  ),
  Gallery: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="8.5" cy="10" r="1.4" fill="currentColor" />
      <path d="M3.5 16.5L9 12l4 3 3-2 4.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Flip: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 9a8 8 0 0114-4l2-1M20 15a8 8 0 01-14 4l-2 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 4v4h-4M4 20v-4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Camera: ({ size = 26 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 8h3l1.5-2h7L17 8h3a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  Share: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  Download: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Retake: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 12a8 8 0 1015-3.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 4v5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Heart: ({ size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21s-7-4.5-9.5-9.2C.7 8.2 2.8 4 6.7 4c2 0 3.6 1.1 4.6 2.7l.7 1 .7-1C13.7 5.1 15.3 4 17.3 4c3.9 0 6 4.2 4.2 7.8C19 16.5 12 21 12 21z" />
    </svg>
  ),
  Spark: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l1.8 5.4 5.4 1.8-5.4 1.8L12 16.4l-1.8-5.4-5.4-1.8 5.4-1.8L12 2z" />
    </svg>
  ),
  Wave: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  Users: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 5.5a3 3 0 010 6M18 19c0-2-1-3.5-2.5-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  Check: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Flash: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  FlashOff: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  FlashAuto: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M11 2L3 13h5l-1 9 8-12h-5l1-8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <text x="17" y="11" fontSize="7" fontWeight="700" fill="currentColor" fontFamily="Inter, sans-serif">A</text>
    </svg>
  ),
  Timer: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13" r="7.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 9.5V13l2.5 1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9 2.5h6M12 2.5v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  Grid: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 9.5h16M4 14.5h16M9.5 4v16M14.5 4v16" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  // ─── Share targets ───
  Instagram: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  XSocial: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.5L4.7 21H1.5l7.5-8.6L1.2 3h6.6l4.5 6 5.2-6zm-1.1 16h1.8L7.7 4.9H5.7l10.7 14.1z" />
    </svg>
  ),
  WhatsApp: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 00-8.5 15.2L2 22l5-1.4A10 10 0 1012 2zm5.1 14.3c-.2.6-1.2 1.2-1.7 1.3-.5.1-1 .1-1.7-.1-.4-.1-1-.3-1.6-.6a11.3 11.3 0 01-4.4-3.9c-.3-.5-.9-1.4-.9-2.7s.7-1.9 1-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.7 1.7c.1.2.1.4 0 .5l-.3.4-.3.3c-.1.1-.2.2-.1.5.2.3.7 1.1 1.4 1.8.9.8 1.7 1.1 2 1.2.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.3.1.1.1.6-.1 1.3z"/>
    </svg>
  ),
  Messages: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C6.5 3 2 6.7 2 11.3c0 2.5 1.3 4.7 3.4 6.2-.1 1-.5 2.4-1.4 3.5 1.6-.2 3.4-.8 4.7-1.6 1 .3 2.2.5 3.3.5 5.5 0 10-3.7 10-8.6S17.5 3 12 3z" />
    </svg>
  ),
  Mail: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 7L12 13l8.5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  More: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="18" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  ArrowLeft: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M15 5l-7 7 7 7M8 12h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Facebook: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.6 22v-9h2.8l.5-3.6h-3.3V7.3c0-1 .3-1.7 1.8-1.7H18V2.4a26 26 0 00-2.8-.2c-2.8 0-4.7 1.7-4.7 4.8v2.4H7.5V13h2.9V22h4.1z" />
    </svg>
  ),
  WhatsAppOutline: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3.2a8.8 8.8 0 00-7.5 13.4l-1.3 4.5 4.6-1.2A8.8 8.8 0 1012 3.2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.1c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.3 0 1.4.9 2.7 1.1 2.9.1.2 1.9 3 4.7 4.1 2.4.9 2.8.7 3.4.7.5-.1 1.6-.7 1.8-1.3.3-.7.3-1.2.2-1.3-.1-.1-.3-.2-.6-.4l-1.7-.8c-.3-.1-.5-.1-.6.1l-.8 1c-.2.2-.3.2-.5.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.2-.1.2-.3.3-.5.1-.2 0-.4 0-.5l-.7-1.7z"
        fill="currentColor"
      />
    </svg>
  ),
  Snapchat: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2.5c-3.5 0-5.5 2.6-5.5 5.7 0 1 .2 2 .2 2.4 0 .4-.2.5-.5.6-.4.1-1.2.2-1.6.5-.3.2-.3.5-.1.8.4.6 1.7 1.4 2.7 1.8.3.1.4.4.2.7-.2.5-.7 1.3-1.4 1.8-.6.5-1.4.7-1.8.8-.4.1-.5.4-.3.7.4.7 2 1 2.7 1.1.1 0 .2.1.2.2.1.4.3 1 .7 1.2.4.2 1 0 1.6-.2.6-.2 1.5-.3 2.3 0 .8.3 1.4 1.1 3 1.1s2.2-.8 3-1.1c.8-.3 1.7-.2 2.3 0 .6.2 1.2.4 1.6.2.4-.2.6-.8.7-1.2 0-.1.1-.2.2-.2.7-.1 2.3-.4 2.7-1.1.2-.3.1-.6-.3-.7-.4-.1-1.2-.3-1.8-.8-.7-.5-1.2-1.3-1.4-1.8-.2-.3-.1-.6.2-.7 1-.4 2.3-1.2 2.7-1.8.2-.3.2-.6-.1-.8-.4-.3-1.2-.4-1.6-.5-.3-.1-.5-.2-.5-.6 0-.4.2-1.4.2-2.4 0-3.1-2-5.7-5.5-5.7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  ShareUp: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4l4 4M12 4l-4 4M12 4v12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 13v5a2 2 0 002 2h10a2 2 0 002-2v-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
};

window.I = I;
