import navigation from "@/constants/navigation";
import { Logo } from "@/shared";
import SwitchTheme from "@/shared/switch-theme";
import { FC } from "react";

const Navigation: FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-[#0C111D] py-5 z-[5]">
      <div className="container mx-auto flex flex-row items-center gap-x-10">
        <Logo />
        <ul className="flex-1 flex flex-row gap-x-8">
          {navigation.map((nav) => (
            <li key={nav.id}>
              <a className="text-base text-[#94969C] hover:text-white/70 font-inter font-semibold transition-colors" href={nav.href}>{nav.label}</a>
            </li>
          ))}
        </ul>
        <div className="inline-flex items-center gap-x-3">
          <SwitchTheme />
          <div className="rounded-full bg-red-500 w-10 h-10 grid place-items-center">
            <p>M</p>
          </div>
        </div>
      </div>
    </nav>
  )
};

export default Navigation;