"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Spark from "./Spark";

/** Floating "Start a Project" pill, fixed bottom-right, fades in past the hero. */
export default function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="/contact"
      className={`tdl-fab inline-flex items-center gap-2 rounded-full no-underline ${visible ? "visible" : ""}`}
      style={{
        background: "#064e3b",
        color: "#ffffff",
        padding: "12px 24px",
        fontSize: "14px",
        fontWeight: 500,
        boxShadow: "0 4px 16px rgba(6,78,59,0.3)",
      }}
    >
      <Spark size={12} color="#ffffff" />
      Start a Project
    </Link>
  );
}
