import { cva } from "class-variance-authority";

const variants = cva(
  "px-[18px] py-2 flex justify-center items-center gap-2 rounded-lg transition-colors text-[16px] text-black dark:text-white font-semibold",
  {
    variants: {
      variant: {
        primary: "bg-[#7F56D9] hover:bg-[#7F56D9]/80",
        flat: "bg-transparent dark:text-[#94969C] text-[#475467] dark:hover:text-[#94969C]/80 hover:text-[#475467]/80",
        light: "bg-[#F2F4F7] dark:bg-[#1F242F] text-[#485467] dark:text-[#94969C]",
      },
      size: {
        md: "px-[18px] py-2",
        sm: "px-3 py-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export default variants;
