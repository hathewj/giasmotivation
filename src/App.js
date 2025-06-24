import React, { useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import ExplodingIcon from './ExplodingIcon';
import { FaRocket, FaStar } from 'react-icons/fa';

const targetDate = new Date("2026-05-09T00:00:00");

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
      } catch {
        setQuote("Stay motivated and keep going!");
      }
    }
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-100 to-white px-4 text-center relative overflow-hidden">
      <Particles
        id="tsparticles"
        init={loadFull}
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          particles: {
            number: { value: 15 },
            shape: {
              type: "circle"
            },
            size: { value: 8 },
            move: {
              enable: true,
              speed: 2,
              outModes: { default: "bounce" }
            }
          },
          interactivity: {
            events: {
              onClick: { enable: true, mode: "repulse" }
            }
          }
        }}
      />
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
        Countdown to {targetDate.toDateString()}
      </h1>
      <div className="text-xl md:text-3xl font-mono text-slate-700 mb-6">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>
      <div className="text-lg md:text-xl italic text-gray-600 max-w-md mb-6">
        "{quote}"
      </div>
      <div style={{
        zIndex: 1000,
        marginTop: '40px',
        display: 'flex',
        gap: '40px',
        background: 'yellow',
        padding: '20px',
        position: 'relative',
      }}>
        <ExplodingIcon icon={<FaRocket size={60} />} />
        <ExplodingIcon icon={<FaStar size={60} />} />
      </div>
    </div>
  );
}

export default App;