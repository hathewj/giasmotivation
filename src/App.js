import React, { useState, useEffect } from "react";
import "./App.css";
import { motion } from "framer-motion";
const targetDate = new Date("2026-05-09T00:00:00");

const quotes = [
  "Believe in yourself!",
  "Keep pushing forward!",
  "Success is no accident.",
  "Every day is a second chance.",
  "Dream big, work hard!"
];

function getRemainingTime() {
  const now = new Date();
  const difference = targetDate - now;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function App() {
  const [timeLeft, setTimeLeft] = useState(getRemainingTime());
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  async function fetchQuote() {
    try {
      const res = await fetch("https://zenquotes.io/api/today");
      const data = await res.json();
      if (data && data[0]) {
        setQuote(data[0].q + " — " + data[0].a);
      }
    } catch (err) {
      setQuote("Stay motivated and keep going!");
    }
  }
  fetchQuote();
}, []); 

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-100 to-white px-4 text-center">
    <motion.h1
      className="text-3xl md:text-5xl font-bold text-gray-800 mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Countdown to {targetDate.toDateString()}
    </motion.h1>

    <motion.div
      className="text-xl md:text-3xl font-mono text-slate-700 mb-6"
      key={JSON.stringify(timeLeft)} // triggers animation on update
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </motion.div>

    <motion.div
      className="text-lg md:text-xl italic text-gray-600 max-w-md"
      key={quote} // triggers animation when quote changes
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      "{quote}"
    </motion.div>
  </div>
);
}

export default App;
