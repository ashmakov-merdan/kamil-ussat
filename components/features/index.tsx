import { FeatureCard, Title } from "@/shared";
import { FC } from "react";

const Features: FC = () => {
  return (
    <section id={'features'} className="px-4 xl:px-0 container mx-auto py-10 md:py-24 flex flex-col gap-y-16">
      <div className="flex flex-col gap-y-3 md:gap-y-5">
        <Title
          title="Features"
          desc="Comprehensive IT & Development Solutions"
        />
        <div className="lg:max-w-3xl w-full mx-auto lg:px-12">
          <p className="text-base sm:text-[18px] md:text-xl font-normal text-[#94969C] text-center">Providing scalable, secure, and high-performance solutions for software, networking, and security needs.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          title="Software development"
          desc="We provide end-to-end software development services, including web and desktop applications, ensuring scalable and high-performing solutions tailored to your business needs."
        />
        <FeatureCard
          title="Backend development"
          desc="Our back-end development services focus on building secure, scalable, and high-performance server-side applications, APIs, and databases to power your digital platforms."
        />
        <FeatureCard
          title="Frontend development"
          desc="We create visually appealing and user-friendly front-end interfaces using modern technologies, ensuring seamless user experiences across devices."
        />
        <FeatureCard
          title="App development"
          desc="From iOS to Android, we develop high-quality mobile applications with intuitive designs, smooth functionality, and optimized performance for a great user experience."
        />
        <FeatureCard
          title="Security Camera Installation"
          desc="We offer professional security camera installation services, providing high-quality surveillance solutions to ensure safety and security for homes and businesses"
        />
        <FeatureCard
          title="Networking"
          desc="We design and implement robust network infrastructures, ensuring secure, scalable, and high-speed connectivity for businesses of all sizes."
        />
      </div>
    </section>
  )
};

export default Features;