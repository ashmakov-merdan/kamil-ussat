import { Companies, ContactUs, Features, Footer, Header, Navigation, Services } from "@/components";

export default function Home() {
  return (
    <main className="">
      <Navigation />
      <Header />
      <Features />
      {/* <Products /> */}
      <Services />
      <Companies />
      <ContactUs />
      <Footer />
    </main>
  );
}
