import { useEffect, useState } from "react";
import { CardRenderer } from "~/components/card-renderer/card-renderer";
import { UserForm } from "~/components/greeting/forms/user-form";
import { genderSubtitles, nameAnalyzer } from "~/lib/personalization";
import { supabaseClient } from "~/lib/supabase-client";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const res = await supabaseClient.from("cards").select("*");

  const serverData = await serverLoader;
  return { ...serverData, ...res };
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    gender: string;
  } | null>(null);

  const wallCards = loaderData.data;

  console.log("wallcards", wallCards);

  const countCard = wallCards?.length;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setIsDialogOpen(true);
    } else {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Gagal parse user", e);
        setIsDialogOpen(true);
      }
    }
  }, []);

  return (
    <div className="p-8">
      <UserForm open={isDialogOpen} setOpen={setIsDialogOpen} />
      <div>
        <span className="inline-block px-2 py-0.5 bg-[#3ecf8e] text-[#005434] text-[12px] font-bold uppercase tracking-widest rounded-xs mb-3">
          Live Collaboration
        </span>
        <h2 className="font-headline text-4xl leading-tight font-extrabold tracking-tighter text-[#191c1c]">
          Team <span className="text-[#006c45] italic">Celebration</span>
        </h2>
      </div>
      <div className="flex w-full items-center justify-center">
        {currentUser && (
          <CardRenderer
            key="latest"
            name={nameAnalyzer(currentUser.name)}
            text={
              currentUser ? genderSubtitles(currentUser.gender as any) : "-"
            }
          />
        )}
      </div>
      <div className="flex justify-between">
        <span>THE WALL</span>
        <span>{countCard} active notes</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wallCards?.map((item) => (
          <CardRenderer
            key={item.id}
            name={item.author}
            text={item.messsage}
            gender={item.gender as any}
          />
        ))}
      </div>
    </div>
  );
}
