"use client";

import { useEffect, useState } from "react";

interface Props {
  targetDate: string;
  targetTime?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculate(targetDate: string, targetTime = "12:00"): TimeLeft {
  const [hours, minutes] = targetTime.split(":").map(Number);
  const target = new Date(targetDate);
  target.setHours(hours, minutes, 0, 0);

  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer({ targetDate, targetTime = "12:00" }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculate(targetDate, targetTime));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTimeLeft(calculate(targetDate, targetTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, targetTime]);

  const isOver =
    mounted &&
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (isOver) {
    return (
      <div className="text-center py-4">
        <p className="text-brand-orange font-semibold text-lg">
          This event has passed
        </p>
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2 sm:gap-4">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-navy rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {mounted ? String(unit.value).padStart(2, "0") : "00"}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider font-medium">
              {unit.label}
            </p>
          </div>
          {i < units.length - 1 && (
            <span className="text-2xl font-bold text-brand-orange pb-5 hidden sm:block">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
