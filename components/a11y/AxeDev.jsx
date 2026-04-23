"use client";
import { useEffect } from "react";

export default function AxeDev() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    (async () => {
      const React = (await import("react")).default;
      const ReactDOM = (await import("react-dom")).default;
      const axe = (await import("@axe-core/react")).default;
      axe(React, ReactDOM, 1000);
    })();
  }, []);
  return null;
}
