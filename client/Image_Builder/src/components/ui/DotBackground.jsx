// src/components/ui/DotBackgroundDemo.jsx
"use client";
import React from "react";

/**
 * DotBackgroundDemo
 * - dots only (transparent between dots) so your page's background shows through
 * - dots are masked so they are faint near edges and stronger toward center
 *
 * Props:
 * - children: content to render above dots
 * - className: optional wrapper classes (e.g. "min-h-[420px]")
 * - vignette: optional boolean (default: false). If true, a subtle dark vignette is added to edges to blend UI.
 */
export function DotBackgroundDemo({ children, className = "", vignette = false }) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Dots layer (transparent between dots) + mask that fades them out toward edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              // small white dot then transparent (dot color + spacing)
              "radial-gradient(circle, rgba(255,255,255,0.14) 1.5px, transparent 1px)",
            backgroundSize: "18px 18px", // spacing of dots (adjust)
            backgroundRepeat: "repeat",
            // Mask so dots are fully visible near center and fade out toward corners/edges
            WebkitMaskImage:
              "radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)",
            maskImage:
              "radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        />
      </div>

      {/* Optional vignette overlay to darken edges slightly (helps UI blend) */}
      {vignette && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      )}

      {/* content above dots */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default DotBackgroundDemo;
