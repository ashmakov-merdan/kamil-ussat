import { Logo } from "@/shared";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="mx-auto container pt-16 pb-12 space-y-16">
      <div className="space-y-8">
        <div>
          <Logo />
        </div>
        <div className="inline-flex gap-x-8">
          <a className="text-[#94969C] font-semibold">WhatsApp</a>
          <a className="text-[#94969C] font-semibold">Telegram</a>
          <a className="text-[#94969C] font-semibold">Instagram</a>
          <a className="text-[#94969C] font-semibold">Github</a>
          <a className="text-[#94969C] font-semibold">Help</a>
          <a className="text-[#94969C] font-semibold">LinkedIn</a>
        </div>
      </div>
      <div className="pt-8 flex justify-between items-center border-t-[1px] border-[#1F242F]">
        <p className="text-[#94969C]">© 2077 Kamil ussat All rights reserved.</p>
        <div className="inline-flex gap-x-4">
          <a className="text-[#94969C]">Terms</a>
          <a className="text-[#94969C]">Privacy</a>
          <a className="text-[#94969C]">Cookies</a>
        </div>
      </div>
    </footer>
  )
};

export default Footer;