"use client";
import dynamic from "next/dynamic";

const AxeDev = dynamic(() => import("./AxeDev"), { ssr: false });

export function AxeDevWrapper() {
  return <AxeDev />;
}
