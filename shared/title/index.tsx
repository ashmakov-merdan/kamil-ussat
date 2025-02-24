import { FC } from "react";
import Heading from "../heading";
import Subheading from "../subheading";
import { cn } from "@/utils";

interface Props {
  title: string
  desc: string
  className?: string
}

const Title: FC<Props> = ({ title, desc, className="justify-center items-center" }) => {
  return (
    <div className={cn(
      "flex flex-col gap-y-2",
      className
    )}>
      <Subheading text={title} />
      <Heading text={desc} />
    </div>
  )
};

export default Title;