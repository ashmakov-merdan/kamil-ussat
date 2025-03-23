'use client'
import { Avatar, Button, LanguageDropdown, Logo } from "@/shared";
import SwitchTheme from "@/shared/switch-theme";
import { FC, Fragment, useMemo } from "react";
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
  const isAuthPage = useMemo(() => pathname === "/login" || pathname === "/register", [pathname]);
  const isAdminPage = useMemo(() => pathname.startsWith("/admin"), [pathname]);
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
        {(!isAuthPage && !isAdminPage) && <Links />}
        <div className="flex items-center gap-x-3">
          <div className="max-sm:hidden inline-flex items-center gap-x-3">
            {!isAuthPage && !user && <Fragment>
              <Button label={t("button.login")} variant={"flat"} onClick={() => router.push("/login")} />
              <Button label={t("button.signup")} onClick={() => router.push("/register")} />
            </Fragment>}
            <div className="max-sm:hidden flex gap-x-2">
              <LanguageDropdown />
              <SwitchTheme />
            </div>
          </div>
          <div className="max-sm:hidden">{!isAuthPage && user && <Avatar />}</div>
          <MobileMenu />
        </div>
      </div>
    </nav>
  )
};

export default Navigation;