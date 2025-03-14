import { Subheading } from "@/shared";
import { FC } from "react";
import boltshift from "@/assets/boltshift.png"
import lightbox from "@/assets/lightbox.png"
import nietzsche from "@/assets/nietzsche.png"
import Image from "next/image";

const clients = [boltshift, lightbox, nietzsche];

const Clients: FC = () => {
  return (
    <div className="px-4 py-8 flex flex-col gap-y-8">
      <div className="flex items-center justify-center">
        <Subheading text="Our clients" />
      </div>
      <div className="flex justify-center items-center gap-x-3 max-w-sm:gap-x-6">
        {clients.map((client, i) => <Image key={i} src={client} alt={`${client}-${i}`} />)}
      </div>
    </div>
  )
};

export default Clients;