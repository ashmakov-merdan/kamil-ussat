'use client'
import { Avatar, Button, Logo } from "@/shared";
import SwitchTheme from "@/shared/switch-theme";
import { FC, Fragment, useMemo } from "react";
import Links from "./links";
import Link from "next/link";
import { useAuthStore } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils";

const Navigation: FC = () => {
  const pathname = usePathname();
  const isAuthPage = useMemo(() => pathname === "/login" || pathname === "/register", [pathname]);
  const { user } = useAuthStore();
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-[#0C111D] py-3 lg:py-5 z-[5]">
      <div className={cn(
        "px-4 2xl:px-0 container mx-auto flex justify-between items-center gap-x-10",
        isAuthPage ? "justify-end" : "justify-between"
      )}>
        {!isAuthPage && <Link href={"/"}>
          <Logo className="w-32 lg:w-44" />
        </Link>}
        {!isAuthPage && <Links />}
        <div className="max-sm:hidden inline-flex items-center gap-x-3">
          {!isAuthPage && !user && <Fragment>
            <Button label="Login" variant={"flat"} onClick={() => router.push("/login")} />
            <Button label="Sign Up" onClick={() => console.log("Sign up")} />
          </Fragment>}
          <div className="max-lg:hidden">
            <SwitchTheme />
          </div>
          {!isAuthPage && user && <Avatar />}
        </div>
      </div>
    </nav>
  )
};

export default Navigation;