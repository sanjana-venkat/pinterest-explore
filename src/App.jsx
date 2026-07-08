import { useCallback, useEffect, useRef, useState } from "react";

/* ============================================================================
   ICONS
   Small inline SVG set in Pinterest's visual language. Each takes { size }.
   ============================================================================ */

const Svg = ({ size = 24, children, viewBox = "0 0 24 24" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {children}
  </svg>
);

const ChevronLeft = (p) => (
  <Svg {...p}>
    <path d="M15 4.5 7.5 12l7.5 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const Plus = (p) => (
  <Svg {...p}>
    <path d="M12 4.5v15M4.5 12h15" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </Svg>
);

const Ellipsis = (p) => (
  <Svg {...p}>
    <circle cx="5" cy="12" r="1.9" fill="currentColor" />
    <circle cx="12" cy="12" r="1.9" fill="currentColor" />
    <circle cx="19" cy="12" r="1.9" fill="currentColor" />
  </Svg>
);

const Close = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </Svg>
);

const PersonAdd = (p) => (
  <Svg {...p}>
    <circle cx="10" cy="8" r="3.6" stroke="currentColor" strokeWidth="2" />
    <path d="M4 19.5c.7-3.2 3.1-5 6-5s5.3 1.8 6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18.5 8.5v5M16 11h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const Share = (p) => (
  <Svg {...p}>
    <circle cx="17.5" cy="5.5" r="2.6" stroke="currentColor" strokeWidth="2" />
    <circle cx="6" cy="12" r="2.6" stroke="currentColor" strokeWidth="2" />
    <circle cx="17.5" cy="18.5" r="2.6" stroke="currentColor" strokeWidth="2" />
    <path d="M8.4 10.7 15 6.8M8.4 13.3l6.6 3.9" stroke="currentColor" strokeWidth="2" />
  </Svg>
);

const Chat = (p) => (
  <Svg {...p}>
    <path
      d="M12 3.5c-4.9 0-8.75 3.4-8.75 7.7 0 2.4 1.2 4.5 3.1 5.9l-.75 3.4 3.6-1.6c.88.25 1.82.4 2.8.4 4.9 0 8.75-3.5 8.75-8S16.9 3.5 12 3.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="8.4" cy="11.2" r="1.15" fill="currentColor" />
    <circle cx="12" cy="11.2" r="1.15" fill="currentColor" />
    <circle cx="15.6" cy="11.2" r="1.15" fill="currentColor" />
  </Svg>
);

const SortArrows = (p) => (
  <Svg {...p}>
    <path d="M8 5v13M8 5 4.8 8.4M8 5l3.2 3.4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 19V6M16 19l-3.2-3.4M16 19l3.2-3.4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const Sliders = (p) => (
  <Svg {...p}>
    <path d="M3.5 8h17M3.5 16h17" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    <circle cx="15" cy="8" r="2.6" fill="#fff" stroke="currentColor" strokeWidth="2.1" />
    <circle cx="9" cy="16" r="2.6" fill="#fff" stroke="currentColor" strokeWidth="2.1" />
  </Svg>
);

const Globe = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.9" />
    <path d="M3.6 12h16.8M12 3.6c2.5 2.3 3.7 5.1 3.7 8.4s-1.2 6.1-3.7 8.4c-2.5-2.3-3.7-5.1-3.7-8.4s1.2-6.1 3.7-8.4Z" stroke="currentColor" strokeWidth="1.9" />
  </Svg>
);

const ArrowRight = (p) => (
  <Svg {...p}>
    <path d="M4.5 12h15M13.5 6l6 6-6 6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ArrowUpRight = (p) => (
  <Svg {...p}>
    <path d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SavePin = (p) => (
  <Svg {...p}>
    <path
      d="M12 2.8c-3.8 0-6.6 2.8-6.6 6.2 0 2.6 1.5 4.6 3.7 5.5-.05.5-.3 1.7-.9 3.4-.1.3 0 .5.3.4 2-1 3.1-2.6 3.5-3.5h.2c3.6-.1 6.4-2.7 6.4-5.8 0-3.4-2.8-6.2-6.6-6.2Z"
      fill="currentColor"
      transform="rotate(38 12 12)"
    />
  </Svg>
);

const Tag = (p) => (
  <Svg {...p}>
    <path
      d="M13.2 3.5H19a1.5 1.5 0 0 1 1.5 1.5v5.8a2 2 0 0 1-.59 1.42l-8 8a2 2 0 0 1-2.82 0l-4.3-4.3a2 2 0 0 1 0-2.82l8-8a2 2 0 0 1 1.41-.6Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="16.4" cy="7.6" r="1.4" fill="currentColor" />
  </Svg>
);

const Sparkle = (p) => (
  <Svg {...p}>
    <path d="M13.5 3.5 15 8.6l5.1 1.5-5.1 1.5-1.5 5.1-1.5-5.1-5.1-1.5L13.5 8.6l1.5-5.1Z" fill="currentColor" transform="translate(-1.5 1)" />
    <path d="M18.7 14.4l.8 2.4 2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8.8-2.4Z" fill="currentColor" />
  </Svg>
);

const Organize = (p) => (
  <Svg {...p}>
    <path
      d="M9.5 20.5c-1.9-.5-3.4-2-4-4l-1.6-5c-.2-.7.2-1.4.9-1.6.7-.2 1.4.2 1.6.9l.8 2.4.2-8.2c0-.7.6-1.3 1.3-1.3s1.3.6 1.3 1.3l.1 5 .3-5.8c0-.7.6-1.3 1.3-1.2.7 0 1.3.6 1.2 1.3l-.2 5.9 1-4.6c.2-.7.8-1.2 1.5-1 .7.1 1.2.8 1 1.5l-1 5.2 1.3-2.2c.4-.6 1.2-.8 1.8-.4.6.4.8 1.1.5 1.8l-2.4 5.5c-1.1 2.5-3.9 4-6.9 3.5Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path d="M17.5 2.6l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5Z" fill="currentColor" />
  </Svg>
);

const NavHome = ({ active, ...p }) => (
  <Svg {...p}>
    <path
      d="M12 3.2 3.8 9.9c-.5.4-.8 1-.8 1.7v7c0 1.2 1 2.2 2.2 2.2h13.6c1.2 0 2.2-1 2.2-2.2v-7c0-.7-.3-1.3-.8-1.7L12 3.2Z"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={active ? 0 : 2.1}
      strokeLinejoin="round"
    />
    {active && <path d="M8.2 15.4c.9 1.2 2.2 1.9 3.8 1.9s2.9-.7 3.8-1.9" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" />}
  </Svg>
);

const NavSearch = (p) => (
  <Svg {...p}>
    <circle cx="10.8" cy="10.8" r="6.4" stroke="currentColor" strokeWidth="2.3" />
    <path d="m15.6 15.6 4.9 4.9" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
  </Svg>
);

const NavPerson = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8.2" r="4" stroke="currentColor" strokeWidth="2.2" />
    <path d="M4.6 20.4c1-3.6 3.9-5.6 7.4-5.6s6.4 2 7.4 5.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </Svg>
);

const PinterestHomeGlyph = (p) => (
  <Svg {...p} viewBox="0 0 48 48">
    <path d="M24 6C13.5 6 6 13.3 6 22.4c0 6 3.1 11 8.2 13.9V42h19.6v-5.7C38.9 33.4 42 28.4 42 22.4 42 13.3 34.5 6 24 6Z" fill="#e60023" />
    <path d="M17 27.5c1.8 2.3 4.2 3.6 7 3.6s5.2-1.3 7-3.6" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
  </Svg>
);

const PinterestLogo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#e60023" />
    <path
      d="M12.2 5.2c-3.8 0-5.9 2.5-5.9 5.2 0 1.3.7 2.9 1.8 3.4.3.1.4 0 .5-.2l.4-1.4c0-.1 0-.3-.1-.4-.4-.5-.7-1.3-.7-2.1 0-2 1.6-4 4.2-4 2.3 0 3.9 1.5 3.9 3.7 0 2.5-1.3 4.2-3 4.2-.9 0-1.6-.7-1.4-1.7.3-1.1.8-2.3.8-3.1 0-.7-.4-1.3-1.2-1.3-1 0-1.7 1-1.7 2.3 0 .8.3 1.4.3 1.4l-1.1 4.7c-.3 1.4 0 3.4.1 3.6 0 .1.2.2.3 0 .1-.2 1.5-2.2 1.9-3.7l.5-2c.3.6 1.2 1.1 2.1 1.1 2.8 0 4.9-2.6 4.9-6 0-3.1-2.7-5.7-6.6-5.7Z"
      fill="#fff"
    />
  </svg>
);

/* ============================================================================
   DATA
   All prototype content. Screens read from these consts only, so swapping
   images / copy / boards never requires touching a component.
   ============================================================================ */

const img = (name) => `/${name}.jpg`;

const stories = [
  { id: "home", label: "Home", type: "home" },
  { id: "test", label: "test", image: img("clean_10") },
  { id: "abi", label: "abi", image: img("clean_14") },
  { id: "homeee", label: "homeee", image: img("clean_05") },
  { id: "mehendi", label: "mehendi", image: img("clean_07") },
];

const landingTabs = ["Home", "test", "abi", "homeee", "mehendi", "blouse"];

const homePins = [
  { id: "h1", image: img("clean_04"), h: 1.32 },
  { id: "h2", image: img("clean_03"), h: 1.28 },
  { id: "h3", image: img("clean_10"), h: 1.3 },
  { id: "h4", image: img("clean_07"), h: 1.45 },
  { id: "h5", image: img("clean_12"), h: 1.1 },
  { id: "h6", image: img("clean_02"), h: 0.86 },
  { id: "h7", image: img("clean_08"), h: 1.25 },
  { id: "h8", image: img("clean_16"), h: 1.4 },
  { id: "h9", image: img("clean_06"), h: 1.05 },
  { id: "h10", image: img("clean_01"), h: 1.3 },
];

const homeeeBoard = {
  id: "homeee",
  title: "homeee",
  pinCount: 9,
  collaborators: [
    { initial: "S", tint: "#d9defc" },
    { initial: "A", tint: "#ffd9c4" },
  ],
  pins: [
    { id: "b1", image: img("clean_01"), title: "Decor", h: 1.42, tags: ["Gallery wall", "Warm lighting", "Carved wood"] },
    { id: "b2", image: img("clean_02"), title: "Shahi-Mehfil: Decorative pichwai panels", h: 0.92, tags: ["Pichwai art", "Tan leather", "Arched panels"] },
    { id: "b3", image: img("clean_05"), title: "DesiDIY: Temple mural wall", h: 1.38, tags: ["Line mural", "Colorful cushions", "Indoor plants"] },
    { id: "b4", image: img("clean_06"), title: "Rattan pendant glow", h: 1.02, tags: ["Pendant lights", "Cove lighting", "Neutral sofa"] },
    { id: "b5", image: img("clean_09"), title: "Arched alcove seating", h: 1.3, tags: ["Arched alcove", "Colorful cushions", "Pendant lights", "Hand-painted"] },
    { id: "b6", image: img("clean_08"), title: "Jewel-tone lounge", h: 1.06, tags: ["Moroccan rug", "Floor poufs", "Brass lanterns"] },
    { id: "b7", image: img("clean_13"), title: "Sunset daybed nook", h: 1.02, tags: ["Arched niche", "Block print", "Lantern light"] },
    { id: "b8", image: img("clean_16"), title: "Flower niche shelves", h: 1.36, tags: ["Painted arch", "Planter shelf", "Folk florals"] },
    { id: "b9", image: img("clean_07"), title: "Painted floral mirror", h: 1.28, tags: ["Folk florals", "Marigolds", "Aged plaster"] },
  ],
};

const yourSaves = homeeeBoard.pins.slice(0, 5);

const moreIdeas = [
  { id: "m1", image: img("clean_14"), h: 1.34, sponsored: { brand: "Amazon", title: "Shop our creators' picks", cta: "Shop now" } },
  { id: "m2", image: img("clean_11"), h: 1.52, sponsored: { brand: "Target", title: "Fall Desk Decor", cta: "Learn more" } },
  { id: "m3", image: img("clean_15"), h: 1.18, deal: "Deal", brandOverlay: "LU AND GEORGIA" },
  { id: "m4", image: img("clean_09"), h: 1.3, tags: ["Arched alcove", "Colorful cushions"] },
  { id: "m5", image: img("clean_12"), h: 1.08 },
  { id: "m6", image: img("clean_13"), h: 1.02 },
  { id: "m7", image: img("clean_16"), h: 1.38 },
  { id: "m8", image: img("clean_02"), h: 0.9 },
];

const shopItems = [
  { id: "s1", image: img("clean_11"), title: "Rust velvet accent chair", brand: "Target", price: "$249", h: 1.3 },
  { id: "s2", image: img("clean_14"), title: "Reclaimed oak coffee table", brand: "Artisan Blooms", price: "$189", h: 1.24 },
  { id: "s3", image: img("clean_06"), title: "Rattan drum pendant", brand: "West Elm", price: "$79", h: 1.02 },
  { id: "s4", image: img("clean_16"), title: "Hand-painted planter set", brand: "Etsy", price: "$45", h: 1.36 },
  { id: "s5", image: img("clean_08"), title: "Heirloom Moroccan rug", brand: "Revival", price: "$320", h: 1.1 },
  { id: "s6", image: img("clean_13"), title: "Block-print cushion covers", brand: "Fabindia", price: "$28", h: 1.0 },
];

const relatedPool = [
  { id: "r1", image: img("clean_09"), h: 1.3 },
  { id: "r2", image: img("clean_13"), h: 1.04 },
  { id: "r3", image: img("clean_12"), h: 1.1 },
  { id: "r4", image: img("clean_16"), h: 1.38 },
  { id: "r5", image: img("clean_02"), h: 0.9 },
  { id: "r6", image: img("clean_08"), h: 1.12 },
  { id: "r7", image: img("clean_05"), h: 1.4 },
  { id: "r8", image: img("clean_01"), h: 1.34 },
];

function relatedFor(pin) {
  return relatedPool.filter((r) => r.image !== pin.image).slice(0, 6);
}

// Staged for the "contextual board actions" enhancement (build itinerary /
// find hotels / plan outfits) — not wired into a screen yet.
const hawaiiBoard = {
  id: "hawaii",
  title: "hawaii",
  pinCount: 9,
  collaborators: [{ initial: "S", tint: "#d9defc" }],
  pins: [
    { id: "hw1", image: img("real_01"), title: "Oahu palms", h: 1.36, tags: ["Palms", "Golden hour"] },
    { id: "hw2", image: img("real_02"), title: "Nā Pali coast", h: 1.02, tags: ["Coastline", "Hiking"] },
    { id: "hw3", image: img("real_03"), title: "Akaka Falls", h: 1.4, tags: ["Waterfall", "Rainforest"] },
    { id: "hw4", image: img("hawaii_01"), title: "Lanikai morning", h: 1.1, tags: ["Beach", "Kayak"] },
    { id: "hw5", image: img("hawaii_02"), title: "Road to Hana", h: 1.28, tags: ["Road trip"] },
    { id: "hw6", image: img("hawaii_03"), title: "Maui sunset", h: 1.0, tags: ["Sunset"] },
    { id: "hw7", image: img("hawaii_04"), title: "Black sand beach", h: 1.32, tags: ["Beach"] },
    { id: "hw8", image: img("hawaii_05"), title: "Poke crawl", h: 1.06, tags: ["Food"] },
    { id: "hw9", image: img("hawaii_06"), title: "Surf check", h: 1.24, tags: ["Surf"] },
  ],
};

/* ============================================================================
   SHARED PHONE COMPONENTS
   ============================================================================ */

function StatusBar({ light = false }) {
  return (
    <div className={`status-bar ${light ? "light" : ""}`}>
      <span className="status-time">11:31</span>
      <div className="status-right">
        <svg width="15" height="12" viewBox="0 0 15 12" fill="currentColor" aria-hidden="true">
          <path d="M7.5 2.4c2.3 0 4.4.9 6 2.3l1.3-1.4A10.9 10.9 0 0 0 7.5 0C4.6 0 2 1.2.2 3.3l1.3 1.4c1.6-1.4 3.7-2.3 6-2.3Z" opacity=".95" />
          <path d="M7.5 6.2c1.3 0 2.5.5 3.4 1.3l1.3-1.4a7 7 0 0 0-9.4 0l1.3 1.4c.9-.8 2.1-1.3 3.4-1.3Z" opacity=".95" />
          <circle cx="7.5" cy="10" r="1.7" />
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" aria-hidden="true">
          <rect x="0" y="8" width="3" height="4" rx=".8" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx=".8" />
          <rect x="9" y="3" width="3" height="9" rx=".8" />
          <rect x="13.5" y=".5" width="3" height="11.5" rx=".8" opacity=".35" />
        </svg>
        <span className="battery">
          <span className="battery-fill" />
          <span className="battery-num">70</span>
        </span>
      </div>
    </div>
  );
}

// Two-column masonry. Pins are dealt into columns by running height so the
// order matches the left-right reading order of the real feed.
function Masonry({ pins, renderPin, gap = 12 }) {
  const cols = [[], []];
  const heights = [0, 0];
  pins.forEach((pin) => {
    const c = heights[0] <= heights[1] ? 0 : 1;
    cols[c].push(pin);
    heights[c] += pin.h ?? 1.2;
  });
  return (
    <div className="masonry" style={{ gap }}>
      {cols.map((col, i) => (
        <div className="masonry-col" key={i} style={{ gap }}>
          {col.map((pin) => renderPin(pin))}
        </div>
      ))}
    </div>
  );
}

function FeedPin({ pin, onOpen }) {
  return (
    <div className="feed-pin">
      <button className="pin-img-btn" onClick={() => onOpen(pin)} aria-label="Open pin">
        <img src={pin.image} alt="" style={{ aspectRatio: `1 / ${pin.h}` }} loading="lazy" />
      </button>
      <div className="pin-meta-row">
        <Ellipsis size={18} />
      </div>
    </div>
  );
}

function BoardPin({ pin, onOpen }) {
  return (
    <div className="feed-pin">
      <button className="pin-img-btn" onClick={() => onOpen(pin)} aria-label={pin.title}>
        <img src={pin.image} alt="" style={{ aspectRatio: `1 / ${pin.h}` }} loading="lazy" />
      </button>
      <div className="board-pin-row">
        <span className="board-pin-title">{pin.title}</span>
        <Svg size={19}>
          <path d="m12 3.6 2.5 5.4 5.9.6-4.4 4 1.2 5.8L12 16.5l-5.2 2.9L8 13.6l-4.4-4 5.9-.6L12 3.6Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        </Svg>
      </div>
    </div>
  );
}

function IdeaPin({ pin, onOpen }) {
  const sp = pin.sponsored;
  return (
    <div className="feed-pin">
      <div className="idea-card">
        <button className="pin-img-btn idea-img" onClick={() => onOpen(pin)} aria-label={sp ? sp.title : "Open pin"}>
          <img src={pin.image} alt="" style={{ aspectRatio: `1 / ${pin.h}` }} loading="lazy" />
          {pin.deal && <span className="deal-chip">{pin.deal}</span>}
          {pin.brandOverlay && <span className="brand-overlay">{pin.brandOverlay}</span>}
          <span className="save-fab">
            <SavePin size={18} />
          </span>
        </button>
        {sp && (
          <div className="idea-cta">
            <span>{sp.cta}</span>
            <ArrowUpRight size={18} />
          </div>
        )}
      </div>
      {sp && (
        <div className="idea-caption">
          <div className="idea-brand-row">
            <span className="idea-brand">{sp.brand}</span>
            <Ellipsis size={16} />
          </div>
          <span className="idea-title">{sp.title}</span>
          <span className="idea-sponsored">Sponsored</span>
        </div>
      )}
      {!sp && (
        <div className="pin-meta-row">
          <Ellipsis size={18} />
        </div>
      )}
    </div>
  );
}

function BottomNav({ active = "home", onHome }) {
  return (
    <nav className="bottom-nav">
      <button className="nav-btn" onClick={onHome} aria-label="Home">
        <NavHome size={26} active={active === "home"} />
      </button>
      <button className="nav-btn" aria-label="Search">
        <NavSearch size={25} />
      </button>
      <button className="nav-btn" aria-label="Profile">
        <NavPerson size={25} />
      </button>
    </nav>
  );
}

/* ============================================================================
   SCREEN: Home feed
   ============================================================================ */

function Story({ story, active, onTap }) {
  return (
    <button className="story" onClick={() => onTap(story)}>
      <span className={`story-tile ${story.type === "home" ? "story-home" : ""}`}>
        {story.type === "home" ? <PinterestHomeGlyph size={44} /> : <img src={story.image} alt="" />}
      </span>
      <span className={`story-label ${active ? "active" : ""}`}>{story.label}</span>
    </button>
  );
}

function HomeFeed({ onOpenBoard, onOpenPin }) {
  return (
    <div className="screen">
      <StatusBar />
      <header className="home-header">
        <div className="home-logo">
          <PinterestLogo size={30} />
          <span className="wordmark">Pinterest</span>
        </div>
        <div className="home-header-actions">
          <button className="icon-btn" aria-label="Create">
            <Plus size={24} />
          </button>
          <button className="icon-btn badge-dot" aria-label="Messages">
            <Chat size={26} />
          </button>
        </div>
      </header>

      <div className="scroll-area with-nav">
        <div className="stories-row">
          {stories.map((s) => (
            <Story key={s.id} story={s} active={s.id === "home"} onTap={onOpenBoard} />
          ))}
        </div>

        <div className="feed-wrap">
          <Masonry pins={homePins} renderPin={(pin) => <FeedPin key={pin.id} pin={pin} onOpen={onOpenPin} />} />
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}

/* ============================================================================
   SCREEN: Board landing
   ============================================================================ */

function BoardLanding({ onHome, onOpenSaves, onOpenPin }) {
  return (
    <div className="screen">
      <StatusBar />
      <div className="scroll-area with-nav">
        <div className="landing-tabs">
          {landingTabs.map((t) => (
            <button key={t} className={`landing-tab ${t === "homeee" ? "active" : ""}`} onClick={t === "Home" ? onHome : undefined}>
              {t}
            </button>
          ))}
        </div>

        <div className="landing-head">
          <h1 className="landing-title">{homeeeBoard.title}</h1>
          <span className="landing-count">{homeeeBoard.pinCount} Pins</span>
        </div>

        <div className="saves-header">
          <h2>Your saves</h2>
          <button className="saves-arrow" onClick={onOpenSaves} aria-label="Open all saves">
            <ArrowRight size={22} />
          </button>
        </div>

        <div className="saves-carousel">
          {yourSaves.map((pin) => (
            <button key={pin.id} className="saves-thumb" onClick={onOpenSaves} aria-label={pin.title}>
              <img src={pin.image} alt="" />
            </button>
          ))}
        </div>

        <h2 className="ideas-header">More ideas for this board</h2>
        <div className="feed-wrap">
          <Masonry pins={moreIdeas} renderPin={(pin) => <IdeaPin key={pin.id} pin={pin} onOpen={onOpenPin} />} />
        </div>
      </div>

      <BottomNav active="home" onHome={onHome} />
    </div>
  );
}

/* ============================================================================
   SCREEN: Board view (All saves / More ideas / Shop tabs)
   ============================================================================ */

function ShopCard({ item, onOpen }) {
  return (
    <div className="feed-pin">
      <button className="pin-img-btn" onClick={() => onOpen(item)} aria-label={item.title}>
        <img src={item.image} alt="" style={{ aspectRatio: `1 / ${item.h}` }} loading="lazy" />
        <span className="save-fab">
          <SavePin size={18} />
        </span>
      </button>
      <div className="shop-caption">
        <span className="shop-price">{item.price}</span>
        <span className="shop-title">{item.title}</span>
        <span className="shop-brand">{item.brand}</span>
      </div>
    </div>
  );
}

const BOARD_TABS = ["More ideas", "All saves", "Shop"];

function BoardView({ onBack, onOpenPin }) {
  const [tab, setTab] = useState("All saves");
  const board = homeeeBoard;

  return (
    <div className="screen">
      <StatusBar />
      <header className="board-header">
        <div className="board-header-left">
          <button className="icon-btn" onClick={onBack} aria-label="Back">
            <ChevronLeft size={24} />
          </button>
          <span className="board-header-name">{board.title}</span>
        </div>
        <div className="home-header-actions">
          <button className="icon-btn" aria-label="Invite collaborators">
            <PersonAdd size={24} />
          </button>
          <button className="icon-btn" aria-label="Share board">
            <Share size={22} />
          </button>
          <button className="icon-btn" aria-label="Board options">
            <Ellipsis size={22} />
          </button>
        </div>
      </header>

      <div className="scroll-area with-actionbar">
        <h1 className="board-title">{board.title}</h1>

        <div className="board-meta">
          <span className="public-pill">
            <Globe size={17} />
            Public board
          </span>
          <span className="meta-dot">·</span>
          <span className="meta-count">{board.pinCount} Pins</span>
        </div>

        <div className="collab-row">
          {board.collaborators.map((c) => (
            <span key={c.initial} className="collab-avatar" style={{ background: c.tint }}>
              {c.initial}
            </span>
          ))}
          <span className="collab-avatar collab-add">
            <PersonAdd size={19} />
          </span>
        </div>

        <div className="board-tabs">
          {BOARD_TABS.map((t) => (
            <button key={t} className={`board-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {tab === "All saves" && (
          <>
            <div className="sort-row">
              <button className="sort-left">
                <SortArrows size={20} />
                <span>Custom order</span>
              </button>
              <button className="icon-btn" aria-label="Filters">
                <Sliders size={22} />
              </button>
            </div>
            <div className="feed-wrap">
              <Masonry pins={board.pins} renderPin={(pin) => <BoardPin key={pin.id} pin={pin} onOpen={onOpenPin} />} />
            </div>
          </>
        )}

        {tab === "More ideas" && (
          <div className="feed-wrap tab-pad">
            <Masonry pins={moreIdeas} renderPin={(pin) => <IdeaPin key={pin.id} pin={pin} onOpen={onOpenPin} />} />
          </div>
        )}

        {tab === "Shop" && (
          <div className="feed-wrap tab-pad">
            <Masonry pins={shopItems} renderPin={(item) => <ShopCard key={item.id} item={item} onOpen={onOpenPin} />} />
          </div>
        )}
      </div>

      <div className="action-bar">
        <button className="action-item">
          <Organize size={24} />
          <span>Organize</span>
        </button>
        <button className="action-item">
          <Plus size={24} />
          <span>Add</span>
        </button>
        <button className="action-item">
          <Sparkle size={24} />
          <span>More ideas</span>
        </button>
        <button className="action-item">
          <Tag size={24} />
          <span>Shop</span>
        </button>
      </div>
    </div>
  );
}

/* ============================================================================
   SCREEN: Pin closeup + visual search
   ============================================================================ */

function PinCloseup({ pin, onClose, onOpenPin }) {
  const chips = pin.tags?.length ? pin.tags : ["Warm interiors", "Handmade decor", "Cozy corners"];
  const related = relatedFor(pin);

  return (
    <div className="screen closeup">
      <div className="scroll-area closeup-scroll">
        <div className="closeup-hero">
          <img src={pin.image} alt={pin.title || ""} />
          <button className="overlay-btn overlay-left" onClick={onClose} aria-label="Close">
            <Close size={22} />
          </button>
          <button className="overlay-btn overlay-right" aria-label="Pin options">
            <Ellipsis size={22} />
          </button>
          <div className="chips-row">
            {chips.map((c) => (
              <button key={c} className="vs-chip">
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="related-sheet">
          <span className="sheet-handle" />
          <Masonry
            pins={related}
            renderPin={(r) => (
              <div className="feed-pin" key={r.id}>
                <button className="pin-img-btn" onClick={() => onOpenPin(r)} aria-label="Open related pin">
                  <img src={r.image} alt="" style={{ aspectRatio: `1 / ${r.h}` }} loading="lazy" />
                  <span className="save-fab">
                    <SavePin size={18} />
                  </span>
                </button>
                <div className="pin-meta-row">
                  <Ellipsis size={18} />
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   PHONE SHELL — routes between the four screens above
   ============================================================================ */

function Phone({ screen, onNavigate }) {
  const [pin, setPin] = useState(null);
  const [returnTo, setReturnTo] = useState("home");

  const openPin = useCallback(
    (from) => (p) => {
      setPin(p);
      setReturnTo(from);
      onNavigate("pin");
    },
    [onNavigate]
  );

  useEffect(() => {
    if (screen === "pin" && !pin) {
      setPin({
        image: "/clean_09.jpg",
        title: "Arched alcove seating",
        tags: ["Arched alcove", "Colorful cushions", "Pendant lights", "Hand-painted"],
      });
      setReturnTo("board");
    }
  }, [screen, pin]);

  return (
    <div className="phone">
      <div className="phone-screen">
        {screen === "home" && (
          <HomeFeed
            onOpenBoard={(story) => {
              if (story.id === "homeee") onNavigate("landing");
            }}
            onOpenPin={openPin("home")}
          />
        )}
        {screen === "landing" && <BoardLanding onHome={() => onNavigate("home")} onOpenSaves={() => onNavigate("board")} onOpenPin={openPin("landing")} />}
        {screen === "board" && <BoardView onBack={() => onNavigate("landing")} onOpenPin={openPin("board")} />}
        {screen === "pin" && pin && <PinCloseup pin={pin} onClose={() => onNavigate(returnTo)} onOpenPin={(p) => setPin({ ...p, tags: p.tags })} />}
      </div>
    </div>
  );
}

/* ============================================================================
   PRESENTATION DECK
   Editable slide panel on the left. Each slide can link to a phone screen so
   advancing the deck drives the prototype during a walkthrough.
   ============================================================================ */

const DECK_STORAGE_KEY = "pinterest-walkthrough-deck-v1";

const SCREEN_OPTIONS = [
  { value: "", label: "No screen change" },
  { value: "home", label: "Home feed" },
  { value: "landing", label: "Board landing" },
  { value: "board", label: "Board · All saves" },
  { value: "pin", label: "Pin closeup" },
];

const seedSlides = [
  {
    id: "s1",
    kicker: "01 · Baseline",
    title: "Replicating today's Pinterest",
    body: "A faithful rebuild of the current mobile experience: home feed with board stories, board landing, All saves, and pin closeup with visual search. This is the control I measure my changes against.",
    screen: "home",
  },
  {
    id: "s2",
    kicker: "02 · Boards as hubs",
    title: "The board landing page",
    body: "Tapping a board story opens a hub, not a grid: your saves up top, then fresh ideas and shoppable content for that board. Add your observations about why this framing matters here.",
    screen: "landing",
  },
  {
    id: "s3",
    kicker: "03 · Organization",
    title: "All saves, made actionable",
    body: "The full board view with organize, add, more ideas, and shop actions. This is where contextual board actions will live, like build itinerary, find hotels, and plan outfits for a travel board.",
    screen: "board",
  },
  {
    id: "s4",
    kicker: "04 · Discovery",
    title: "Visual search on every pin",
    body: "The closeup pairs the pin with attribute chips and visually similar results, turning inspiration into a query. Note your enhancement ideas for actionability here.",
    screen: "pin",
  },
  {
    id: "s5",
    kicker: "05 · Proposal",
    title: "What I would change",
    body: "Placeholder for enhancements: a Shop tab in the home feed, board icons that reflect the stage of a project, and contextual actions that move Pinners from saving to doing.",
    screen: "",
  },
];

function loadSlides() {
  try {
    const raw = localStorage.getItem(DECK_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {
    /* fall through to seeds */
  }
  return seedSlides;
}

function Editable({ as: Tag = "div", className, value, onChange, placeholder }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
  }, [value]);

  return (
    <Tag
      ref={ref}
      className={className}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      data-placeholder={placeholder}
      onInput={(e) => onChange(e.currentTarget.innerText)}
      onBlur={(e) => onChange(e.currentTarget.innerText.trim())}
    />
  );
}

function Deck({ onScreenChange }) {
  const [slides, setSlides] = useState(loadSlides);
  const [index, setIndex] = useState(0);

  const slide = slides[index];

  useEffect(() => {
    localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(slides));
  }, [slides]);

  const goTo = (i) => {
    const next = Math.max(0, Math.min(slides.length - 1, i));
    setIndex(next);
    const target = slides[next]?.screen;
    if (target) onScreenChange(target);
  };

  const patch = (partial) => setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, ...partial } : s)));

  const addSlide = () => {
    const fresh = { id: `s${Date.now()}`, kicker: `0${slides.length + 1} · Note`, title: "New slide", body: "Click to write your design rationale.", screen: "" };
    setSlides((prev) => [...prev.slice(0, index + 1), fresh, ...prev.slice(index + 1)]);
    setIndex(index + 1);
  };

  const deleteSlide = () => {
    if (slides.length <= 1) return;
    setSlides((prev) => prev.filter((_, i) => i !== index));
    setIndex((i) => Math.max(0, i - 1));
  };

  const resetDeck = () => {
    localStorage.removeItem(DECK_STORAGE_KEY);
    setSlides(seedSlides);
    setIndex(0);
    onScreenChange("home");
  };

  useEffect(() => {
    const onKey = (e) => {
      if (document.activeElement?.isContentEditable) return;
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <section className="deck">
      <header className="deck-top">
        <span className="deck-eyebrow">Design walkthrough</span>
        <h1 className="deck-heading">Pinterest, replicated &amp; rethought</h1>
      </header>

      <article className="slide-card" key={slide.id}>
        <Editable className="slide-kicker" value={slide.kicker} onChange={(v) => patch({ kicker: v })} placeholder="Kicker" />
        <Editable as="h2" className="slide-title" value={slide.title} onChange={(v) => patch({ title: v })} placeholder="Slide title" />
        <Editable className="slide-body" value={slide.body} onChange={(v) => patch({ body: v })} placeholder="Write your design rationale…" />

        <div className="slide-link-row">
          <label className="slide-link-label" htmlFor="screen-link">
            Phone shows
          </label>
          <select
            id="screen-link"
            className="slide-link-select"
            value={slide.screen}
            onChange={(e) => {
              patch({ screen: e.target.value });
              if (e.target.value) onScreenChange(e.target.value);
            }}
          >
            {SCREEN_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </article>

      <div className="deck-dots">
        {slides.map((s, i) => (
          <button key={s.id} className={`dot ${i === index ? "active" : ""}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>

      <div className="deck-controls">
        <div className="deck-nav">
          <button className="deck-btn" onClick={() => goTo(index - 1)} disabled={index === 0}>
            Back
          </button>
          <button className="deck-btn primary" onClick={() => goTo(index + 1)} disabled={index === slides.length - 1}>
            Next
          </button>
        </div>
        <div className="deck-manage">
          <button className="deck-btn ghost" onClick={addSlide}>
            Add slide
          </button>
          <button className="deck-btn ghost" onClick={deleteSlide} disabled={slides.length <= 1}>
            Delete
          </button>
          <button className="deck-btn ghost" onClick={resetDeck}>
            Reset
          </button>
        </div>
      </div>

      <p className="deck-hint">Click any text to edit. Slides autosave in this browser. Arrow keys move between slides.</p>
    </section>
  );
}

/* ============================================================================
   APP SHELL
   ============================================================================ */

export default function App() {
  const [screen, setScreen] = useState("home");

  return (
    <main className="stage">
      <Deck onScreenChange={setScreen} />
      <div className="phone-column">
        <Phone screen={screen} onNavigate={setScreen} />
      </div>
    </main>
  );
}
