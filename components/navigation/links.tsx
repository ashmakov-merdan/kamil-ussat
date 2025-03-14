import navigation from "@/constants/navigation";
import { FC } from "react";

const Links: FC = () => {
  return (
    <ul className="max-lg:hidden flex-1 flex flex-row gap-x-8">
      {navigation.map((nav) => (
        <li key={nav.id}>
          <a className="text-base dark:text-[#94969C] text-[#475467] hover:text-[#475467]/80 dark:hover:text-white/70 darK: font-inter font-semibold transition-colors" href={nav.href}>{nav.label}</a>
        </li>
      ))}
    </ul>
  )
};

export default Links;