import { FC } from "react";

interface Props {
  size?: number
  color?: string
}

const ArrowIcon: FC<Props> = ({ size = 18, color = "white" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 25.5L25.5 10.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 10.5L25.5 10.5L25.5 24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
};

export default ArrowIcon;