import { Card } from "../ui/card";

interface CardRendererProps {
  name: string;
  text: string;
  gambar?: string | null;
  theme?: "dark" | "light" | "primary" | string | null;
  gender?: 'male' | 'female';
}

export const greetings = [
  "Bonjour! ✨",
  "Hola! 👋",
  "Konnichiwa!",
  "Annyeong!",
  "Ciao!",
  "Guten Tag!",
  "Sawadee! ",
  "Namaste! 🙏",
  "Salam! 🌙",
  "Ni Hao!",
  "Privyet!",
  "Olá!",
  "Shalom! ✨",
  "Kalimera! ☀️",
  "Aloha! 🌺",
  "Merhaba!"
];

export function randomGreeting() {
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  return randomGreeting;
}

export function CardRenderer({ name, text, gambar, theme, gender }: CardRendererProps) {


  const themeClasses =
    theme === "dark" ? "bg-slate-800 text-white border-slate-700" :
      theme === "primary" ? "bg-blue-500 text-white border-blue-600" :
        "bg-white text-slate-900 border-slate-200";

  return (
    <Card className={`flex flex-col overflow-hidden shadow-sm transition-all hover:shadow-md ${themeClasses} ${gender === 'female' ? 'bg-[#f2a6d2]' : 'bg-[#a6f2cf]'}`} data-testid="card-container">
      {gambar && (
        <img
          src={gambar}
          alt={`Visual untuk ${name}`}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5 flex flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-wider opacity-60">
          {randomGreeting()}
        </span>
        <p className="opacity-80 leading-relaxed text-[#247155] font-body text-lg font-medium ">
          {text}
        </p>
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container opacity-60">-- {name}</span>
      </div>
    </Card>
  );
}