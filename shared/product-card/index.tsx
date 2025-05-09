import ArrowIcon from "@/components/icons/arrow-icon";
import Image from "next/image";
import { FC } from "react";

interface Props {
  priority: string | number
  title: string
  desc: string
  image: string
}

const ProductCard: FC<Props> = ({ title, desc, image, priority }) => {
  return (
    <div className="flex-grow-0 flex-shrink-0 max-w-[280px] md:max-w-[548px] space-y-4">
      <div className="flex-1 relative aspect-video border border-neutral-100 dark:border-[#5F5F5F] rounded-xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/5" />
        <Image
          width={548}
          height={348}
          className="h-full"
          src={image}
          alt={title}
        />
      </div>
      <div className="relative flex flex-row">
        <div className="flex-1 flex flex-col">
          <div className="absolute top-0 left-0 z-[-1]">
            <h1 className="text-[80px] md:text-[96px] font-semibold text-[#D6DCE4] dark:text-[#1F2430]">{priority}</h1>
          </div>
          <div className="pt-[72px] flex-1">
            <h2 className="text-[18px] md:text-[32px] font-bold text-[#101828] dark:text-[#FCFCFC]">{title}</h2>
          </div>
          <div>
            <p className="text-[14px] md:text-[18px] text-[#94969C] font-normal">{desc}</p>
          </div>
        </div>
        <button type={"button"}>
          <ArrowIcon />
        </button>
      </div>
    </div>
  )
};

export default ProductCard;