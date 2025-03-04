import localFont from "next/font/local";

const inter = localFont({
  variable: "--font-inter",
  src: [
    {
      path: "../assets/fonts/Inter-Bold.ttf",
      weight: "600",
      style: "normal"
    },
    {
      path: "../assets/fonts/Inter-SemiBold.ttf",
      weight: "600",
      style: "normal"
    },
    {
      path: "../assets/fonts/Inter-Medium.ttf",
      weight: "500",
      style: "normal"
    },
    {
      path: "../assets/fonts/Inter-Regular.ttf",
      weight: "400",
      style: "normal"
    }
  ]
});

export default inter;