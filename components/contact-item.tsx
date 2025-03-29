import { FC } from "react";
import { getContactIcon, getContactLabel } from "@/utils/contact-utils";
import { ContactTypeValues } from "@/validations/contact";
import { useTranslations } from "next-intl";

interface ContactItemProps {
  type: ContactTypeValues;
  link: string;
  label?: string;
}

const ContactItem: FC<ContactItemProps> = ({ type, link, label }) => {
  const t = useTranslations();
  // Function to generate appropriate href based on contact type
  const getContactHref = () => {
    switch (type) {
      case "phonenumber":
        return `tel:${link.replace(/\s/g, "")}`;
      case "address":
        // Check if the address is already a URL or create a Google Maps link
        return link.startsWith("http") 
          ? link 
          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(link)}`;
      default:
        return link.startsWith("http") ? link : `https://${link}`;
    }
  };

  // Function to format display text based on contact type
  const getDisplayText = () => {
    switch (type) {
      case "instagram":
      case "github":
      case "telegram":
      case "whatsapp":
      case "facebook":
        // For social media, show domain or handle
        try {
          if (link.startsWith("http")) {
            const url = new URL(link);
            return url.hostname.replace("www.", "");
          }
          return link.startsWith("@") ? link : `@${link.split("/").pop() || link}`;
        } catch {
          return link;
        }
      case "phonenumber":
        return `+993 ${link}`
      case "address":
        return t("contact.street")
      default:
        return label || link;
    }
  };

  // Determine if the link should open in a new tab
  const shouldOpenInNewTab = type !== "phonenumber";

  return (
    <div className="flex gap-x-3">
      <div className="size-12 rounded-full flex justify-center items-center bg-[#F2F4F7] dark:bg-[#1F242F]">
        {getContactIcon(type)}
      </div>
      <div className="space-y-1">
        <h2 className="text-[18px] font-semibold text-[#101828] dark:text-[#F5F5F6]">
          {label || getContactLabel(type)}
        </h2>
        <a
          href={getContactHref()}
          target={shouldOpenInNewTab ? "_blank" : "_self"}
          className="font-normal text-[#475467] dark:text-[#94969C] hover:underline"
          rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
        >
          {getDisplayText()}
        </a>
      </div>
    </div>
  );
};

export default ContactItem; 