import { cn } from "@/utils";
import { FC } from "react";

interface Props {
  text: string
  isCentered?: boolean
  textSize?: string
}

const Heading: FC<Props> = ({ text, textSize, isCentered = true }) => {
  return <h1 className={cn(
    "text-3xl md:text-4xl font-semibold text-[#101828] dark:text-[#F5F5F6]",
    isCentered ? "text-center" : "",
    textSize
  )}>{text}</h1>
};

export default Heading;