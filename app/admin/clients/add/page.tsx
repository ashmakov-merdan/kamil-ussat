"use client"
import { useCreateClient } from "@/api/queries/clients";
import Uploader from "@/components/uploader";
import { Button, Input } from "@/shared";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Controller, FormProvider } from "react-hook-form";

const ClientAddPage: FC = () => {
  const router = useRouter();
  const { methods, onSubmit, isPending } = useCreateClient();
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="p-6 space-y-6 bg-transparent rounded-lg border border-[#EAECF0] dark:border-[#1F242F]">
        <div className="space-y-6">
          <div className="flex lg:flex-row gap-x-4">
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                <Input
                  id="name"
                  label="Name"
                  defaultValue={value}
                  onChange={onChange}
                  isInvalid={invalid}
                  errorMessage={error?.message ? error.message : ""}
                />
              )}
            />
            <Controller
              control={control}
              name="slug"
              render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                <Input
                  id="slug"
                  label="Slug"
                  defaultValue={value}
                  onChange={onChange}
                  isInvalid={invalid}
                  errorMessage={error?.message ? error.message : ""}
                />
              )}
            />
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
        </div>

        <div className="border-t border-[#EAECF0] dark:border-[#1F242F] pt-6">
          <h3 className="text-base font-semibold mb-3 text-[#344054] dark:text-[#CECFD2]">Client Logo</h3>
          <Uploader />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            label="Cancel"
            variant={"light"}
            onClick={() => router.back()}
          />
          <Button
            label={isPending ? "Saving..." : "Save"}
            type="submit"
            disabled={isPending}
          />
        </div>
      </form>
    </FormProvider>
  )
};

export default ClientAddPage; 