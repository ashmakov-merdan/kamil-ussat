import Image from "next/image";
import { FC } from "react";
import code from "@/assets/code.svg";

interface Props {
  title: string
  desc: string
}

const FeatureCard: FC<Props> = ({ title, desc }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-5">
      <div className="p-2.5 md:p-3 rounded-[10px] border border-[#EAECF0] dark:border-[#333741]">
        <Image
          width={24}
          height={24}
          src={code}
          alt={"code-icon"}
        />
      </div>
      <div className="space-y-2 flex-1">
        <h2 className="text-sm md:text-xl font-semibold text-[#101828] dark:text-[#F5F5F6] text-center">{title}</h2>
        <p className="max-sm:hidden text-base font-normal text-[#94969C] text-center">{desc}</p>
      </div>
    </div>
  )
};

export default FeatureCard;