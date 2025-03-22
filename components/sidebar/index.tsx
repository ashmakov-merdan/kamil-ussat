import Link from "next/link";
import { FC } from "react";

const Sidebar: FC = () => {
  return (
    <aside className="px-4 py-8 sticky top-24 h-fit min-w-64 bg-[#F2F4F7] dark:bg-[#161B26] rounded-lg overflow-y-scroll">
      <div className="flex flex-col gap-y-1">
        <Link href={"/admin/users"} className="block w-full text-black dark:text-white bg-[#FFFFFF] bg-[#FFFFFF]/40 dark:bg-[#0C111D] dark:hover:bg-[#0C111D]/60 px-3 py-2 rounded-lg transition-all">Users</Link>
        <Link href={"/admin/services"} className="block w-full text-black dark:text-white bg-[#FFFFFF] bg-[#FFFFFF]/40 dark:bg-[#0C111D] dark:hover:bg-[#0C111D]/60 px-3 py-2 rounded-lg transition-all">Services</Link>
        <Link href={"/admin/features"} className="block w-full text-black dark:text-white bg-[#FFFFFF] bg-[#FFFFFF]/40 dark:bg-[#0C111D] dark:hover:bg-[#0C111D]/60 px-3 py-2 rounded-lg transition-all">Features</Link>
        <Link href={"/admin/clients"} className="block w-full text-black dark:text-white bg-[#FFFFFF] bg-[#FFFFFF]/40 dark:bg-[#0C111D] dark:hover:bg-[#0C111D]/60 px-3 py-2 rounded-lg transition-all">Clients</Link>
        <Link href={"/admin/partners"} className="block w-full text-black dark:text-white bg-[#FFFFFF] bg-[#FFFFFF]/40 dark:bg-[#0C111D] dark:hover:bg-[#0C111D]/60 px-3 py-2 rounded-lg transition-all">Partners</Link>
      </div>
    </aside>
  )
};

export default Sidebar;