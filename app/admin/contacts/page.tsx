"use client"
import { FC, useState, useCallback } from "react";
import { ContactTypeValues, ContactValues } from "@/validations/contact";
import { useContacts, useDelete } from "@/api/queries/contacts";
import { getContactIcon, getContactLabel } from "@/utils/contact-utils";
import { useTranslations } from "next-intl";
import { Pencil, Trash2 } from "lucide-react";
import ContactForm from "./components/contact-form";

interface IContactResponse {
  id: number;
  link: string;
  type: ContactTypeValues;
  priority: number;
  is_active: boolean;
}

const ContactsPage: FC = () => {
  const { data, isLoading, refetch } = useContacts();
  const { onDelete } = useDelete();
  const [editingContact, setEditingContact] = useState<{ id: number, data: ContactValues } | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const t = useTranslations();
  
  const contacts: IContactResponse[] = data?.payload || [];
  
  const handleEdit = (id: number, contactData: IContactResponse) => {
    setEditingContact({ 
      id, 
      data: {
        link: contactData.link,
        type: contactData.type,
        priority: contactData.priority,
        is_active: contactData.is_active
      } 
    });
    setIsAddingNew(false);
  };
  
  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingContact(null);
  };
  
  const handleCancelEdit = () => {
    setEditingContact(null);
    setIsAddingNew(false);
  };
  
  const handleSuccessfulSubmit = useCallback(() => {
    setEditingContact(null);
    setIsAddingNew(false);
    refetch();
  }, [refetch]);
  
  const formatLinkForDisplay = (contact: IContactResponse) => {
    const { type, link } = contact;
    
    switch (type) {
      case "phonenumber":
        return (
          <a href={`tel:${link.replace(/\s/g, "")}`} className="text-blue-600 hover:underline">
            {link}
          </a>
        );
      case "address":
        return (
          <a 
            href={link.startsWith("http") ? link : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(link)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {link}
          </a>
        );
      default:
        const displayUrl = (() => {
          try {
            if (link.startsWith("http")) {
              return new URL(link).hostname.replace("www.", "");
            }
            return link;
          } catch {
            return link;
          }
        })();
        
        return (
          <a 
            href={link.startsWith("http") ? link : `https://${link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {displayUrl}
          </a>
        );
    }
  };
  
  return (
    <section id="contacts" className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">Manage Contacts</h1>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Add New Contact
        </button>
      </div>
      
      {isAddingNew && (
        <div className="mb-8 p-4 border border-neutral-200 dark:border-neutral-700 rounded-md bg-transparent">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Add New Contact</h2>
          <ContactForm 
            onCancel={handleCancelEdit}
            onSuccess={handleSuccessfulSubmit}
          />
        </div>
      )}
      
      {editingContact && (
        <div className="mb-8 p-4 border rounded-md border-neutral-200 dark:border-neutral-700 bg-transparent">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Edit Contact</h2>
          <ContactForm
            contactId={editingContact.id}
            initialData={editingContact.data}
            onCancel={handleCancelEdit}
            onSuccess={handleSuccessfulSubmit}
          />
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-slate-900 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : contacts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No contacts found
                </td>
              </tr>
            ) : (
              contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-slate-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="mr-2 text-black dark:text-white">{getContactIcon(contact.type)}</span>
                      <span className="font-medium text-black dark:text-white">{getContactLabel(contact.type)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatLinkForDisplay(contact)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contact.priority}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      contact.is_active 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {contact.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(contact.id, contact)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(contact.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ContactsPage;