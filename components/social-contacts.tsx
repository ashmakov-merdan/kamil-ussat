import { FC } from "react";
import { useContacts } from "@/api/queries/contacts";
import { getContactIcon } from "@/utils/contact-utils";
import { ContactTypeValues } from "@/validations/contact";

interface SocialContactsProps {
  className?: string;
}

interface IContactResponse {
  id: number;
  link: string;
  type: ContactTypeValues;
  priority: number;
  is_active: boolean;
}

const SocialContacts: FC<SocialContactsProps> = ({ className = "" }) => {
  const { data, isLoading } = useContacts();
  
  if (isLoading || !data) {
    return null;
  }
  
  // Get contacts from response
  const contacts: IContactResponse[] = data.payload || [];
  
  // Get only social media contacts (not phone or address)
  const socialTypes = ["instagram", "github", "telegram", "whatsapp", "facebook"];
  const socialContacts = contacts
    .filter(contact => socialTypes.includes(contact.type) && contact.is_active)
    .sort((a, b) => a.priority - b.priority);
  
  if (!socialContacts.length) {
    return null;
  }
  
  return (
    <div className={`inline-flex gap-x-7 lg:gap-x-4 ${className}`}>
      {socialContacts.map((contact) => (
        <a 
          key={contact.id}
          href={contact.link} 
          target="_blank"
          title={contact.type}
          className="size-12 bg-[#F2F4F7] transition-colors hover:bg-purple-200 dark:hover:bg-[#7F56D9] dark:bg-[#1F242F] rounded-full flex justify-center items-center cursor-pointer"
        >
          {getContactIcon(contact.type)}
        </a>
      ))}
    </div>
  );
};

export default SocialContacts; 