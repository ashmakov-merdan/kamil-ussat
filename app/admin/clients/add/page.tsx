"use client"
import api from "@/api";
import { useCreateClient } from "@/api/queries/clients";
import useFiles from "@/api/queries/files";
import Uploader from "@/components/uploader";
import { Button, Input } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC } from "react";
import { Controller, FormProvider } from "react-hook-form";

const ClientAddPage: FC = () => {
  const t = useTranslations();
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
                  label={t("fields.name")}
                  defaultValue={value}
                  onChange={onChange}
                  isInvalid={invalid}
                  errorMessage={error?.message ? error.message : ""}
                />
              )}
            />
          </div>
        </div>

        <div className="border-t border-[#EAECF0] dark:border-[#1F242F] pt-6">
          <h3 className="text-base font-semibold mb-3 text-[#344054] dark:text-[#CECFD2]">{t("fields.logo")}</h3>
          <Uploader />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            label={t("button.cancel")}
            variant={"light"}
            type={"button"}
            onClick={() => router.back()}
          />
          <Button
            label={t("button.save")}
            type="submit"
            loading={isPending}
            disabled={isPending}
          />
        </div>
      </form>
    </FormProvider>
  )
};

export default ClientAddPage; 