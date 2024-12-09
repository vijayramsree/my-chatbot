// Home page is configured to automatically redirect to the upload path, serving as the app's entry point.

"use client";

import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  },[])
}
