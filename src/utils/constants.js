export const MOCK_USER_ID = "cyberpunk420";
export const INITIAL_USER_CREDITS = 1000;

const GEMINI_API_KEY = "AIzaSyADLjlJj3v2EkNxuIpPriP0v3HE_Ugopyo";
export const GEMINI_API_URL_FLASH = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export const FALLBACK_CAPTIONS = [
  "To the MOON!",
  "Brrr goes stonks",
  "HODL the vibes!",
  "Cyber-meme activated.",
  "Glitch in the matrix, but make it funny.",
];
export const FALLBACK_VIBES = [
  "Neon Crypto Chaos",
  "Retro Stonks Futurism",
  "Digital Dystopian Humor",
  "Synthwave Satire",
  "Glitchcore Gold",
];

export const INITIAL_MEMES_DATA = [
  {
    id: "1",
    title: "Doge HODL",
    imageUrl: "https://picsum.photos/seed/doge/400/300",
    tags: ["crypto", "funny", "doge"],
    upvotes: 69,
    owner_id: "system",
    highestBid: 100,
    highestBidder: "anon_bidder",
    aiCaption: "Doge contemplates the digital void, one HODL at a time.",
    aiVibe: "Wholesome Crypto Whimsy",
  },
  {
    id: "2",
    title: "Stonks Go Up",
    imageUrl: "https://picsum.photos/seed/stonks/400/300",
    tags: ["stonks", "finance", "humor"],
    upvotes: 120,
    owner_id: "system",
    highestBid: 250,
    highestBidder: "trader_x",
    aiCaption: "The only way is up... or is it? Stonks logic.",
    aiVibe: "Chaotic Bull Market Energy",
  },
  {
    id: "3",
    title: "Cyber Cat",
    imageUrl: "https://picsum.photos/seed/cat/400/300",
    tags: ["cyberpunk", "cats", "future"],
    upvotes: 88,
    owner_id: "system",
    highestBid: 150,
    highestBidder: "neko_netrunner",
    aiCaption: "This cat has seen the future. It's full of laser pointers.",
    aiVibe: "Sleek Feline Futurism",
  },
];

export const APP_TITLE = "MemeHustle v0.1";
