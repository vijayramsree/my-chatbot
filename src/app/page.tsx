// Home page is configured to automatically redirect to the upload path, serving as the app's entry point.

"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/upload");
}
