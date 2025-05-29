'use client'
import { useEffect, useState } from "react";
import DesktopSite from "./desktopSite";
import MobileSite from "@/app/mobileSite";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);

    checkSize(); // Run on initial load
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isMobile ? <MobileSite /> : <DesktopSite />;
}