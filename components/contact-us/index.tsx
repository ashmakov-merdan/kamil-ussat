"use client"
import { Heading, Tag } from "@/shared";
import { cn } from "@/utils";
import Image from "next/image";
import { FC } from "react";
import { MarkerIcon, PhoneIcon } from "../icons";
import OrderForm from "./order-form";

const ContactUs: FC = () => {
  return (
    <section id="contact-us" className="px-4 xl:px-0 py-24 container mx-auto">
      <div className="relative flex flex-row gap-x-10">
        <div className="hidden lg:block sticky top-24 h-fit flex-1 space-y-8">
          <Image
            src={require("@/assets/contact.jpg")}
            alt={"contact-image"}
          />
          <div className="space-y-6">
            <div className="flex gap-x-3">
              <div className="size-12 rounded-full flex justify-center items-center bg-[#F2F4F7] dark:bg-[#1F242F]">
                <MarkerIcon />
              </div>
              <div className="space-y-1">
                <h2 className="text-[18px] font-semibold text-[#101828] dark:text-[#F5F5F6]">Phone</h2>
                <a href={"tel:+99365123456"} className="font-normal text-[#475467] dark:text-[#94969C]">+993 65123456</a>
              </div>
            </div>
            <div className="flex gap-x-3">
              <div className="size-12 rounded-full flex justify-center items-center bg-[#F2F4F7] dark:bg-[#1F242F]">
                <PhoneIcon />
              </div>
              <div className="space-y-1">
                <h2 className="text-[18px] font-semibold text-[#101828] dark:text-[#F5F5F6]">Phone</h2>
                <a href={"tel:+99365123456"} className="font-normal text-[#475467] dark:text-[#94969C]">+993 65123456</a>
              </div>
            </div>
          </div>
        </div>
        <OrderForm />
      </div>
    </section>
  )
};

export default ContactUs;