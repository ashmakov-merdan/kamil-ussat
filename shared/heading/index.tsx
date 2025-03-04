import { FC } from "react";

interface Props {
  text: string
}

const Heading: FC<Props> = ({ text }) => {
  return <h1 className="text-[36px] font-semibold text-[#101828] dark:text-[#F5F5F6]">{text}</h1>
};

export default Heading;