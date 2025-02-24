import { Heading, Shadow } from "@/shared";
import Carousel from "@/shared/carousel";
import { FC } from "react";

const Companies: FC = () => {
  return (
    <section id={"collaborates"} className="bg-[#161B26] py-12">
      <div className="relative container mx-auto">
        <Shadow className="w-96 from-[#161B26]" />
        <div className="text-center">
          <Heading text="Companies that we collaborate" />
        </div>
        <div className="pt-16">
          <Carousel />
        </div>
      </div>
    </section>
  )
};

export default Companies;