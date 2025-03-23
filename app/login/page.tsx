import { Login, Navigation } from "@/components";
import { FC } from "react";

const LoginPage: FC = () => {
  return (
    <main>
      <Navigation />
      <section id={"login"} className="px-4 lg:min-h-svh container mx-auto pt-20 lg:pt-24">
        <Login />
      </section>
    </main>
  )
};

export default LoginPage;