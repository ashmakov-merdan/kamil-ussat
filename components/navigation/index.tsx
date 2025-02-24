import { Logo } from "@/shared";
import { FC } from "react";

const Navigation: FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-background py-5 z-[5]">
      <div className="container mx-auto flex flex-row items-center gap-x-10">
        <Logo />
        <ul className="flex-1 flex flex-row gap-x-8">
          <li>
            <a href="#features" className="text-base text-[#94969C] hover:text-[#FFFFFF]/70 font-semibold transition-colors">Features</a>
          </li>
          <li>
            <a href="#products" className="text-base text-[#94969C] hover:text-[#FFFFFF]/70 font-semibold transition-colors">Products</a>
          </li>
          <li>
            <a href="#services" className="text-base text-[#94969C] hover:text-[#FFFFFF]/70 font-semibold transition-colors">Services</a>
          </li>
          <li>
            <a href="#contact-us" className="text-base text-[#94969C] hover:text-[#FFFFFF]/70 font-semibold transition-colors">Contact us</a>
          </li>
          <li>
            <a href="#courses" className="text-base text-[#94969C] hover:text-[#FFFFFF]/70 font-semibold transition-colors">Our courses</a>
          </li>
        </ul>
        <div className="rounded-full bg-red-500 w-10 h-10 grid place-items-center">
          <p>M</p>
        </div>
      </div>
    </nav>
  )
};

export default Navigation;