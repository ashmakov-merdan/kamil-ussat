"use client"
import { FC } from "react";
import LightLogoIcon from "@/assets/logo-icon.svg"
import DarkLogoIcon from "@/assets/dark-logo-icon.svg"
import Image from "next/image";
import Link from "next/link";

const LogoIcon: FC = () => {
  return (
    <Link href={"/"}>
      <Image
        width={64}
        height={64}
        src={LightLogoIcon}
        className="dark:hidden"
        alt={"light-logo"}
      />
      <Image
        width={64}
        height={64}
        src={DarkLogoIcon}
        className="hidden dark:block"
        alt={"light-logo"}
      />
    </Link>
  )
};

export default LogoIcon;