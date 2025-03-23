"use client"
import useLogout from "@/api/queries/auth/use-logout";
import { useAuthStore } from "@/store";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { FC } from "react";

const Avatar: FC = () => {
  const { user } = useAuthStore();
  const { onSubmit } = useLogout();

  return (
    <Menu>
      <MenuButton>
        <div className="size-10 rounded-full border border-white/10 bg-red-500 grid place-items-center z-50">
          <p className="text-white">M</p>
        </div>
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className={"hidden xl:block w-36 origin-top-left rounded-xl border border-white/5 bg-[#F2F4F7] dark:bg-white/20 p-1 text-sm/6  dark:text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-50"}
      >
        {user?.is_super_user && <MenuItem>
          <div className="w-full">
            <Link href={"/admin"} className="block w-full px-3 py-2 text-black hover:text-[#7F56D9] dark:text-white dark:hover:text-black hover:bg-white/30 rounded-lg">Dashboard</Link>
          </div>
        </MenuItem>}
        <MenuItem>
          <button onClick={onSubmit} className="w-full block px-3 py-2 text-left text-black hover:text-[#7F56D9] dark:text-white dark:hover:text-black hover:bg-white/30 rounded-lg">
            Logout
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
};

export default Avatar;