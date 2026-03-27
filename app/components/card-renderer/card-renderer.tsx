import { Card } from "../ui/card";

interface CardRendererProps {
  name: string;
  text: string;
  gambar?: string | null;
  theme?: "dark" | "light" | "primary" | string | null;
}

export function CardRenderer({ name, text, gambar, theme }: CardRendererProps) {

  const themeClasses =
    theme === "dark" ? "bg-slate-800 text-white border-slate-700" :
      theme === "primary" ? "bg-blue-500 text-white border-blue-600" :
        "bg-white text-slate-900 border-slate-200";

  return (
    <Card className={`flex flex-col overflow-hidden shadow-sm transition-all hover:shadow-md ${themeClasses}`}>
      {gambar && (
        <img
          src={gambar}
          alt={`Visual untuk ${name}`}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-lg font-semibold leading-tight">
          {name}
        </h3>
        <p className="text-sm opacity-80 leading-relaxed">
          {text}
        </p>
      </div>
    </Card>
  );
}