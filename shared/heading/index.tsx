import { FC } from "react";

interface Props {
  text: string
}

const Heading: FC<Props> = ({ text }) => {
  return <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold text-[#101828] dark:text-[#F5F5F6]">{text}</h1>
};

export default Heading;