"use client"

import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";

const Boxes: FC = () => {
  const rows = 6;
  const cols = 10;
  const [activeCells, setActiveCells] = useState<{ row: number; col: number }[]>([]);

  const generateRandomCells = () => {
    const newCells = [];

    for (let i = 0; i < 5; i++) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);
      newCells.push({ row: randomRow, col: randomCol });
    }

    setActiveCells(newCells);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      generateRandomCells();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-wrap z-[-1]">
      {Array.from({ length: rows * cols }).map((_, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const isActive = activeCells.some(cell => cell.row === row && cell.col === col);

        return (
          <motion.div
            key={index}
            className="w-28 h-28 border border-gray-200 opacity-[0.03] bg-transparent transition-all duration-200"
            animate={{
              backgroundColor: isActive ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)"
            }}
            transition={{
              backgroundColor: { duration: 1, ease: "easeIn" }
            }}
          />
        );
      })}
    </div>
  )
};

export default Boxes;