'use client'
import { Avatar, Button, Logo } from "@/shared";
import SwitchTheme from "@/shared/switch-theme";
import { FC, Fragment } from "react";
import Links from "./links";
import Link from "next/link";
import { useAuthStore } from "@/store";

const Navigation: FC = () => {
  const { user } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-[#0C111D] py-5 z-[5]">
      <div className="px-4 2xl:px-0 container mx-auto flex justify-between items-center gap-x-10">
        <Link href={"/"} className="w-fit">
          <Logo />
        </Link>
        <Links />
        <div className="max-sm:hidden inline-flex items-center gap-x-3">
          {!user && <Fragment>
            <Button label="Login" variant={"flat"} onClick={() => console.log("Login")} />
            <Button label="Sign Up" onClick={() => console.log("Sign up")} />
          </Fragment>}
          <div className="max-lg:hidden">
            <SwitchTheme />
          </div>
          {user && <Avatar />}
        </div>
      </div>
    </nav>
  )
};

export default Navigation;