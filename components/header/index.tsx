import { FC } from "react";
import Boxes from "./boxes";
import Clients from "../clients";
import { Shadow } from "@/shared";

const Header: FC = () => {
  return (
    <header className="mt-20 relative 2xl:container h-screen 2xl:mx-auto">
      <Shadow />
      <div className="relative container mx-auto w-screen h-[65vh] border-y border-neutral-100/10 overflow-hidden">
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-12 z-[4]">
          <div className="flex flex-col items-center justify-center">
            <div className="py-1 pl-1 pr-2.5 flex flex-row items-center border border-[#333741] rounded-md gap-x-3">
              <div className="px-2 py-0.5 border rounded-md border-[#333741]">
                <span>New Products</span>
              </div>
              <div>
                <p>Check out our new products</p>
              </div>
            </div>
            <div className="gap-y-6">
              <h1 className="text-[60px] font-semibold">We build what we believe</h1>
              <p className="max-w-3xl w-full text-center text-xl font-normal text-[#94969C]">We are team of software  engineers and web developers. We offer our services to a local and international companies. </p>
            </div>
          </div>
          <div className="flex gap-x-3">
            <button type={"button"}
              className={"px-5 py-4 text-[18px] font-semibold border border-[#333741] rounded-lg bg-[#161B26] hover:bg-[#161B26]/70 transition-colors"}>Login</button>
            <button type={"button"}
              className="px-5 py-4 text-[18px] font-semibold border border-[#7F56D9] rounded-lg bg-[#7F56D9] hover:bg-[#7F56D9]/70 transition-colors">Sign Up</button>
          </div>
        </div>
        <Boxes />
      </div>
      <Clients />
    </header>
  )
};

export default Header;