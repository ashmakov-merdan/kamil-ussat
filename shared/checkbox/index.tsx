"use client"
import { FC, useState } from "react";
import { motion } from "framer-motion";
import CheckIcon from "../check";

interface Props {
  label?: string
  size?: string
  isChecked?: boolean
  onChange?: (checked: boolean) => void
}

const Checkbox: FC<Props> = ({ label = "Default label", size = "w-6 h-6", isChecked = false, onChange }) => {
  const [checked, setCheck] = useState<boolean>(false);

  const toggle = () => {
    setCheck(!checked);
    onChange?.(!checked);
  }

  return (
    <div className="inline-flex items-center gap-x-3 cursor-pointer" onClick={toggle}>
      <motion.div
        initial={{ backgroundColor: "transparent" }}
        animate={{
          backgroundColor: checked ? "#7F56D9" : "transparent"
        }}
        transition={{ duration: 0.5 }}
        className={`${size} flex items-center justify-center rounded-md border border-[#333741] focus:outline-[1px] focus:outline-[#7F56D9] cursor-pointer transition-colors`}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{
            opacity: checked ? 1 : 0,
            scale: checked ? 1 : 0.9
          }}
          transition={{
            duration: 0.2
          }}
        >
          <CheckIcon color={"white"} size={16} />
        </motion.div>
      </motion.div>
      <p className="bg-transparent font-normal text-base text-[#94969C] select-none">{label}</p>
    </div>
  )
};

export default Checkbox;