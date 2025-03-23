import { Navigation, Register } from "@/components";
import { FC } from "react";

const RegisterPage: FC = () => {
  return (
    <main>
      <Navigation />
      <section id={"register"} className="px-4 lg:min-h-svh container mx-auto pt-20 lg:pt-24">
        <Register />
      </section>
    </main>
  )
};

export default RegisterPage;