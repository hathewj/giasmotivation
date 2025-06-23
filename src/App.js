import React, { useState, useEffect } from "react";
import "./App.css";

const targetDate = new Date("2025-12-31T00:00:00");

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
    const quoteIndex = new Date().getDate() % quotes.length;
    setQuote(quotes[quoteIndex]);
  }, []);

  return (
    <div className="App">
      <h1>Countdown to {targetDate.toDateString()}</h1>
      <h2>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </h2>
      <p><em>{quote}</em></p>
    </div>
  );
}

export default App;