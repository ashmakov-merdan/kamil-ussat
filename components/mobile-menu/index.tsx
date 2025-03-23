"use client"
import { FC, useState } from "react";
import Link from "next/link";
import LanguageDropdown from "../../shared/language-dropdown";
import { useTranslations } from "next-intl";
import SwitchTheme from "@/shared/switch-theme";
import { Avatar, Button } from "@/shared";
import { useAuthStore } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "@/api/queries/auth";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "features", href: "#features" },
  { label: "products", href: "#products" },
  { label: "services", href: "#services" },
  { label: "contact-us", href: "#contact-us" }
];

const adminLinks: NavLink[] = [
  { label: "users", href: "/admin/users" },
  { label: "features", href: "/admin/services" },
  { label: "services", href: "/admin/features" },
  { label: "clients", href: "/admin/clients" },
  { label: "partners", href: "/admin/partners" }
];

const MobileMenu: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = pathname.includes("/login") || pathname.includes("/register");
  const isAdminPage = pathname.startsWith("/admin");
  const { onSubmit } = useLogout();
  const { user } = useAuthStore();
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="xl:hidden">
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-gray-800 dark:bg-gray-300 transition-transform duration-300 ease-in-out ${isOpen ? 'transform rotate-45 translate-y-2' : ''
            }`}
        />
        <span
          className={`block w-6 h-0.5 bg-gray-800 dark:bg-gray-300 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'
            }`}
        />
        <span
          className={`block w-6 h-0.5 bg-gray-800 dark:bg-gray-300 transition-transform duration-300 ease-in-out ${isOpen ? 'transform -rotate-45 -translate-y-2' : ''
            }`}
        />
      </button>

      <div
        className={`fixed top-0 right-0 h-full z-50 bg-white dark:bg-[#161B26] shadow-lg w-4/5 max-w-sm transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center p-4">
          <button
            onClick={toggleMenu}
            className="text-gray-800 dark:text-gray-300"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="sm:hidden inline-flex items-center gap-3">
            <SwitchTheme />
            {user ? <Avatar /> : <Button label={t("button.login")} variant={"flat"} onClick={() => router.push("/login")} />}
          </div>
        </div>

        <div className="flex flex-col px-8 py-6 space-y-8">
          {isAdminPage ? (
            adminLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="text-lg font-medium text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                onClick={toggleMenu}
              >
                {t(`section.${link.label}`)}
              </Link>
            ))
          ) : (
            navLinks.map((link) => (
              <Link
                href={isAuthPage ? "/" : link.href}
                key={link.href}
                className="text-lg font-medium text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                onClick={toggleMenu}
              >
                {t(`section.${link.label}`)}
              </Link>
            ))
          )}
          <div className="space-y-3">
            {(user && user.role === "admin") && !pathname.includes("/admin") && <div>
              <Button
                variant={"primary"}
                className="w-full"
                label={t("button.dashboard")}
                onClick={() => router.push("/admin")}
              />
            </div>}
            {user && <div className="w-full">
              <Button
                variant={"light"}
                className="w-full"
                label={t("button.logout")}
                onClick={onSubmit}
              />
            </div>}
          </div>
          <div className="mt-6">
            <LanguageDropdown />
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={toggleMenu}
      />
    </div>
  );
};

export default MobileMenu;