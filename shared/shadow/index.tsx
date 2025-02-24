import { FC, Fragment } from "react";

interface Props {
  className?: string
}

const Shadow: FC<Props> = ({ className="w-[480px] from-[#0C111D]" }) => {
  return (
    <Fragment>
      <div className={`absolute left-0 top-0 h-full bg-gradient-to-r to-transparent pointer-events-none z-[1] ${className}`}></div>
      <div className={`absolute right-0 top-0 h-full  bg-gradient-to-l to-transparent pointer-events-none z-[1] ${className}`}></div>
    </Fragment>
  )
};

export default Shadow;