import type { Route } from "./+types/onboarding";
import { Welcome } from "../welcome/welcome";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Onboarding" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Onboarding() {
  return <Welcome />;
}
