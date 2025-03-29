import { FacebookLogo, GithubLogo, InstagramLogo, MarkerIcon, PhoneIcon, TelegramIcon, WhatsAppLogo } from "@/components/icons";
import { ContactTypeValues } from "@/validations/contact";
import { ReactNode } from "react";

export const getContactIcon = (type: ContactTypeValues): ReactNode => {
  switch (type) {
    case "instagram":
      return <InstagramLogo />;
    case "github":
      return <GithubLogo />;
    case "telegram":
      return <TelegramIcon />;
    case "whatsapp":
      return <WhatsAppLogo />;
    case "facebook":
      return <FacebookLogo />;
    case "address":
      return <MarkerIcon />;
    case "phonenumber":
      return <PhoneIcon />;
    default:
      return null;
  }
};

export const getContactLabel = (type: ContactTypeValues): string => {
  switch (type) {
    case "instagram":
      return "Instagram";
    case "github":
      return "GitHub";
    case "telegram":
      return "Telegram";
    case "whatsapp":
      return "WhatsApp";
    case "facebook":
      return "Facebook";
    case "address":
      return "Address";
    case "phonenumber":
      return "Phone";
    default:
      return "";
  }
}; 