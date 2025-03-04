import { FC } from "react";

interface Props {
  title: string
}

const ServiceCard: FC<Props> = ({ title }) => {
  return (
    <div className="relative px-8 pb-8 pt-10 bg-[#F9FAFB] dark:bg-[#161B26] rounded-2xl">
      <div className="absolute -top-6 right-0 left-0 flex justify-center">
        <div className="w-12 h-12 rounded-full bg-[#F4EBFF] dark:bg-purple-500" />
      </div>
      <h2 className="text-center text-[#101828] dark:text-white text-xl font-semibold">{title}</h2>
    </div>
  )
};

export default ServiceCard;