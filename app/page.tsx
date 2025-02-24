import { Companies, Features, Header, Navigation, Products, Services } from "@/components";

export default function Home() {
  return (
    <main className="">
      <Navigation />
      <Header />
      <Features />
      <Products />
      <Services />
      <Companies />
    </main>
  );
}
