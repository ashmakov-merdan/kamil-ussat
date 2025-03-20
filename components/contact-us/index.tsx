"use client"
import { Heading, Tag } from "@/shared";
import Checkbox from "@/shared/checkbox";
import { cn } from "@/utils";
import Image from "next/image";
import { FC } from "react";
import { MarkerIcon, PhoneIcon } from "../icons";

const ContactUs: FC = () => {
  return (
    <section id="contact-us" className="px-4 xl:px-0 py-24 container mx-auto">
      <div className="flex flex-row gap-x-10">
        <div className="hidden lg:block flex-1 space-y-8">
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
        <div className="flex-1 space-y-12">
          <div className="space-y-12">
            <div className="space-y-5">
              <Heading text="Let's start your project" isCentered={false} />
              <p className="text-xl font-normal text-[#94969C]">Our friendly team would love to hear from you.</p>
            </div>
            <form className="max-w-xl flex flex-col gap-y-6">
              <div className="flex flex-row gap-x-8">
                <div className="flex-1 flex flex-col gap-y-1.5">
                  <label className="text-sm text-[#CECFD2] font-medium">First name</label>
                  <input
                    className="bg-transparent p-2.5 outline-none border rounded-lg border-[#333741]"
                    placeholder="John"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-y-1.5">
                  <label className="text-sm text-[#CECFD2] font-medium">Last name</label>
                  <input
                    className="p-2.5 bg-transparent outline-none border rounded-lg border-[#333741]"
                    placeholder="Doe" />
                </div>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <label className="text-sm text-[#CECFD2] font-medium">E-mail</label>
                <input
                  className="p-2.5 bg-transparent outline-none border rounded-lg border-[#333741]"
                  placeholder="johndoe@example.com" />
              </div>
              <div className="flex-1 flex flex-col gap-y-1.5">
                <label htmlFor="" className="text-sm text-[#CECFD2] font-medium">Message</label>
                <textarea
                  className="p-2.5 bg-transparent outline-none border rounded-lg border-[#333741] resize-none"
                  rows={10}
                ></textarea>
              </div>
              <div className="space-y-6">
                <h1 className={cn("text-xl md:text-2xl font-semibold text-[#101828] dark:text-[#F5F5F6]")}>Choose service what you need</h1>
                <div className="flex flex-wrap gap-4">
                  <Tag text={"Networking"} />
                  <Tag text={"Software Development"} />
                  <Tag text={"Back-end Development"} />
                  <Tag text={"Front-end Development"} />
                  <Tag text={"Mobile Application Development"} />
                  <Tag text={"SMM"} />
                </div>
              </div>
              <div className="">
                <button type={"submit"} className="w-full py-3 border border-[#7F56D9] hover:bg-[#7F56D9]/80  bg-[#7F56D9] rounded-lg text-base font-semibold transition-colors">Send message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
};

export default ContactUs;