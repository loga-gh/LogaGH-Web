"use client";

import { useEffect, useState, useCallback } from "react";

const PHRASES = [
  { text: "Contact for Booking", lang: "en" },
  { text: "முன்பதிவுக்கு தொடர்புகொள்ளுங்கள்", lang: "ta" },
  { text: "වෙන්කරවා ගැනීම සඳහා අමතන්න", lang: "si" },
  { text: "बुकिंग के लिए संपर्क करें", lang: "hi" },
];

const TYPING_SPEED = 55;    // ms per character typing
const ERASING_SPEED = 30;   // ms per character erasing
const HOLD_DURATION = 2200; // ms to hold the completed phrase
const PAUSE_AFTER_ERASE = 400; // ms pause between erase and next phrase

export function TypingBookingButton() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isHolding, setIsHolding] = useState(false);

  const currentPhrase = PHRASES[phraseIndex]!;

  const tick = useCallback(() => {
    if (isHolding) return;

    if (isTyping) {
      // Typing forward
      if (displayText.length < currentPhrase.text.length) {
        setDisplayText(currentPhrase.text.slice(0, displayText.length + 1));
      } else {
        // Finished typing — hold
        setIsHolding(true);
        setTimeout(() => {
          setIsHolding(false);
          setIsTyping(false);
        }, HOLD_DURATION);
      }
    } else {
      // Erasing
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        // Finished erasing — pause then switch phrase
        setIsHolding(true);
        setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
          setIsTyping(true);
          setIsHolding(false);
        }, PAUSE_AFTER_ERASE);
      }
    }
  }, [displayText, isTyping, isHolding, currentPhrase]);

  useEffect(() => {
    if (isHolding) return;
    const speed = isTyping ? TYPING_SPEED : ERASING_SPEED;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isHolding, isTyping]);

  return (
    <a
      href="https://wa.me/94761798609"
      target="_blank"
      rel="noreferrer"
      className="group relative btn px-8 py-4 text-base bg-[#D6C3A3] text-[#1E3A5F] hover:bg-[#D6C3A3]/90 shadow-lg font-semibold overflow-hidden min-w-[240px] md:min-w-[300px] text-center transition-all duration-300"
      aria-label="Contact for Booking — WhatsApp"
    >
      {/* Shimmer sweep on hover */}
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Typing text */}
      <span className="relative z-10 inline-flex items-center justify-center gap-0">
        <span
          lang={currentPhrase.lang}
          className="whitespace-nowrap"
        >
          {displayText}
        </span>
        {/* Blinking cursor */}
        <span
          className="inline-block w-[2px] h-[1.1em] ml-0.5 rounded-full animate-blink"
          style={{ background: "#1E3A5F" }}
          aria-hidden="true"
        />
      </span>
    </a>
  );
}
