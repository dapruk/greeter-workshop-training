import type { Route } from "./+types/onboarding";
import { Welcome } from "../welcome/welcome";
import { CardRenderer } from "~/components/card-renderer/card-renderer";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Onboarding" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const DUMMY_CARDS = [
  {
    id: 1,
    name: "Raka Pratama",
    text: "Selamat pagi! Semangat hari Jumat. Semoga kerjaan hari ini lancar dan weekend nanti bisa santai maksimal.",
    gambar: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=500&q=60",
    // theme: "dark"
    gender: "male"
  },
  {
    id: 2,
    name: "Dina Nabila",
    text: "Halo! Jangan lupa istirahat sebentar kalau lagi stuck. Kadang solusi muncul pas kita lagi rehat sejenak.",
    gambar: null,
    // theme: "primary"
    gender: "female"

  },
  {
    id: 3,
    name: "Kevin Sanjaya",
    text: "Semangat ngoding hari ini! Semoga semua test Jest-nya hijau dan nggak ada bug aneh yang nyelip.",
    gender: "male"

  },
  {
    id: 4,
    name: "Alya Putri",
    text: "You're doing great! Apapun tantangannya hari ini, kamu pasti bisa melewatinya dengan baik.",
    gender: "female"
  }
];

export default function Onboarding() {
  const latestCard = DUMMY_CARDS.at(-1);
  const wallCards = DUMMY_CARDS.slice(0, -1);
  const countCard = wallCards.length;

  return (
    <div className="p-8">
      <div>
        <span className="inline-block px-2 py-0.5 bg-[#3ecf8e] text-[#005434] text-[12px] font-bold uppercase tracking-widest rounded-xs mb-3">
          Live Collaboration
        </span>
        <h2 className="font-headline text-4xl leading-tight font-extrabold tracking-tighter text-[#191c1c]">
          Team <span className="text-[#006c45] italic">Celebration</span>
        </h2>
      </div>
      <div className="flex w-full items-center justify-center">
        {latestCard && (
          <CardRenderer
            key={latestCard.id}
            name={latestCard.name}
            text={latestCard.text}
            gambar={latestCard.gambar}
            gender={latestCard.gender as any}
          />
        )}
      </div>
      <div className="flex justify-between">
        <span>THE WALL</span>
        <span>{countCard} active notes</span>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wallCards.map((item) => (
          <CardRenderer
            key={item.id}
            name={item.id === 3 ? "Kevin Sanjaya" : item.name}
            text={item.text}
            // gambar={null}
            // theme={item.theme as any}
            gender={item.gender as any}
          />
        ))}
      </div>
    </div>
  );
}
