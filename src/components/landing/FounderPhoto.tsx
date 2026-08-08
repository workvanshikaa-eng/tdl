"use client";

import { useState } from "react";

/**
 * Founder portrait. Falls back to a tinted name plate if the image file
 * is missing, so the live site never shows a broken image.
 * Drop the photo at /public/vanshika.jpg to activate it.
 */
export default function FounderPhoto({
  objectPosition = "center 28%",
}: {
  objectPosition?: string;
}) {
  const [ok, setOk] = useState(true);

  return (
    <div
      style={{
        aspectRatio: "4 / 5",
        borderRadius: 12,
        overflow: "hidden",
        background: "linear-gradient(135deg,#f4faf7 0%,#e6f4ef 100%)",
        display: "flex",
        alignItems: "flex-end",
        padding: ok ? 0 : 24,
      }}
    >
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/vanshika.jpg"
          alt="Vanshika Agarwal, founder of The Distribution Lab"
          onError={() => setOk(false)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition,
            display: "block",
          }}
        />
      ) : (
        <span
          style={{
            fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            fontSize: "11px",
            color: "#0a7c5c",
          }}
        >
          Vanshika Agarwal
        </span>
      )}
    </div>
  );
}
