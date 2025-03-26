import { Companies, ContactUs, Features, Footer, Header, Navigation, Products, Services, Tools } from "@/components";

export default function Home() {
  return (
    <main className="">
      <Navigation />
      <Header />
      <Features />
      <Services />
      <Tools />
      <Products /> 
      <Companies />
      <ContactUs />
      <Footer />
    </main>
  );
}
