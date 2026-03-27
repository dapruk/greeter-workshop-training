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
    theme: "dark"
  },
  {
    id: 2,
    name: "Dina Nabila",
    text: "Halo! Jangan lupa istirahat sebentar kalau lagi stuck. Kadang solusi muncul pas kita lagi rehat sejenak.",
    gambar: null,
    theme: "primary"
  },
  {
    id: 3,
    name: "Kevin Sanjaya",
    text: "Semangat ngoding hari ini! Semoga semua test Jest-nya hijau dan nggak ada bug aneh yang nyelip."
  },
  {
    id: 4,
    name: "Alya Putri",
    text: "You're doing great! Apapun tantangannya hari ini, kamu pasti bisa melewatinya dengan baik."
  }
];

export default function Onboarding() {

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DUMMY_CARDS.map((item) => (
          <CardRenderer
            key={item.id}
            name={item.name}
            text={item.text}
            gambar={item.gambar}
            theme={item.theme as any}
          />
        ))}
      </div>
    </div>
  );
}
