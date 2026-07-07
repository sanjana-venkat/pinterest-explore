import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Mask,
  TapArea,
  Text,
} from "gestalt";

const boards = [
  { id: "home", label: "Home", image: null },
  { id: "hawaii", label: "hawaii", image: "/assets/hawaii/real_01.jpg" },
  { id: "design", label: "design", image: "/assets/clean/clean_02.jpg" },
  { id: "homeee", label: "homeee", image: "/assets/clean/clean_06.jpg" },
];

const homePins = [
  { image: "/assets/clean/clean_01.jpg", height: "tall", title: "Warm living room" },
  {
    image: "/assets/hawaii/real_01.jpg",
    height: "medium",
    title: "Plan a warm-weather escape",
    sponsored: true,
    cta: "Book now",
    brand: "Hawaii Travel",
  },
  { image: "/assets/clean/clean_03.jpg", height: "medium", title: "Mocha floral nails" },
  { image: "/assets/clean/clean_07.jpg", height: "tall", title: "Painted mirror decor" },
  {
    image: "/assets/clean/clean_11.jpg",
    height: "medium",
    title: "Fall Desk Decor",
    sponsored: true,
    cta: "Learn more",
    brand: "Target",
  },
  { image: "/assets/clean/clean_09.jpg", height: "tall", title: "Patterned niche" },
  { image: "/assets/clean/clean_10.jpg", height: "medium", title: "Cozy reading room" },
  { image: "/assets/clean/clean_12.jpg", height: "medium", title: "Botanical lounge" },
];

const boardPins = [
  { image: "/assets/clean/clean_01.jpg", title: "Decor", height: "tall" },
  { image: "/assets/clean/clean_02.jpg", title: "Arched alcove", height: "medium" },
  { image: "/assets/clean/clean_05.jpg", title: "Pendant lights", height: "medium" },
  { image: "/assets/clean/clean_07.jpg", title: "Floral mirror", height: "tall" },
  { image: "/assets/clean/clean_13.jpg", title: "Colorful cushions", height: "medium" },
  { image: "/assets/clean/clean_16.jpg", title: "Indoor garden nook", height: "medium" },
];

const boardContent = {
  hawaii: {
    title: "hawaii",
    pins: [
      { image: "/assets/hawaii/real_01.jpg", title: "Oahu palms", height: "tall" },
      { image: "/assets/hawaii/real_02.jpg", title: "Na Pali coast", height: "medium" },
      { image: "/assets/hawaii/real_03.jpg", title: "Akaka Falls", height: "tall" },
      { image: "/assets/hawaii/hawaii_03.jpg", title: "Maui sunset", height: "medium" },
      { image: "/assets/hawaii/hawaii_04.jpg", title: "Black sand beach", height: "tall" },
      { image: "/assets/hawaii/hawaii_06.jpg", title: "Surf view", height: "medium" },
    ],
  },
  design: {
    title: "design",
    pins: [
      { image: "/assets/clean/clean_02.jpg", title: "Arched alcove", height: "medium" },
      { image: "/assets/clean/clean_09.jpg", title: "Patterned niche", height: "tall" },
      { image: "/assets/clean/clean_13.jpg", title: "Colorful cushions", height: "medium" },
      { image: "/assets/clean/clean_16.jpg", title: "Indoor garden nook", height: "medium" },
    ],
  },
  homeee: {
    title: "homeee",
    pins: boardPins,
  },
};

const savedImages = [
  "/assets/clean/clean_01.jpg",
  "/assets/clean/clean_02.jpg",
  "/assets/clean/clean_04.jpg",
  "/assets/clean/clean_05.jpg",
  "/assets/clean/clean_08.jpg",
];

const ideas = [
  {
    image: "/assets/clean/clean_14.jpg",
    cta: "Shop now",
    brand: "Amazon",
    title: "Shop our creators' picks",
  },
  {
    image: "/assets/clean/clean_11.jpg",
    cta: "Learn more",
    brand: "Target",
    title: "Fall Desk Decor",
  },
  {
    image: "/assets/clean/clean_15.jpg",
    cta: "View ideas",
    brand: "Deal",
    title: "Jungalow rooms",
  },
  {
    image: "/assets/clean/clean_09.jpg",
    cta: "Explore",
    brand: "Pinterest",
    title: "Patterned alcoves",
  },
];

const detailCards = [
  { image: "/assets/clean/clean_02.jpg", title: "Arched alcove" },
  { image: "/assets/clean/clean_13.jpg", title: "Colorful cushions" },
  { image: "/assets/clean/clean_15.jpg", title: "Reading corner" },
  { image: "/assets/clean/clean_09.jpg", title: "Painted niches" },
];

const views = [
  { id: "home", label: "Home feed" },
  { id: "ideas", label: "More ideas" },
  { id: "board", label: "All saves" },
  { id: "visual", label: "Visual search" },
];

function BoardStory({ board, active, onClick }) {
  return (
    <TapArea accessibilityLabel={`Open ${board.label}`} onTap={onClick}>
      <Box minWidth={88}>
        <Flex direction="column" alignItems="center" gap={2}>
          <div className={`story-card ${active ? "active" : ""}`}>
            {board.image ? (
              <img src={board.image} alt="" />
            ) : (
              <Flex height="100%" alignItems="center" justifyContent="center">
                <Icon accessibilityLabel="Pinterest" icon="pinterest" color="brandPrimary" size={58} />
              </Flex>
            )}
          </div>
          <Text weight="bold" align="center">
            {board.label}
          </Text>
        </Flex>
      </Box>
    </TapArea>
  );
}

function BottomNav({ active, setActive, boardMode = false }) {
  const nav = boardMode
    ? [
        ["board", "magic-wand", "Organize"],
        ["board", "add", "Add"],
        ["ideas", "sparkle", "More ideas"],
        ["board", "tag", "Shop"],
      ]
    : [
        ["home", active === "home" ? "home-fill" : "home", "Home"],
        ["ideas", "search", "Search"],
        ["board", "person", "Profile"],
      ];

  return (
    <div className={`bottom-nav ${boardMode ? "wide" : ""}`}>
      {nav.map(([id, icon, label]) => (
        <div className="nav-item" key={`${id}-${label}`}>
          <IconButton
            accessibilityLabel={label}
            bgColor={boardMode ? "transparent" : "white"}
            icon={icon}
            iconColor={!boardMode && active === id && id === "home" ? "dark" : "dark"}
            onClick={() => setActive(id)}
            selected={false}
            size={boardMode ? "xl" : "lg"}
            tooltip={{ text: label }}
          />
            {boardMode && <Text weight="bold">{label}</Text>}
        </div>
      ))}
    </div>
  );
}

function PinCard({ pin, shop, onPinTap }) {
  return (
    <article className={`pin-card ${pin.height || ""}`} onClick={onPinTap}>
      {shop || pin.sponsored ? (
        <div className="shop-card-surface">
          <img src={pin.image} alt={pin.title || ""} />
          <div className="shop-cta">
            <Text weight="bold" size="300">
              {pin.cta || "Learn more"}
            </Text>
            <Icon accessibilityLabel="Open" icon="arrow-up-right" size={22} />
          </div>
          <Flex alignItems="start">
            <Box>
              <Text weight="bold">{pin.brand}</Text>
              <Text>{pin.title}</Text>
              <Text color="subtle">Sponsored</Text>
            </Box>
          </Flex>
        </div>
      ) : (
        <>
          <Mask rounding={4}>
            <img src={pin.image} alt={pin.title || ""} />
          </Mask>
          <Flex justifyContent="between" alignItems="center">
            <Text>{pin.title}</Text>
            <IconButton accessibilityLabel="Save" icon="star-outline" size="sm" />
          </Flex>
        </>
      )}
    </article>
  );
}

function MasonryGrid({ pins, shop = false, onPinTap }) {
  return (
    <div className="masonry-grid">
      {pins.map((pin) => (
        <PinCard key={`${pin.image}-${pin.title}`} pin={pin} shop={shop} onPinTap={onPinTap} />
      ))}
    </div>
  );
}

function HomeFeed({ openBoard, setActive }) {
  return (
    <main className="screen home-screen">
      <Flex alignItems="center" justifyContent="between">
        <Flex alignItems="center" gap={2}>
          <Icon accessibilityLabel="Pinterest" icon="pinterest" color="dark" size={52} />
          <Heading accessibilityLevel={1} size="500">
            Pinterest
          </Heading>
        </Flex>
        <Flex gap={3}>
          <IconButton accessibilityLabel="Create" icon="add" size="lg" />
          <div className="message-dot">
            <IconButton accessibilityLabel="Messages" icon="speech-ellipsis" size="lg" />
          </div>
        </Flex>
      </Flex>

      <div className="stories">
        {boards.map((board) => (
          <BoardStory
            key={board.label}
            board={board}
            active={board.label === "Home"}
            onClick={() => (board.id === "home" ? setActive("home") : openBoard(board.id))}
          />
        ))}
      </div>

      <MasonryGrid pins={homePins} onPinTap={() => setActive("visual")} />
    </main>
  );
}

function IdeasScreen({ currentBoard, openBoard, setActive }) {
  const board = boardContent[currentBoard] ?? boardContent.homeee;
  return (
    <main className="screen ideas-screen">
      <nav className="board-tabs compact">
        {boards.map((board) => (
          <TapArea key={board.label} accessibilityLabel={board.label} onTap={() => (board.id === "home" ? setActive("home") : openBoard(board.id))}>
            <span className={board.id === currentBoard ? "tab-active" : ""}>{board.label}</span>
          </TapArea>
        ))}
      </nav>

      <Box marginTop={8}>
        <Heading accessibilityLevel={1} size="600">
          {board.title}
        </Heading>
        <Text size="300">9 Pins</Text>
      </Box>

      <section className="saved-strip-section">
        <Flex justifyContent="between" alignItems="center">
          <Heading accessibilityLevel={2} size="400">
            Your saves
          </Heading>
          <button className="soft-square" type="button" onClick={() => setActive("board")}>
            <Icon accessibilityLabel="Go to saves" icon="arrow-forward" size={22} />
          </button>
        </Flex>
        <div className="saved-strip">
          {savedImages.map((image) => (
            <img src={image} alt="" key={image} />
          ))}
        </div>
      </section>

      <Heading accessibilityLevel={2} size="400">
        More ideas for this board
      </Heading>
      <MasonryGrid pins={ideas} shop />
    </main>
  );
}

function BoardScreen({ currentBoard, setActive }) {
  const board = boardContent[currentBoard] ?? boardContent.homeee;
  return (
    <main className="screen board-screen">
      <Flex alignItems="center" justifyContent="between">
        <Flex alignItems="center" gap={4}>
          <IconButton accessibilityLabel="Back" icon="arrow-back" size="xl" onClick={() => setActive("ideas")} />
          <Text weight="bold" size="400">
            {board.title}
          </Text>
        </Flex>
        <Flex gap={3}>
          <IconButton accessibilityLabel="Add collaborator" icon="person-add" size="xl" />
          <IconButton accessibilityLabel="Share" icon="share" size="xl" />
          <IconButton accessibilityLabel="More" icon="ellipsis" size="xl" />
        </Flex>
      </Flex>

      <Box marginTop={8}>
        <Heading accessibilityLevel={1} size="600">
          {board.title}
        </Heading>
        <div className="board-meta-row">
          <div className="pill">
            <Icon accessibilityLabel="Public" icon="globe" size={26} />
            <Text weight="bold">Public board</Text>
          </div>
          <span className="dot-separator">·</span>
          <Text color="subtle" size="300">9 Pins</Text>
        </div>
        <div className="profile-stack" aria-label="Board collaborators">
          <div className="profile-circle blue">S</div>
          <div className="profile-circle peach">A</div>
          <div className="profile-circle neutral">
            <Icon accessibilityLabel="Invite" icon="person-add" size={28} />
          </div>
        </div>
      </Box>

      <nav className="board-tabs">
        {["More ideas", "All saves", "Shop"].map((tab) => (
          <span className={tab === "All saves" ? "tab-active" : ""} key={tab}>
            {tab}
          </span>
        ))}
      </nav>

      <Flex justifyContent="between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <Icon accessibilityLabel="Sort" icon="sort-ascending" size={28} />
          <Text weight="bold" size="300">
            Custom order
          </Text>
        </Flex>
        <IconButton accessibilityLabel="Filter" icon="filter" size="lg" />
      </Flex>

      <MasonryGrid pins={board.pins} />
    </main>
  );
}

function VisualSearchScreen({ setActive }) {
  return (
    <main className="visual-screen">
      <div className="visual-hero">
        <img src="/assets/clean/clean_02.jpg" alt="Arched alcove with colorful cushions" />
        <div className="visual-actions">
          <button type="button" onClick={() => setActive("home")} aria-label="Close">
            <Icon accessibilityLabel="Close" icon="cancel" color="inverse" size={38} />
          </button>
          <button type="button" aria-label="More options">
            <Icon accessibilityLabel="More" icon="ellipsis" color="inverse" size={38} />
          </button>
        </div>
      </div>

      <div className="search-chips">
        {["Arched alcove", "Colorful cushions", "Pendant lights"].map((chip) => (
          <button type="button" key={chip}>
            {chip}
          </button>
        ))}
      </div>

      <section className="visual-sheet">
        <div className="handle" />
        <MasonryGrid pins={detailCards} />
      </section>
    </main>
  );
}

export default function App() {
  const [active, setActive] = useState("home");
  const [currentBoard, setCurrentBoard] = useState("homeee");

  const openBoard = (boardId) => {
    setCurrentBoard(boardId);
    setActive("board");
  };

  return (
    <Box color="default" minHeight="100vh">
      <div className="view-switcher" aria-label="Screen switcher">
        {views.map((view) => (
          <button
            className={active === view.id ? "is-active" : ""}
            key={view.id}
            onClick={() => setActive(view.id)}
            type="button"
          >
            {view.label}
          </button>
        ))}
      </div>
      <div className="iphone-frame">
        <div className="iphone-speaker" />
        <div className="phone-shell">
          <div className="route-stage" key={`${active}-${currentBoard}`}>
            {active === "home" && <HomeFeed openBoard={openBoard} setActive={setActive} />}
            {active === "ideas" && <IdeasScreen currentBoard={currentBoard} openBoard={openBoard} setActive={setActive} />}
            {active === "board" && <BoardScreen currentBoard={currentBoard} setActive={setActive} />}
            {active === "visual" && <VisualSearchScreen setActive={setActive} />}
          </div>
          {active !== "visual" && (
            <BottomNav key={active === "board" ? "board-toolbar" : "global-toolbar"} active={active} setActive={setActive} boardMode={active === "board"} />
          )}
        </div>
      </div>
    </Box>
  );
}
