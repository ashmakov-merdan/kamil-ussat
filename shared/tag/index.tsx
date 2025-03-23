import { cn } from "@/utils";
import { FC } from "react";

interface Props {
  isSelected: boolean
  onSelect: () => void
  text: string
}

const Tag: FC<Props> = ({ text, isSelected, onSelect }) => {
  return (
    <button type={"button"} onClick={onSelect} className={cn(
      "p-3 rounded-full border cursor-pointer transition-colors",
      isSelected ? "border-purple-500" : "border-[#D0D5DD] dark:border-[#333741]"
    )}>
      <p className="font-semibold text-[#101828] dark:text-[#F5F5F6] transition-colors">{text}</p>
    </button>
  )
};

export default Tag;