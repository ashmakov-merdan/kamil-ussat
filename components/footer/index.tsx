"use client"
import { Logo } from "@/shared";
import Image from "next/image";
import { FC } from "react";
import Links from "../navigation/links";
import github from "@/assets/social-media/github.svg"
import facebook from "@/assets/social-media/facebook.svg"
import whatsapp from "@/assets/social-media/whatsapp.svg"
import telegram from "@/assets/social-media/telegram.svg"
import instagram from "@/assets/social-media/instagram.svg"

const Footer: FC = () => {
  return (
    <footer className="px-4 xl:px-0 mx-auto container pt-16 pb-12 space-y-8">
      <div className="space-y-10 lg:space-y-4 ">
        <div>
          <Logo />
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-y-12 lg:items-center">
          <Links />
          <div className="inline-flex gap-x-7 lg:gap-x-4">
            <a className="size-12 bg-[#F2F4F7] dark:bg-[#1F242F] rounded-full flex justify-center items-center">
              <Image
                width={24}
                height={24}
                src={github}
                alt={"github"}
              />
            </a>
            <a className="size-12 bg-[#F2F4F7] dark:bg-[#1F242F] rounded-full flex justify-center items-center">
              <Image
                width={24}
                height={24}
                src={facebook}
                alt={"facebook"}
              />
            </a>
            <a className="size-12 bg-[#F2F4F7] dark:bg-[#1F242F] rounded-full flex justify-center items-center">
              <Image
                width={24}
                height={24}
                src={whatsapp}
                alt={"whatsapp"}
              />
            </a>
            <a className="size-12 bg-[#F2F4F7] dark:bg-[#1F242F] rounded-full flex justify-center items-center">
              <Image
                width={24}
                height={24}
                src={telegram}
                alt={"telegram"}
              />
            </a>
            <a className="size-12 bg-[#F2F4F7] dark:bg-[#1F242F] rounded-full flex justify-center items-center">
              <Image
                width={24}
                height={24}
                src={instagram}
                alt={"instagram"}
              />
            </a>
          </div>
        </div>
      </div>
      <div className="pt-8 flex flex-col lg:flex-row justify-between items-center gap-4 border-t-[1px] border-[#1F242F]">
        <p className="text-nowrap text-[#667085] dark:text-[#94969C] text-sm lg:text-base">© 2077 Kamil ussat All rights reserved.</p>
        <div className="inline-flex gap-x-4">
          <a className="text-[#667085] dark:text-[#94969C] text-sm lg:text-base">Terms</a>
          <a className="text-[#667085] dark:text-[#94969C] text-sm lg:text-base">Privacy</a>
          <a className="text-[#667085] dark:text-[#94969C] text-sm lg:text-base">Cookies</a>
        </div>
      </div>
    </footer>
  )
};

export default Footer;