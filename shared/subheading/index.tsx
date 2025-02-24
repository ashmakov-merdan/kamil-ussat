import { FC } from "react";

interface Props {
  text: string
}

const Subheading: FC<Props> = ({ text }) => {
  return <h2 className="text-base font-medium text-[#94969C]">{text}</h2>
};

export default Subheading;