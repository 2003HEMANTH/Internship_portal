import { redirect } from "next/navigation";

export default function Home() {
  redirect("/int");
  return null;
} 