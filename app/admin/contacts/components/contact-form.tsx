"use client"
import { FC, useEffect, useState } from "react";
import { useCreate, useUpdate } from "@/api/queries/contacts";
import { ContactTypeValues, ContactValues } from "@/validations/contact";
import { Input } from "@/shared";
import { Controller } from "react-hook-form";

interface ContactFormProps {
  contactId?: number;
  initialData?: ContactValues;
  onCancel: () => void;
  onSuccess?: () => void;
}

const ContactForm: FC<ContactFormProps> = ({ contactId, initialData, onCancel, onSuccess }) => {
  const isEditing = !!contactId;
  const [selectedType, setSelectedType] = useState<ContactTypeValues>(initialData?.type || "instagram");

  const { isPending: isCreating, onCreate, methods: createMethods } = useCreate({
    onSuccess: () => {
      if (onSuccess) onSuccess();
      onCancel();
    }
  });

  const { methods: updateMethods, onUpdate, isPending: isUpdating } = useUpdate(
    contactId,
    initialData,
    {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        onCancel();
      }
    }
  );

  const methods = isEditing ? updateMethods : createMethods;
  const { control } = methods;
  const isPending = isEditing ? isUpdating : isCreating;

  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name === 'type' && value.type) {
        setSelectedType(value.type as ContactTypeValues);
      }
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  const getInputConfig = () => {
    switch (selectedType) {
      case "phonenumber":
        return {
          type: "tel",
          placeholder: "+123 456 7890",
          label: "Phone Number"
        };
      case "address":
        return {
          type: "text",
          placeholder: "123 Main St, City, Country",
          label: "Address"
        };
      default:
        return {
          type: "url",
          placeholder: "https://example.com",
          label: "Link"
        };
    }
  };

  const inputConfig = getInputConfig();

  return (
    <form
      onSubmit={isEditing ? onUpdate : onCreate}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Contact Type
        </label>
        <select
          {...methods.register("type")}
          className="mt-1 block w-full px-3.5 py-2.5 text-base bg-transparent border text-black dark:text-white border-[#EAECF0] dark:border-[#1F242F] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="instagram">Instagram</option>
          <option value="github">GitHub</option>
          <option value="telegram">Telegram</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="facebook">Facebook</option>
          <option value="address">Address</option>
          <option value="phonenumber">Phone Number</option>
        </select>
        {methods.formState.errors.type && (
          <p className="mt-1 text-sm text-red-600">{methods.formState.errors.type.message}</p>
        )}
      </div>

      <div>
        <Controller
          control={control}
          name="link"
          render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
            <Input
              id="contact-link"
              label={inputConfig.label}
              type={inputConfig.type}
              defaultValue={value}
              onChange={onChange}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
      </div>

      <div>
        <Controller
          control={control}
          name="priority"
          render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
            <Input
              id="contact-priority"
              label="Priority"
              type="number"
              defaultValue={value?.toString() || "1"}
              onChange={(e) => {
                const numValue = parseInt(e.target.value, 10);
                onChange(isNaN(numValue) ? 1 : numValue);
              }}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            {...methods.register("is_active")}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded dark:bg-slate-700 dark:border-slate-600"
          />
        </div>
        <div className="ml-3 text-sm">
          <label className="font-medium text-gray-700 dark:text-gray-200">
            Active
          </label>
          <p className="text-gray-500 dark:text-gray-400">Display this contact on the website</p>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white dark:border-slate-600 dark:hover:bg-slate-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-indigo-700 dark:hover:bg-indigo-600"
        >
          {isPending ? 'Saving...' : isEditing ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm; 