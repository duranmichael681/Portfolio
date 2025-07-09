"use client";
import { useEffect, useState } from "react";
import DesktopSite from "./desktopSite";
import MobileSite from "@/app/mobileSite";
import useIsMobile from "@/components/isMobile";

export default function HomePage() {
  const isMobile = useIsMobile();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || isMobile === null) {
    // Prevent any rendering until after mount
    return null;
  }

  return isMobile ? <MobileSite /> : <DesktopSite />;
}
