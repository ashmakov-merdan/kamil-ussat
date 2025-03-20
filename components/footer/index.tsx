"use client"
import { Logo } from "@/shared";
import Image from "next/image";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="px-4 xl:px-0 mx-auto container pt-16 pb-12 space-y-8">
      <div className="space-y-10 lg:space-y-4 ">
        <div>
          <Logo />
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-y-12 lg:items-center">
          <div className="inline-flex  flex-wrap gap-8">
            <a href={"#features"} className="text-[#94969C] font-semibold">Features</a>
            <a href={"#products"} className="text-[#94969C] font-semibold">Products</a>
            <a href={"#services"} className="text-[#94969C] font-semibold">Services</a>
            <a href={"#contact-us"} className="text-[#94969C] font-semibold">Contact Us</a>
          </div>
          <div className="inline-flex gap-x-7 lg:gap-x-4">
            <a className="size-12 bg-[#F2F4F7] dark:bg-[#1F242F] rounded-full flex justify-center items-center">
              <Image
                width={24}
                height={24}
                src={require("@/assets/social-media/github.svg")}
                alt={"github"}
              />
            </a>
            <a className="size-12 bg-[#F2F4F7] dark:bg-[#1F242F] rounded-full flex justify-center items-center">
              <Image
                width={24}
                height={24}
                src={require("@/assets/social-media/facebook.svg")}
                alt={"facebook"}
              />
            </a>
            <a className="size-12 bg-[#F2F4F7] dark:bg-[#1F242F] rounded-full flex justify-center items-center">
              <Image
                width={24}
                height={24}
                src={require("@/assets/social-media/whatsapp.svg")}
                alt={"whatsapp"}
              />
            </a>
            <a className="size-12 bg-[#F2F4F7] dark:bg-[#1F242F] rounded-full flex justify-center items-center">
              <Image
                width={24}
                height={24}
                src={require("@/assets/social-media/telegram.svg")}
                alt={"telegram"}
              />
            </a>
            <a className="size-12 bg-[#F2F4F7] dark:bg-[#1F242F] rounded-full flex justify-center items-center">
              <Image
                width={24}
                height={24}
                src={require("@/assets/social-media/instagram.svg")}
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