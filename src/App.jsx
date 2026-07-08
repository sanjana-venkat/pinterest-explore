import { useCallback, useEffect, useRef, useState } from "react";

/* ============================================================================
   ICONS
   Sourced from lucide (ISC license) and the official Pinterest brand mark
   (simple-icons, CC0), redrawn as plain inline SVG so there's no dependency.
   ============================================================================ */

const Svg = ({ size = 24, children, viewBox = "0 0 24 24", stroke = "currentColor", fill = "none" }) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill={fill}
    stroke={stroke}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const ChevronLeft = (p) => (
  <Svg {...p}>
    <path d="M15 4.5 7.5 12l7.5 7.5" />
  </Svg>
);

const Plus = (p) => (
  <Svg {...p}>
    <path d="M5 12h14M12 5v14" />
  </Svg>
);

const Ellipsis = (p) => (
  <Svg {...p} stroke="none" fill="currentColor">
    <circle cx="5" cy="12" r="1.9" />
    <circle cx="12" cy="12" r="1.9" />
    <circle cx="19" cy="12" r="1.9" />
  </Svg>
);

const Close = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

const PersonAdd = (p) => (
  <Svg {...p}>
    <circle cx="10" cy="8" r="3.6" />
    <path d="M4 19.5c.7-3.2 3.1-5 6-5s5.3 1.8 6 5" />
    <path d="M18.5 8.5v5M16 11h5" />
  </Svg>
);

const Share = (p) => (
  <Svg {...p}>
    <circle cx="17.5" cy="5.5" r="2.6" />
    <circle cx="6" cy="12" r="2.6" />
    <circle cx="17.5" cy="18.5" r="2.6" />
    <path d="M8.4 10.7 15 6.8M8.4 13.3l6.6 3.9" />
  </Svg>
);

const Chat = (p) => (
  <Svg {...p}>
    <path d="M12 3.5c-4.9 0-8.75 3.4-8.75 7.7 0 2.4 1.2 4.5 3.1 5.9l-.75 3.4 3.6-1.6c.88.25 1.82.4 2.8.4 4.9 0 8.75-3.5 8.75-8S16.9 3.5 12 3.5Z" strokeLinejoin="round" />
    <circle cx="8.4" cy="11.2" r="1.05" fill="currentColor" stroke="none" />
    <circle cx="12" cy="11.2" r="1.05" fill="currentColor" stroke="none" />
    <circle cx="15.6" cy="11.2" r="1.05" fill="currentColor" stroke="none" />
  </Svg>
);

const SortArrows = (p) => (
  <Svg {...p}>
    <path d="M8 5v13M8 5 4.8 8.4M8 5l3.2 3.4" />
    <path d="M16 19V6M16 19l-3.2-3.4M16 19l3.2-3.4" />
  </Svg>
);

const Sliders = (p) => (
  <Svg {...p}>
    <path d="M3.5 8h17M3.5 16h17" />
    <circle cx="15" cy="8" r="2.5" fill="#fff" />
    <circle cx="9" cy="16" r="2.5" fill="#fff" />
  </Svg>
);

const Globe = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.4" />
    <path d="M3.6 12h16.8M12 3.6c2.5 2.3 3.7 5.1 3.7 8.4s-1.2 6.1-3.7 8.4c-2.5-2.3-3.7-5.1-3.7-8.4s1.2-6.1 3.7-8.4Z" />
  </Svg>
);

const ArrowRight = (p) => (
  <Svg {...p}>
    <path d="M4.5 12h15M13.5 6l6 6-6 6" />
  </Svg>
);

const ArrowUpRight = (p) => (
  <Svg {...p}>
    <path d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" />
  </Svg>
);

// lucide "tag" — the Shop action.
const Tag = (p) => (
  <Svg {...p}>
    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
    <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
  </Svg>
);

// lucide "sparkles" — the More ideas action.
const Sparkle = (p) => (
  <Svg {...p}>
    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
    <path d="M20 2v4M22 4h-4" />
    <circle cx="4" cy="20" r="1.6" fill="currentColor" stroke="none" />
  </Svg>
);

// lucide "brush-cleaning" — the Organize action (was an abstract blob before).
const Organize = (p) => (
  <Svg {...p}>
    <path d="m16 22-1-4" />
    <path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1" />
    <path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z" />
    <path d="m8 22 1-4" />
  </Svg>
);

// lucide "house" — bottom nav Home, filled solid when active.
// Shared "house" shape — the original design with a curved door swoosh,
// used both for the bottom-nav Home icon and the story-row Home avatar.
const HOUSE_PATH = "M12 3.2 3.8 9.9c-.5.4-.8 1-.8 1.7v7c0 1.2 1 2.2 2.2 2.2h13.6c1.2 0 2.2-1 2.2-2.2v-7c0-.7-.3-1.3-.8-1.7L12 3.2Z";
const HOUSE_CURVE = "M8.2 15.4c.9 1.2 2.2 1.9 3.8 1.9s2.9-.7 3.8-1.9";

const NavHome = ({ active, ...p }) => (
  <Svg {...p}>
    <path d={HOUSE_PATH} fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 2.1} strokeLinejoin="round" />
    {active && <path d={HOUSE_CURVE} stroke="#fff" strokeWidth="1.9" strokeLinecap="round" fill="none" />}
  </Svg>
);

// lucide "search" — bottom nav Search.
const NavSearch = (p) => (
  <Svg {...p}>
    <path d="m21 21-4.34-4.34" />
    <circle cx="11" cy="11" r="8" />
  </Svg>
);

// lucide "user-round" — bottom nav Profile.
const NavPerson = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </Svg>
);

// "Home" board-story avatar — same house shape as the nav icon, always
// filled red with the white door swoosh, matching the recording.
const PinterestHomeGlyph = (p) => (
  <Svg {...p} stroke="none" fill="none">
    <path d={HOUSE_PATH} fill="#e60023" />
    <path d={HOUSE_CURVE} stroke="#fff" strokeWidth="1.9" strokeLinecap="round" fill="none" />
  </Svg>
);

// Official Pinterest "P" logomark (simple-icons, CC0) on the brand-red disc.
const PinterestLogo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#e60023" />
    <path
      fill="#fff"
      d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"
    />
  </svg>
);

const Star = (p) => (
  <Svg {...p}>
    <path d="m12 3.6 2.5 5.4 5.9.6-4.4 4 1.2 5.8L12 16.5l-5.2 2.9L8 13.6l-4.4-4 5.9-.6L12 3.6Z" strokeLinejoin="round" />
  </Svg>
);

// lucide "trash-2" and "rotate-ccw" — deck management controls.
const Trash = (p) => (
  <Svg {...p}>
    <path d="M10 11v6M14 11v6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </Svg>
);

const Reset = (p) => (
  <Svg {...p}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </Svg>
);

// lucide "wand-sparkles" — the Plan it action on plannable boards.
const WandSparkles = (p) => (
  <Svg {...p}>
    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
    <path d="m14 7 3 3M5 6v4M19 14v4M10 2v2M7 8H3M21 16h-4M11 3H9" />
  </Svg>
);

// lucide "pin" — save overlay on regular home-feed tiles.
const PinMark = (p) => (
  <Svg {...p}>
    <path d="M12 17v5" />
    <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
  </Svg>
);

// lucide "badge-check" — verified attribution on featured board cards.
const BadgeCheck = (p) => (
  <Svg {...p} fill="#e60023" stroke="#fff" strokeWidth="1.6">
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

// Pinterest gestalt "magnifying-glass-sparkle" — the Lens / visual-search
// icon: a magnifier with a sparkle. This is a filled 24px glyph, so it's
// drawn with fill rather than stroke like the outline icons above.
const ScanSearch = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M19.64.62a5 5 0 0 0 3.74 3.74l.62.14v1l-.62.14a5 5 0 0 0-3.74 3.74l-.14.62h-1l-.14-.62a5 5 0 0 0-3.74-3.74L14 5.5v-1l.62-.14A5 5 0 0 0 18.36.62L18.5 0h1zM11 19a8 8 0 0 0 7.94-7h2.01c-.2 2.01-1 3.85-2.2 5.33l4.46 4.47-1.41 1.41-4.47-4.47a10 10 0 1 1-2.25-16.88l-3 1.21Q11.53 3 11 3a8 8 0 1 0 0 16" />
  </svg>
);

/* ============================================================================
   DATA
   All prototype content. Screens read from these consts only, so swapping
   images / copy / boards never requires touching a component.
   ============================================================================ */

const img = (name) => `/${name}.jpg`;

// Board stories on the home feed. "hawaii" and "homeee" are real boards
// (see boardsById below); the rest are decorative, matching the recording.
const stories = [
  { id: "home", label: "Home", type: "home" },
  { id: "hawaii", label: "hawaii", image: img("real_01") },
  { id: "test", label: "test", image: img("clean_10") },
  { id: "abi", label: "abi", image: img("clean_14") },
  { id: "homeee", label: "homeee", image: img("clean_05") },
  { id: "mehendi", label: "mehendi", image: img("clean_07") },
];

// One consistent tab strip on the board landing page — hawaii is always
// visible regardless of which board you're on.
const LANDING_TABS = ["Home", "hawaii", "test", "abi", "homeee", "mehendi", "blouse"];

// Regular pins in the home feed. `shoppable: true` swaps the save-pin
// overlay for a shop tag so product pins read differently at a glance.
const homePins = [
  { id: "h1", image: img("clean_04"), h: 1.32 },
  { id: "h2", image: img("clean_03"), h: 1.28 },
  { id: "h3", image: img("clean_10"), h: 1.3 },
  { id: "h4", image: img("clean_07"), h: 1.45 },
  { id: "h5", image: img("clean_12"), h: 1.1, shoppable: true },
  { id: "h6", image: img("clean_02"), h: 0.86 },
  { id: "h7", image: img("clean_08"), h: 1.25, shoppable: true },
  { id: "h8", image: img("clean_16"), h: 1.4 },
  { id: "h9", image: img("clean_06"), h: 1.05, shoppable: true },
  { id: "h10", image: img("clean_01"), h: 1.3 },
];

// Sponsored "Shop now" tiles woven into the home feed, mirroring the
// Amazon/Target sponsored cards seen throughout the recording.
const homeShopTiles = [
  { id: "hs1", image: img("clean_11"), h: 1.5, sponsored: { brand: "Wayfair", title: "Refresh your living room", cta: "Shop now" } },
  { id: "hs2", image: img("clean_14"), h: 1.28, sponsored: { brand: "Etsy", title: "Handmade for your home", cta: "Shop now" } },
];

// Interleave the two sponsored tiles into the feed at fixed positions.
const homeFeedItems = [
  homePins[0],
  homePins[1],
  homeShopTiles[0],
  homePins[2],
  homePins[3],
  homePins[4],
  homeShopTiles[1],
  homePins[5],
  homePins[6],
  homePins[7],
  homePins[8],
  homePins[9],
];

// ----------------------------------------------------------------------------
// Boards
// ----------------------------------------------------------------------------

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

const hawaiiBoard = {
  id: "hawaii",
  title: "hawaii",
  pinCount: 15,
  plannable: true,
  collaborators: [{ initial: "S", tint: "#d9defc" }],
  pins: [
    { id: "hw1", image: img("real_01"), title: "Oahu palms", h: 1.36, tags: ["Palms", "Golden hour"], group: "Vibes" },
    { id: "hw2", image: img("real_02"), title: "Nā Pali coast", h: 1.02, tags: ["Coastline", "Hiking"], group: "Vibes" },
    { id: "hw3", image: img("real_03"), title: "Akaka Falls", h: 1.4, tags: ["Waterfall", "Rainforest"], group: "Photo ideas" },
    { id: "hw4", image: img("hawaii_01"), title: "Lanikai morning", h: 1.1, tags: ["Beach", "Kayak"], group: "Vibes" },
    { id: "hw5", image: img("hawaii_02"), title: "Road to Hana", h: 1.28, tags: ["Road trip"], group: "Photo ideas" },
    { id: "hw6", image: img("hawaii_03"), title: "Maui sunset", h: 1.0, tags: ["Sunset"], group: "Vibes" },
    { id: "hw7", image: img("hawaii_04"), title: "Black sand beach", h: 1.32, tags: ["Beach"], group: "Vibes" },
    { id: "hw8", image: img("hawaii_05"), title: "Poke crawl", h: 1.06, tags: ["Food"], group: "Local food" },
    { id: "hw9", image: img("hawaii_06"), title: "Surf check", h: 1.24, tags: ["Surf"], group: "Photo ideas" },
    { id: "hw10", image: img("hawaii_outfit_01"), title: "Island day fit", h: 1.33, tags: ["Sundress", "Straw tote"], group: "Outfits" },
    { id: "hw11", image: img("hawaii_outfit_02"), title: "Luau night look", h: 1.33, tags: ["Aloha shirt", "Slippers"], group: "Outfits" },
    { id: "hw12", image: img("hawaii_food_01"), title: "Poke bowl hitlist", h: 1.33, tags: ["Ahi", "Shoyu"], group: "Local food" },
    { id: "hw13", image: img("hawaii_food_02"), title: "Shave ice ranking", h: 1.33, tags: ["Rainbow", "Li hing"], group: "Local food" },
    { id: "hw14", image: img("hawaii_photo_01"), title: "Golden hour shots", h: 1.33, tags: ["Polaroid", "Sunset"], group: "Photo ideas" },
    { id: "hw15", image: img("hawaii_photo_02"), title: "Shot list: cliffs + lagoon", h: 1.33, tags: ["Shot list"], group: "Photo ideas" },
  ],
};

// Groups the "Plan it" magic organizes the hawaii board into: title + a
// collage of representative pins. `h` is a rough height weight used to
// deal groups into two independent masonry columns. One hero group (3
// images, bento: 2 across the top + 1 full-width below) plus three paired
// groups (2 images side by side) — ordered so the masonry naturally lands
// the hero on one side and the pairs stacked on the other, matching the
// reference bento layout.
const hawaiiPlanGroups = [
  { id: "pg-vibes", title: "Vibes", images: [img("hawaii_03"), img("hawaii_04"), img("real_02")], h: 1.55 },
  { id: "pg-outfits", title: "Outfits", images: [img("hawaii_outfit_01"), img("hawaii_outfit_02")], h: 1.0 },
  { id: "pg-food", title: "Local food", images: [img("hawaii_food_01"), img("hawaii_food_02")], h: 1.0 },
];

// The bento layout is hard-coded (not generic masonry) so the hero tile can
// CSS-stretch to exactly match the combined height of the two paired tiles.
const hawaiiPlanHero = hawaiiPlanGroups.find((g) => g.id === "pg-vibes");
const hawaiiPlanPairs = hawaiiPlanGroups.filter((g) => g.id !== "pg-vibes");

// "Booked your hotel yet?" cards in the planned view.
const hawaiiHotels = [
  { id: "ht1", image: img("hawaii_01") },
  { id: "ht2", image: img("clean_08") },
  { id: "ht3", image: img("hawaii_06") },
  { id: "ht4", image: img("clean_06") },
];

// "Don't miss local pinners' ideas" — a horizontal carousel of featured
// board cards (main image + two stacked sub images), matching Pinterest's
// "Explore featured boards" cards.
const hawaiiFeaturedBoards = [
  {
    id: "fb1",
    title: "Ideas for your Hawaii escape",
    attribution: "Pinterest",
    verified: true,
    meta: "101 Pins · 6d",
    main: img("hawaii_04"),
    subs: [img("hawaii_outfit_01"), img("real_02")],
  },
  {
    id: "fb2",
    title: "Island eats worth the trip",
    attribution: "Local Pinners",
    verified: false,
    meta: "64 Pins · 3mo",
    main: img("hawaii_food_01"),
    subs: [img("hawaii_food_02"), img("hawaii_05")],
  },
  {
    id: "fb3",
    title: "Golden hour photo spots",
    attribution: "Travel",
    verified: true,
    meta: "49 Pins · 7mo",
    main: img("hawaii_photo_01"),
    subs: [img("real_03"), img("hawaii_06")],
  },
];

const boardsById = { homeee: homeeeBoard, hawaii: hawaiiBoard };

// "More ideas for this board" — deal tile now carries a real sponsored
// footer instead of overlapping text baked into the image.
const homeeeIdeas = [
  { id: "m1", image: img("clean_14"), h: 1.34, sponsored: { brand: "Amazon", title: "Shop our creators' picks", cta: "Shop now" } },
  { id: "m2", image: img("clean_11"), h: 1.52, sponsored: { brand: "Target", title: "Fall Desk Decor", cta: "Learn more" } },
  { id: "m3", image: img("clean_15"), h: 1.18, deal: "Deal", sponsored: { brand: "Lulu and Georgia", title: "Living for soft hues", cta: "Up to 50% off" } },
  { id: "m4", image: img("clean_09"), h: 1.3, tags: ["Arched alcove", "Colorful cushions"] },
  { id: "m5", image: img("clean_12"), h: 1.08 },
  { id: "m6", image: img("clean_13"), h: 1.02 },
  { id: "m7", image: img("clean_16"), h: 1.38 },
  { id: "m8", image: img("clean_02"), h: 0.9 },
];

// Hawaii's ideas rail reuses the "MGM Rewards — Book now" sponsored moment
// from the recording, now with real Hawaii imagery.
const hawaiiIdeas = [
  { id: "hi1", image: img("hawaii_05"), h: 1.3, sponsored: { brand: "MGM Rewards", title: "A summer worth savoring", cta: "Book now" } },
  { id: "hi2", image: img("hawaii_02"), h: 1.5 },
  { id: "hi3", image: img("real_02"), h: 1.05 },
  { id: "hi4", image: img("hawaii_06"), h: 1.22 },
];

function ideasFor(boardId) {
  return boardId === "hawaii" ? hawaiiIdeas : homeeeIdeas;
}

const homeeeShop = [
  { id: "s1", image: img("shop_chair"), title: "Rust velvet accent chair", brand: "Target", price: "$249", h: 1.3 },
  { id: "s2", image: img("shop_table"), title: "Reclaimed oak coffee table", brand: "Artisan Blooms", price: "$189", h: 1.24 },
  { id: "s3", image: img("shop_pendant"), title: "Rattan drum pendant", brand: "West Elm", price: "$79", h: 1.02 },
  { id: "s4", image: img("shop_planter"), title: "Hand-painted planter set", brand: "Etsy", price: "$45", h: 1.36 },
  { id: "s5", image: img("shop_rug"), title: "Heirloom Moroccan rug", brand: "Revival", price: "$320", h: 1.1 },
  { id: "s6", image: img("shop_cushions"), title: "Block-print cushion covers", brand: "Fabindia", price: "$28", h: 1.0 },
];

const hawaiiShop = [
  { id: "hs-t1", image: img("shop_tote"), title: "Woven beach tote", brand: "Anthropologie", price: "$68", h: 1.2 },
  { id: "hs-t2", image: img("shop_towel"), title: "Quick-dry travel towel", brand: "REI", price: "$34", h: 1.35 },
  { id: "hs-t3", image: img("shop_snorkel"), title: "Snorkel mask set", brand: "Amazon", price: "$29", h: 1.05 },
  { id: "hs-t4", image: img("shop_sunhat"), title: "Wide-brim sun hat", brand: "Lack of Color", price: "$79", h: 1.15 },
];

// "Grab your essentials" — practical trip-prep items, shown as their own
// section below the main hawaii shop row. Built entirely from images
// already in the project: the outfit shots work as "shop the look" pins,
// and towel/snorkel double up since they're genuinely trip essentials.
const hawaiiEssentials = [
  { id: "he1", image: img("hawaii_outfit_01"), title: "Packable day dress", brand: "Shop the look", price: "$58", h: 1.33 },
  { id: "he2", image: img("hawaii_outfit_02"), title: "Breezy aloha shirt", brand: "Shop the look", price: "$42", h: 1.33 },
  { id: "he3", image: img("shop_towel"), title: "Quick-dry travel towel", brand: "REI", price: "$34", h: 1.35 },
  { id: "he4", image: img("shop_snorkel"), title: "Snorkel mask set", brand: "Amazon", price: "$29", h: 1.05 },
];

// "Compare cheaper options" — same items, lower-priced alternatives from
// different retailers, matching Pinterest's real price-comparison feature.
const hawaiiCheaper = [
  { id: "hc1", image: img("shop_tote"), title: "Straw tote, similar style", brand: "Amazon Basics", price: "$22", h: 1.2 },
  { id: "hc2", image: img("shop_towel"), title: "Microfiber towel, 2-pack", brand: "Walmart", price: "$16", h: 1.35 },
  { id: "hc3", image: img("shop_snorkel"), title: "Snorkel set, budget", brand: "Decathlon", price: "$18", h: 1.05 },
  { id: "hc4", image: img("shop_sunhat"), title: "Packable sun hat", brand: "H&M", price: "$25", h: 1.15 },
];

function shopFor(boardId) {
  return boardId === "hawaii" ? hawaiiShop : homeeeShop;
}

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

/* ============================================================================
   SHARED PHONE COMPONENTS
   ============================================================================ */

function StatusBar() {
  return (
    <div className="status-bar">
      <span className="status-time">11:31</span>
      <div className="status-right">
        <svg width="14" height="11" viewBox="0 0 15 12" fill="currentColor" aria-hidden="true">
          <path d="M7.5 2.4c2.3 0 4.4.9 6 2.3l1.3-1.4A10.9 10.9 0 0 0 7.5 0C4.6 0 2 1.2.2 3.3l1.3 1.4c1.6-1.4 3.7-2.3 6-2.3Z" opacity=".95" />
          <path d="M7.5 6.2c1.3 0 2.5.5 3.4 1.3l1.3-1.4a7 7 0 0 0-9.4 0l1.3 1.4c.9-.8 2.1-1.3 3.4-1.3Z" opacity=".95" />
          <circle cx="7.5" cy="10" r="1.7" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 17 12" fill="currentColor" aria-hidden="true">
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
        <span className="save-fab">{pin.shoppable ? <Tag size={15} /> : <PinMark size={15} />}</span>
      </button>
      <div className="pin-meta-row">
        <Ellipsis size={16} />
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
        <Star size={18} />
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
          <span className="save-fab">
            <Ellipsis size={15} />
          </span>
        </button>
        {sp && (
          <div className="idea-cta">
            <span>{sp.cta}</span>
            <ArrowUpRight size={17} />
          </div>
        )}
      </div>
      {sp && (
        <div className="idea-caption">
          <div className="idea-brand-row">
            <span className="idea-brand">{sp.brand}</span>
            <Ellipsis size={15} />
          </div>
          <span className="idea-title">{sp.title}</span>
          <span className="idea-sponsored">Sponsored</span>
        </div>
      )}
    </div>
  );
}

function ShopCard({ item, onOpen }) {
  return (
    <div className="feed-pin">
      <button className="pin-img-btn" onClick={() => onOpen(item)} aria-label={item.title}>
        <img src={item.image} alt="" style={{ aspectRatio: `1 / ${item.h}` }} loading="lazy" />
        <span className="save-fab">
          <Ellipsis size={15} />
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

function BottomNav({ active = "home", onHome }) {
  return (
    <nav className="bottom-nav">
      <button className="nav-btn" onClick={onHome} aria-label="Home">
        <NavHome size={23} active={active === "home"} />
      </button>
      <button className="nav-btn" aria-label="Search">
        <NavSearch size={22} />
      </button>
      <button className="nav-btn" aria-label="Profile">
        <NavPerson size={22} />
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
        {story.type === "home" ? <PinterestHomeGlyph size={34} /> : <img src={story.image} alt="" />}
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
          <PinterestLogo size={27} />
          <span className="wordmark">Pinterest</span>
        </div>
        <div className="home-header-actions">
          <button className="icon-btn" aria-label="Create">
            <Plus size={22} />
          </button>
          <button className="icon-btn badge-dot" aria-label="Messages">
            <Chat size={23} />
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
          <Masonry
            pins={homeFeedItems}
            renderPin={(pin) =>
              pin.sponsored ? <IdeaPin key={pin.id} pin={pin} onOpen={onOpenPin} /> : <FeedPin key={pin.id} pin={pin} onOpen={onOpenPin} />
            }
          />
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}

/* ============================================================================
   SCREEN: Board landing
   ============================================================================ */

function BoardLanding({ board, onHome, onSelectTab, onOpenSaves, onOpenPin }) {
  const tabs = LANDING_TABS;
  const saves = board.pins.slice(0, 5);
  const ideas = ideasFor(board.id);

  return (
    <div className="screen">
      <StatusBar />
      <div className="scroll-area with-nav">
        <div className="landing-tabs">
          {tabs.map((t) => {
            const isHome = t === "Home";
            const isBoard = boardsById[t] !== undefined;
            return (
              <button
                key={t}
                className={`landing-tab ${t === board.id ? "active" : ""}`}
                onClick={isHome ? onHome : isBoard ? () => onSelectTab(t) : undefined}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="landing-head">
          <h1 className="landing-title">{board.title}</h1>
          <span className="landing-count">{board.pinCount} Pins</span>
        </div>

        <div className="saves-header">
          <h2>Your saves</h2>
          <button className="saves-arrow" onClick={onOpenSaves} aria-label="Open all saves">
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="saves-carousel">
          {saves.map((pin) => (
            <button key={pin.id} className="saves-thumb" onClick={onOpenSaves} aria-label={pin.title}>
              <img src={pin.image} alt="" />
            </button>
          ))}
        </div>

        <h2 className="ideas-header">More ideas for this board</h2>
        <div className="feed-wrap">
          <Masonry pins={ideas} renderPin={(pin) => <IdeaPin key={pin.id} pin={pin} onOpen={onOpenPin} />} />
        </div>
      </div>

      <BottomNav active="home" onHome={onHome} />
    </div>
  );
}

/* ============================================================================
   SCREEN: Board view (All saves / More ideas / Shop tabs)
   ============================================================================ */

const BOARD_TABS = ["More ideas", "All saves", "Shop"];

// Collage tile for a planned group: 2 images side by side, a third spans the
// bottom, a fourth splits it — matching the reference design.
function PlanCollage({ group, onOpen }) {
  const [a, b, c, d] = group.images;
  return (
    <div className="plan-group">
      <button className="plan-collage" onClick={onOpen} aria-label={group.title}>
        <div className="plan-collage-row">
          <img src={a} alt="" />
          {b && <img src={b} alt="" />}
        </div>
        {c && (
          <div className="plan-collage-row">
            <img src={c} alt="" />
            {d && <img src={d} alt="" />}
          </div>
        )}
      </button>
      <span className="plan-group-title">{group.title}</span>
    </div>
  );
}

// "Explore featured boards"-style card: one main image plus two stacked
// sub images, a bold title, attribution row with optional verified badge,
// and a muted pin-count/time line.
function FeaturedBoardCard({ board }) {
  return (
    <button className="featured-card">
      <div className="featured-collage">
        <img className="featured-main" src={board.main} alt="" />
        <div className="featured-subs">
          <img src={board.subs[0]} alt="" />
          <img src={board.subs[1]} alt="" />
        </div>
      </div>
      <h4 className="featured-title">{board.title}</h4>
      <div className="featured-attribution">
        <span>{board.attribution}</span>
        {board.verified && <BadgeCheck size={15} />}
      </div>
      <span className="featured-meta">{board.meta}</span>
    </button>
  );
}

function BoardView({ board, onBack, onOpenPin }) {
  const [tab, setTab] = useState("All saves");
  const [planned, setPlanned] = useState(false);
  const [bursting, setBursting] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetShownRef = useRef(false);
  const ideas = ideasFor(board.id);
  const shop = shopFor(board.id);

  // Solution B: a proactive bottom sheet invites planning shortly after the
  // board opens (once per visit), as an alternative to the Plan it button.
  useEffect(() => {
    if (!board.plannable || planned || sheetShownRef.current) return;
    const t = setTimeout(() => {
      sheetShownRef.current = true;
      setSheetOpen(true);
    }, 900);
    return () => clearTimeout(t);
  }, [board.plannable, planned]);

  // Solution A: Plan it — red burst spreads from the action bar, fades, and
  // the grid reorganizes into groups mid-burst.
  const runPlan = () => {
    if (!board.plannable || bursting) return;
    setSheetOpen(false);
    setBursting(true);
    setTimeout(() => setPlanned(true), 420);
    setTimeout(() => setBursting(false), 1000);
  };

  return (
    <div className="screen">
      <StatusBar />
      <header className="board-header">
        <div className="board-header-left">
          <button className="icon-btn" onClick={onBack} aria-label="Back">
            <ChevronLeft size={22} />
          </button>
          <span className="board-header-name">{board.title}</span>
        </div>
        <div className="home-header-actions">
          <button className="icon-btn" aria-label="Invite collaborators">
            <PersonAdd size={22} />
          </button>
          <button className="icon-btn" aria-label="Share board">
            <Share size={20} />
          </button>
          <button className="icon-btn" aria-label="Board options">
            <Ellipsis size={20} />
          </button>
        </div>
      </header>

      <div className="scroll-area with-actionbar">
        <h1 className="board-title">{board.title}</h1>

        <div className="board-meta">
          <span className="public-pill">
            <Globe size={15} />
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
            <PersonAdd size={17} />
          </span>
        </div>

        <div className="board-tabs">
          {BOARD_TABS.map((t) => (
            <button key={t} className={`board-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {tab === "All saves" && !planned && (
          <>
            <div className="sort-row">
              <button className="sort-left">
                <SortArrows size={18} />
                <span>Custom order</span>
              </button>
              <button className="icon-btn" aria-label="Filters">
                <Sliders size={20} />
              </button>
            </div>
            <div className="feed-wrap">
              <Masonry pins={board.pins} renderPin={(pin) => <BoardPin key={pin.id} pin={pin} onOpen={onOpenPin} />} />
            </div>
          </>
        )}

        {tab === "All saves" && planned && (
          <div className="planned-view">
            <div className="sort-row">
              <button className="sort-left">
                <SortArrows size={18} />
                <span>Sorted by planner</span>
              </button>
              <button className="icon-btn" aria-label="Filters">
                <Sliders size={20} />
              </button>
            </div>

            <div className="plan-bento">
              <div className="plan-bento-hero">
                <button className="plan-collage plan-collage-hero" onClick={() => {}} aria-label={hawaiiPlanHero.title}>
                  <div className="plan-collage-row">
                    <img src={hawaiiPlanHero.images[0]} alt="" />
                    <img src={hawaiiPlanHero.images[1]} alt="" />
                  </div>
                  <div className="plan-collage-row plan-collage-row-grow">
                    <img src={hawaiiPlanHero.images[2]} alt="" />
                  </div>
                </button>
                <span className="plan-group-title">{hawaiiPlanHero.title}</span>
              </div>
              <div className="plan-bento-pairs">
                {hawaiiPlanPairs.map((g) => (
                  <PlanCollage key={g.id} group={g} onOpen={() => {}} />
                ))}
              </div>
            </div>

            <h2 className="plan-section-title">Booked your hotel yet?</h2>
            <div className="hotel-row">
              {hawaiiHotels.map((h) => (
                <div key={h.id} className="hotel-card">
                  <img src={h.image} alt="" />
                  <span className="hotel-cta">
                    See rooms
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              ))}
            </div>

            <h2 className="plan-section-title">Don't miss local pinners' ideas</h2>
            <div className="featured-carousel">
              {hawaiiFeaturedBoards.map((b) => (
                <FeaturedBoardCard key={b.id} board={b} />
              ))}
            </div>
          </div>
        )}

        {tab === "More ideas" && (
          <div className="feed-wrap tab-pad">
            <Masonry pins={ideas} renderPin={(pin) => <IdeaPin key={pin.id} pin={pin} onOpen={onOpenPin} />} />
          </div>
        )}

        {tab === "Shop" && (
          <div className="tab-pad">
            <div className="feed-wrap">
              <Masonry pins={shop} renderPin={(item) => <ShopCard key={item.id} item={item} onOpen={onOpenPin} />} />
            </div>

            {board.id === "hawaii" && (
              <>
                <h2 className="plan-section-title">Grab your essentials</h2>
                <div className="feed-wrap">
                  <Masonry pins={hawaiiEssentials} renderPin={(item) => <ShopCard key={item.id} item={item} onOpen={onOpenPin} />} />
                </div>

                <h2 className="plan-section-title">Compare cheaper options</h2>
                <div className="feed-wrap">
                  <Masonry pins={hawaiiCheaper} renderPin={(item) => <ShopCard key={item.id} item={item} onOpen={onOpenPin} />} />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="action-bar">
        {board.plannable ? (
          <>
            <button className="action-item" onClick={runPlan}>
              <WandSparkles size={21} />
              <span>Plan it</span>
            </button>
            <button className="action-item">
              <Plus size={21} />
              <span>Add</span>
            </button>
          </>
        ) : (
          <>
            <button className="action-item">
              <Organize size={21} />
              <span>Organize</span>
            </button>
            <button className="action-item">
              <Plus size={21} />
              <span>Add</span>
            </button>
            <button className="action-item">
              <Sparkle size={21} />
              <span>More ideas</span>
            </button>
            <button className="action-item">
              <Tag size={21} />
              <span>Shop</span>
            </button>
          </>
        )}
      </div>

      {bursting && <span className="magic-burst" />}

      {sheetOpen && (
        <div className="sheet-scrim" onClick={() => setSheetOpen(false)}>
          <div className="plan-sheet" onClick={(e) => e.stopPropagation()}>
            <span className="sheet-grabber" />
            <h3 className="plan-sheet-title">Ready to turn imagination into reality?</h3>
            <p className="plan-sheet-body">
              This board is full of ideas. Let Pinterest group your saves into outfits, photo spots, local food and
              vibes — and turn them into a plan you can actually book, pack and shoot.
            </p>
            <div className="plan-sheet-actions">
              <button className="plan-sheet-cta" onClick={runPlan}>
                Plan this board
              </button>
              <button className="plan-sheet-later" onClick={() => setSheetOpen(false)}>
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   SCREEN: Pin closeup + visual search
   ============================================================================ */

function PinCloseup({ pin, onClose, onOpenPin }) {
  const chips = pin.tags?.length ? pin.tags : ["Warm interiors", "Handmade decor", "Cozy corners"];
  const related = relatedFor(pin);
  const [scanning, setScanning] = useState(false);
  const [scanKey, setScanKey] = useState(0);

  // A few seconds after a pin opens, the lens "wakes up": a shimmer sweeps
  // the photo and a focus ring roams around it, as if visual search were
  // scouting the image, then settles back into the static button and stops.
  useEffect(() => {
    setScanning(false);
    const wake = setTimeout(() => setScanning(true), 1100);
    const settle = setTimeout(() => setScanning(false), 1100 + 2200);
    return () => {
      clearTimeout(wake);
      clearTimeout(settle);
    };
  }, [pin, scanKey]);

  const runScan = () => setScanKey((k) => k + 1);

  return (
    <div className="screen closeup">
      <div className="scroll-area closeup-scroll">
        <div className="closeup-hero">
          <img src={pin.image} alt={pin.title || ""} />
          <button className="overlay-btn overlay-left" onClick={onClose} aria-label="Close">
            <Close size={19} />
          </button>
          <button className="overlay-btn overlay-right" aria-label="Pin options">
            <Ellipsis size={19} />
          </button>

          {scanning && <span key={`shimmer-${scanKey}`} className="scan-shimmer" />}
          {scanning && (
            <span key={`lens-${scanKey}`} className="scan-lens">
              <ScanSearch size={18} />
            </span>
          )}

          <button
            className={`overlay-btn lens-btn ${scanning ? "active" : ""}`}
            onClick={runScan}
            aria-label="Search this image"
          >
            <ScanSearch size={20} />
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
                    <Ellipsis size={15} />
                  </span>
                </button>
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
  const [activeBoardId, setActiveBoardId] = useState("homeee");

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

  const activeBoard = boardsById[activeBoardId] ?? homeeeBoard;

  return (
    <div className="phone">
      <div className="phone-screen">
        {screen === "home" && (
          <HomeFeed
            onOpenBoard={(story) => {
              if (boardsById[story.id]) {
                setActiveBoardId(story.id);
                onNavigate(story.id === "hawaii" ? "board" : "landing");
              }
            }}
            onOpenPin={openPin("home")}
          />
        )}
        {screen === "landing" && (
          <BoardLanding
            board={activeBoard}
            onHome={() => onNavigate("home")}
            onSelectTab={(id) => {
              setActiveBoardId(id);
              if (id === "hawaii") onNavigate("board");
            }}
            onOpenSaves={() => onNavigate("board")}
            onOpenPin={openPin("landing")}
          />
        )}
        {screen === "board" && (
          <BoardView
            board={activeBoard}
            onBack={() => onNavigate(activeBoardId === "hawaii" ? "home" : "landing")}
            onOpenPin={openPin("board")}
          />
        )}
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

const DECK_STORAGE_KEY = "pinterest-walkthrough-deck-v2";

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
          <button className="deck-icon-btn" onClick={addSlide} aria-label="Add slide" title="Add slide">
            <Plus size={19} />
          </button>
          <button className="deck-icon-btn" onClick={deleteSlide} disabled={slides.length <= 1} aria-label="Delete slide" title="Delete slide">
            <Trash size={19} />
          </button>
          <button className="deck-icon-btn" onClick={resetDeck} aria-label="Reset deck" title="Reset deck">
            <Reset size={19} />
          </button>
        </div>
      </div>
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
