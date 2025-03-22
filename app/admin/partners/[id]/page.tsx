"use client"
import { useUpdate } from "@/api/queries/partners";
import Uploader from "@/components/uploader";
import { Fields } from "@/constants/fields";
import { Button, Input } from "@/shared";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Controller, FormProvider } from "react-hook-form";

const fields = new Fields();

const UpdatePartnerPage: FC = () => {
  const router = useRouter();
  const { methods, onSubmit, isPending, isLoading } = useUpdate();
  const { control } = methods;

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 bg-transparent rounded-lg border border-[#EAECF0] dark:border-[#1F242F]">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="p-6 space-y-6 bg-transparent rounded-lg border border-[#EAECF0] dark:border-[#1F242F]">
        <div className="space-y-6">
          <div className="flex lg:flex-row gap-x-4">
            {fields.features.map((field, idx) => (
              field.name && field.name.map((nameField, nameIdx) => (
                <Controller
                  key={`name-${idx}-${nameIdx}`}
                  control={control}
                  name={nameField.name as "name.tk" | "name.ru" | "name.en"}
                  render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                    <div className="flex-1">
                      <Input
                        id={nameField.name}
                        label={nameField.label}
                        defaultValue={value as string}
                        onChange={onChange}
                        isInvalid={invalid}
                        errorMessage={error?.message ? error.message : ""}
                      />
                    </div>
                  )}
                />
              ))
            ))}
          </div>

          <div className="flex lg:flex-row gap-x-4">
            {fields.features.map((field, idx) => (
              field.desription && field.desription.map((descField, descIdx) => (
                <Controller
                  key={`desc-${idx}-${descIdx}`}
                  control={control}
                  name={descField.name as "description.tk" | "description.ru" | "description.en"}
                  render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                    <div className="flex-1">
                      <Input
                        id={descField.name}
                        label={descField.label}
                        defaultValue={value}
                        onChange={onChange}
                        isInvalid={invalid}
                        errorMessage={error?.message ? error.message : ""}
                      />
                    </div>
                  )}
                />
              ))
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="is_active"
            render={({ field: { value, onChange } }) => (
              <>
                <input
                  type="checkbox"
                  id="is_active"
                  checked={value}
                  onChange={onChange}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-[#344054] dark:text-[#CECFD2]">
                  Active
                </label>
              </>
            )}
          />
        </div>

        <div className="border-t border-[#EAECF0] dark:border-[#1F242F] pt-6">
          <h3 className="text-base font-semibold mb-3 text-[#344054] dark:text-[#CECFD2]">Partner Logo</h3>
          <Uploader />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            label="Cancel"
            variant={"light"}
            onClick={() => router.back()}
          />
          <Button
            label={isPending ? "Saving..." : "Save Changes"}
            type="submit"
            disabled={isPending}
          />
        </div>
      </form>
    </FormProvider >
  );
};

export default UpdatePartnerPage; 