import { FC } from "react";

interface Props {
  text: string
}

const Tag: FC<Props> = ({ text }) => {
  return (
    <div className="p-4 rounded-full border border-[#D0D5DD] dark:border-[#333741]">
      <p className="text-semibold text-[#101828] dark:text-[#F5F5F6] transition-colors">{text}</p>
    </div>
  )
};

export default Tag;