const nameAnalyzeMessages: Record<string, string> = {
  A: "A is for Awesome. Welcome back, {name}!",
  B: "Brilliant to see you today, {name}!",
  C: "Cool, calm, and collected. Welcome, {name}.",
  D: "Delighted to have you here, {name}!",
  E: "Excellent to see you, {name}!",
  F: "Fantastic to have you back, {name}.",
  G: "Greatness has arrived! Welcome, {name}.",
  H: "Hero of the hour, {name} is here!",
  I: "Incredible to have you back, {name}!",
  J: "Jumping right into it with {name}!",
  K: "Kickstarting the day with {name}!",
  L: "Looking sharp today, {name}!",
  M: "Making things happen, {name}!",
  N: "Nothing but the best for {name} today!",
  O: "Outstanding to have you here, {name}!",
  P: "Positively thrilled to see you, {name}!",
  Q: "Quite a pleasure to see you, {name}.",
  R: "Ready to rock and roll, {name}?",
  S: "Stellar to have you back, {name}!",
  T: "Terrific to see you, {name}!",
  U: "Unstoppable energy today, {name}!",
  V: "VIP vibes only today for {name}!",
  W: "Wonderful to have you back, {name}!",
  X: "X-tra special to have you here, {name}!",
  Y: "Yes! {name} is finally here.",
  Z: "Zeroing in on success today with {name}!",
};

const subtitles: Record<"male" | "female", string[]> = {
  male: [
    "Looking sharp today, sir.",
    "Ready to tackle the day?",
    "Your dashboard is ready when you are.",
  ],
  female: [
    "Looking elegant today, ma'am.",
    "Ready to shine?",
    "We hope your day is as wonderful as you are.",
  ],
};

export const randomizer = (arr: string[]) =>
  arr[Math.floor(Math.random() * (arr.length - 1))];

export function nameAnalyzer(name: string) {
  if (name.length === 0) return "Welcome!";

  const firstLetter = name[0].toUpperCase();

  const messageString = nameAnalyzeMessages[firstLetter];

  return messageString.replace("{name}", name);
}

export function genderSubtitles(gender: "male" | "female") {
  const subtitleArray = subtitles[gender];

  return randomizer(subtitleArray);
}
