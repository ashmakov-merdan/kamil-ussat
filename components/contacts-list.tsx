import { FC } from "react";
import ContactItem from "./contact-item";
import { useTranslations } from "next-intl";
import { ContactTypeValues } from "@/validations/contact";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";

interface ContactsListProps {
  className?: string;
}

interface IContactResponse {
  id: number;
  link: string;
  type: ContactTypeValues;
  priority: number;
  is_active: boolean;
}

const ContactsList: FC<ContactsListProps> = ({ className = "" }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await api.get("/contacts", {
        params: {
          limit: 50,
          page: 1,
          order_direction: "desc",
          order_by: "priority"
        }
      });
      return res.data;
    }
  })
  const t = useTranslations("contact");

  if (isLoading || !data) {
    return null;
  }

  const contacts: IContactResponse[] = data.payload || [];

  const sortedContacts = [...contacts].sort((a, b) => a.priority - b.priority);

  const activeContacts = sortedContacts.filter(contact => contact.is_active);

  if (!activeContacts.length) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {activeContacts.slice(0, 2).map((contact) => (
        <ContactItem
          key={contact.id}
          type={contact.type}
          link={contact.link}
          label={contact.type === "address" ? t("address") : contact.type === "phonenumber" ? t("phone") : undefined}
        />
      ))}
    </div>
  );
};

export default ContactsList; 