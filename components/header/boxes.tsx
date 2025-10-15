"use client"

import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";

const Boxes: FC = () => {
  const [isDark, setIsDark] = useState(false);
  const rows = 8;
  const cols = 16;
  const [activeCells, setActiveCells] = useState<{ row: number; col: number }[]>([]);
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  // Handle localStorage safely on client side
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    updateTheme();
    
    // Create MutationObserver to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateTheme();
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const generateRandomCells = () => {
    const newCells = [];
    const usedPositions = new Set();

    for (let i = 0; i < 12; i++) {
      let position;
      do {
        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * cols);
        position = `${randomRow}-${randomCol}`;
      } while (usedPositions.has(position));
      
      const [row, col] = position.split('-').map(Number);
      usedPositions.add(position);
      newCells.push({ row, col });
    }

    setActiveCells(newCells);
  };

  useEffect(() => {
    generateRandomCells(); // Initial generation
    
    const interval = setInterval(() => {
      generateRandomCells();
    }, 3000); // Increased interval for smoother feel

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-wrap z-[-1]">
      {Array.from({ length: rows * cols }).map((_, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const isActive = activeCells.some(cell => cell.row === row && cell.col === col);
        const isHovered = hoveredCell?.row === row && hoveredCell?.col === col;
        
        const variants = {
          active: {
            backgroundColor: isDark 
              ? "rgba(75, 79, 82, 0.9)" 
              : "rgba(0, 0, 0, 0.5)",
            scale: 1.05
          },
          inactive: {
            backgroundColor: "rgba(0, 0, 0, 0)",
            scale: 1
          },
          hover: {
            backgroundColor: isDark 
              ? "rgba(75, 79, 82, 0.9)" 
              : "rgba(0, 0, 0, 0.5)",
            scale: 1.1
          }
        };

        return (
          <motion.div
            key={index}
            className="w-28 h-28 border border-gray-600 dark:border-gray-200 opacity-[0.03] cursor-pointer"
            initial="inactive"
            animate={isHovered ? "hover" : isActive ? "active" : "inactive"}
            variants={variants}
            transition={{
              duration: 1.2,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 1.1,
              backgroundColor: isDark 
                ? "rgba(75, 79, 82, 0.6)" 
                : "rgba(0, 0, 0, 0.25)",
              transition: {
                duration: 0.2,
                ease: "easeOut"
              }
            }}
            onHoverStart={() => setHoveredCell({ row, col })}
            onHoverEnd={() => setHoveredCell(null)}
          />
        );
      })}
    </div>
  )
};

export default Boxes;