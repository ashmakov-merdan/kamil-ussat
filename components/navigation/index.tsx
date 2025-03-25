'use client'
import { Avatar, Button, LanguageDropdown, Logo } from "@/shared";
import SwitchTheme from "@/shared/switch-theme";
import { FC, useMemo } from "react";
import Links from "./links";
import Link from "next/link";
import { useAuthStore } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import MobileMenu from "../mobile-menu";

const Navigation: FC = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const isAuthPage = useMemo(() => pathname === "/login" || pathname === "/register" || pathname === "/forgot-password", [pathname]);
  const isAdminPage = useMemo(() => pathname.startsWith("/admin"), [pathname]);
  const { user } = useAuthStore();
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-[#0C111D] py-3 lg:py-5 z-[5]">
      <div className={cn(
        "px-5 container mx-auto flex justify-between items-center gap-x-10",
        isAuthPage ? "justify-end" : "justify-between"
      )}>
        {!isAuthPage && <Link href={"/"}>
          <Logo className="w-32 lg:w-44" />
        </Link>}
        {(!isAuthPage && !isAdminPage) && <Links />}
        <div className="flex items-center gap-2">
          {!isAuthPage && !user && <div className="hidden xl:block">
            <Button label={t("button.login")} variant={"flat"} onClick={() => router.push("/login")} />
          </div>}
          {!isAuthPage && !user && <div className="hidden 2xl:block">
            <Button label={t("button.signup")} onClick={() => router.push("/register")} />
          </div>}
          <div className="hidden md:block">
            <LanguageDropdown />
          </div>
          <div className="hidden md:block">
            <SwitchTheme />
          </div>
          <div className="hidden xl:block">{!isAuthPage && user && <Avatar />}</div>
          <MobileMenu />
        </div>
      </div>
    </nav>
  )
};

export default Navigation;