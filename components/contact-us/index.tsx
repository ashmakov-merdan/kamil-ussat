"use client"
import Image from "next/image";
import { FC } from "react";
import OrderForm from "./order-form";
import contact from "@/assets/contact.jpg"
import ContactsList from "../contacts-list";

const ContactUs: FC = () => {
  return (
    <section id="contact-us" className="px-4 xl:px-0 py-24 container mx-auto">
      <div className="relative flex flex-col-reverse lg:flex-row gap-x-10">
        <div className="lg:sticky top-24 h-fit flex-1 space-y-8">
          <Image
            width={575}
            height={600}
            className="hidden h-[680px] aspect-[8/16] object-cover lg:block"
            src={contact}
            alt={"contact-image"}
          />
          <ContactsList />
        </div>
        <OrderForm />
      </div>
    </section>
  )
};

export default ContactUs;