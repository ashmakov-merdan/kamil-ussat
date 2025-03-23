"use client"
import { useCreateTool } from "@/api/queries/tools";
import Uploader from "@/components/uploader";
import { Button, Input } from "@/shared";
import Textarea from "@/shared/textarea";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Controller, FormProvider } from "react-hook-form";

const ToolAddPage: FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const { methods, onSubmit, fields, isPending, } = useCreateTool();
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="p-6 space-y-6 bg-transparent rounded-lg border border-[#EAECF0] dark:border-[#1F242F]">
        <div className="space-y-6">
          <div className="flex lg:flex-row gap-x-4">
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

          <div className="flex lg:flex-row gap-x-4">
            {fields.map((field, idx) => (
              field.desription && field.desription.map((descField, descIdx) => (
                <Controller
                  key={`desc-${idx}-${descIdx}`}
                  control={control}
                  name={descField.name as "description.tk" | "description.ru" | "description.en"}
                  render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                    <div className="flex-1">
                      <Textarea
                        id={descField.name}
                        label={t(`fields.${descField.label}`)}
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
          <h3 className="text-base font-semibold mb-3 text-[#344054] dark:text-[#CECFD2]">{t('fields.images')}</h3>
          <Uploader />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            label={t("button.cancel")}
            variant={"light"}
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

export default ToolAddPage; 