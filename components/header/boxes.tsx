"use client"

import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";

const Boxes: FC = () => {
  const [isDark, setIsDark] = useState(false);
  const rows = 8;
  const cols = 16;
  const [activeCells, setActiveCells] = useState<{ row: number; col: number }[]>([]);

  // Handle localStorage safely on client side
  useEffect(() => {
    setIsDark(localStorage.theme === "dark");
    
    // Listen for theme changes
    const handleStorageChange = () => {
      setIsDark(localStorage.theme === "dark");
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const generateRandomCells = () => {
    const newCells = [];

    for (let i = 0; i < 12; i++) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);
      newCells.push({ row: randomRow, col: randomCol });
    }

    setActiveCells(newCells);
  };

  useEffect(() => {
    generateRandomCells(); // Initial generation
    
    const interval = setInterval(() => {
      generateRandomCells();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-wrap z-[-1]">
      {Array.from({ length: rows * cols }).map((_, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const isActive = activeCells.some(cell => cell.row === row && cell.col === col);
        
        const variants = {
          active: {
            backgroundColor: isDark ? "#4B4F52" : "rgba(0, 0, 0, 1)"
          },
          inactive: {
            backgroundColor: isDark ? "rgba(0, 0, 0, 0)" : "rgba(255, 255, 255, 0)"
          },
          transition: {
            duration: 1.5,
            ease: [0.4, 0.0, 0.2, 1] // Matches Material Design's standard easing
          }
        };

        return (
          <motion.div
            key={index}
            className="w-28 h-28 border border-gray-600 dark:border-gray-200 opacity-[0.03]"
            initial="inactive"
            animate={isActive ? "active" : "inactive"}
            variants={variants}
          />
        );
      })}
    </div>
  )
};

export default Boxes;