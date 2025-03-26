import { FC } from "react";

interface Props {
  text: string
}

const Subheading: FC<Props> = ({ text }) => {
  return <h2 className="text-xl font-medium text-[#6941C6] dark:text-[#94969C]">{text}</h2>
};

export default Subheading;