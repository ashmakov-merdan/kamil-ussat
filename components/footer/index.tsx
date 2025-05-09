"use client"
import { Logo } from "@/shared";
import { FC } from "react";
import Links from "../navigation/links";
import moment from "moment";
import SocialContacts from "../social-contacts";
import { useTranslations } from "next-intl";

const Footer: FC = () => {
  const currentYear = moment().format("YYYY");
  const t = useTranslations();

  return (
    <footer className="px-4 xl:px-0 mx-auto container pt-16 pb-12 space-y-8">
      <div className="space-y-10 lg:space-y-4 ">
        <div>
          <Logo className="w-32 lg:w-36" />
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-y-12 lg:items-center">
          <Links />
          <SocialContacts />
        </div>
      </div>
      <div className="pt-8 flex flex-col lg:flex-row justify-between items-center gap-4 border-t-[1px] border-[#1F242F]">
        <p className="text-nowrap text-[#667085] dark:text-[#94969C] text-sm lg:text-base">© {currentYear} Kamil Ussat. {t("footer.rights")}.</p>
        <div className="inline-flex gap-x-4">
          <a className="text-[#667085] dark:text-[#94969C] text-sm lg:text-base">{t("footer.terms")}</a>
          <a className="text-[#667085] dark:text-[#94969C] text-sm lg:text-base">{t("footer.privacy")}</a>
        </div>
      </div>
    </footer>
  )
};

export default Footer;