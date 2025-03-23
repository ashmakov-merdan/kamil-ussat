import { useTranslations } from "next-intl";
import Link from "next/link";
import { FC } from "react";

const Sidebar: FC = () => {
  const t = useTranslations();

  return (
    <aside className="hidden xl:block px-4 py-6 md:py-8 w-full h-auto md:sticky md:top-24 md:h-fit md:min-w-64 bg-[#F2F4F7] dark:bg-[#161B26] rounded-lg overflow-hidden">
      <div className="flex flex-row md:flex-col gap-x-2 gap-y-1 overflow-x-auto md:overflow-visible">
        <Link href={"/admin/users"} className="block whitespace-nowrap w-full text-black dark:text-white bg-[#FFFFFF] bg-[#FFFFFF]/40 dark:bg-[#0C111D] dark:hover:bg-[#0C111D]/60 px-3 py-2 rounded-lg transition-all">{t("section.users")}</Link>
        <Link href={"/admin/services"} className="block whitespace-nowrap w-full text-black dark:text-white bg-[#FFFFFF] bg-[#FFFFFF]/40 dark:bg-[#0C111D] dark:hover:bg-[#0C111D]/60 px-3 py-2 rounded-lg transition-all">{t("section.features")}</Link>
        <Link href={"/admin/features"} className="block whitespace-nowrap w-full text-black dark:text-white bg-[#FFFFFF] bg-[#FFFFFF]/40 dark:bg-[#0C111D] dark:hover:bg-[#0C111D]/60 px-3 py-2 rounded-lg transition-all">{t("section.services")}</Link>
        <Link href={"/admin/tools"} className="block whitespace-nowrap w-full text-black dark:text-white bg-[#FFFFFF] bg-[#FFFFFF]/40 dark:bg-[#0C111D] dark:hover:bg-[#0C111D]/60 px-3 py-2 rounded-lg transition-all">{t("section.tools")}</Link>
        <Link href={"/admin/clients"} className="block whitespace-nowrap w-full text-black dark:text-white bg-[#FFFFFF] bg-[#FFFFFF]/40 dark:bg-[#0C111D] dark:hover:bg-[#0C111D]/60 px-3 py-2 rounded-lg transition-all">{t("section.clients")}</Link>
        <Link href={"/admin/partners"} className="block whitespace-nowrap w-full text-black dark:text-white bg-[#FFFFFF] bg-[#FFFFFF]/40 dark:bg-[#0C111D] dark:hover:bg-[#0C111D]/60 px-3 py-2 rounded-lg transition-all">{t("section.partners")}</Link>
        <Link href={"/admin/orders"} className="block whitespace-nowrap w-full text-black dark:text-white bg-[#FFFFFF] bg-[#FFFFFF]/40 dark:bg-[#0C111D] dark:hover:bg-[#0C111D]/60 px-3 py-2 rounded-lg transition-all">{t("section.orders")}</Link>
      </div>
    </aside>
  )
};

export default Sidebar;