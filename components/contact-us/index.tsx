import { Heading, Tag } from "@/shared";
import Checkbox from "@/shared/checkbox";
import { FC } from "react";

const ContactUs: FC = () => {
  return (
    <section id="contact-us" className="py-24 container mx-auto">
      <div className="flex flex-row gap-x-24">
        <div className="flex-1 space-y-12">
          <div className="space-y-5">
            <Heading text="Let's start your project" />
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
            <div className="flex-1 flex flex-col gap-y-1.5">
              <label htmlFor="" className="text-sm text-[#CECFD2] font-medium">Message</label>
              <textarea
                className="p-2.5 bg-transparent outline-none border rounded-lg border-[#333741] resize-none"
                rows={10}
              ></textarea>
            </div>
            <Checkbox
              label="You agree to our friendly privacy policy"
            />
            <div className="">
              <button type={"submit"} className="w-full py-3 border border-[#7F56D9] hover:bg-[#7F56D9]/80  bg-[#7F56D9] rounded-lg text-base font-semibold transition-colors">Send message</button>
            </div>
          </form>
        </div>
        <div className="flex-1 space-y-12">
          <Heading text="Choose service that you need" />
          <div className="flex flex-wrap gap-4">
            <Tag text={"Networking"} />
            <Tag text={"Software Development"} />
            <Tag text={"Back-end Development"} />
            <Tag text={"Front-end Development"} />
            <Tag text={"Mobile Application Development"} />
            <Tag text={"SMM"} />
          </div>
        </div>
      </div>
    </section>
  )
};

export default ContactUs;