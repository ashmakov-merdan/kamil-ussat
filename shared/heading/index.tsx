import { cn } from "@/utils";
import { FC } from "react";

interface Props {
  text: string
  isCentered?: boolean
}

const Heading: FC<Props> = ({ text, isCentered = true }) => {
  return <h1 className={cn(
    "text-3xl md:text-4xl font-semibold text-[#101828] dark:text-[#F5F5F6]",
    isCentered ? "text-center" : ""
  )}>{text}</h1>
};

export default Heading;