import { FC } from "react";
import Heading from "../heading";
import Subheading from "../subheading";
import { cn } from "@/utils";

interface Props {
  title: string
  desc: string
  isHeadingCentered?: boolean
  className?: string
}

const Title: FC<Props> = ({ title, desc, isHeadingCentered=true, className="justify-center items-center" }) => {
  return (
    <div className={cn(
      "flex flex-col gap-y-2",
      className
    )}>
      <Subheading text={title} />
      <Heading text={desc} isCentered={isHeadingCentered} />
    </div>
  )
};

export default Title;