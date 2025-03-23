"use client"
import { useCreateFeature } from "@/api/queries/features";
import Uploader from "@/components/uploader";
import { Button, Input } from "@/shared";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Controller, FormProvider } from "react-hook-form";

const FeatureAddPage: FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const { methods, onSubmit, fields, isPending, } = useCreateFeature();
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="p-6 space-y-6 bg-transparent rounded-lg border border-[#EAECF0] dark:border-[#1F242F]">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            {fields.map((field, idx) => (
              field.name && field.name.map((nameField, nameIdx) => (
                <Controller
                  key={`name-${idx}-${nameIdx}`}
                  control={control}
                  name={nameField.name as "name.tk" | "name.ru" | "name.en"}
                  render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                    <div className="flex-1">
                      <Input
                        id={nameField.name}
                        label={t(`fields.${nameField.label}`)}
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

          <div>
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
        </div>

        <div className="border-t border-[#EAECF0] dark:border-[#1F242F] pt-6">
          <h3 className="text-base font-semibold mb-3 text-[#344054] dark:text-[#CECFD2]">{t("fields.images")}</h3>
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

export default FeatureAddPage; 