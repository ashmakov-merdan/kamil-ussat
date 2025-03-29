"use client"
import { useCreate } from "@/api/queries/orders";
import { Heading, Input } from "@/shared";
import Textarea from "@/shared/textarea";
import { cn } from "@/utils";
import { FC } from "react";
import { Controller, FormProvider } from "react-hook-form";
import OrderServices from "./services";
import { useTranslations } from "next-intl";

const OrderForm: FC = () => {
  const t = useTranslations();
  const { methods, onSubmit } = useCreate();
  const { control } = methods;

  return (
    <div className="flex-1 space-y-12">
      <div className="space-y-12">
        <div className="space-y-5">
          <Heading text={t("contact.heading")} isCentered={false} />
          <p className="text-xl font-normal text-[#94969C]">{t("contact.subheading")}</p>
        </div>
        <FormProvider {...methods}>
          <form className="w-full max-w-xl flex flex-col gap-y-4 lg:gap-y-6" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-0 gap-x-4 lg:gap-x-8">
              <div className="flex flex-col gap-y-1.5">
                <Controller
                  control={control}
                  name={"first_name"}
                  render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                    <Input
                      id="first_name"
                      label={t("fields.firstName")}
                      defaultValue={value}
                      onChange={onChange}
                      isInvalid={invalid}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-1.5">
                <Controller
                  control={control}
                  name={"last_name"}
                  render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                    <Input
                      id="last_name"
                      label={t("fields.lastName")}
                      defaultValue={value}
                      onChange={onChange}
                      isInvalid={invalid}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-1.5">
              <Controller
                control={control}
                name={"email"}
                render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                  <Input
                    id="email"
                    label={t("fields.email")}
                    defaultValue={value}
                    onChange={onChange}
                    isInvalid={invalid}
                  />
                )}
              />
            </div>
            <div className="flex-1 flex flex-col gap-y-1.5">
              <Controller
                control={control}
                name={"description"}
                render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                  <Textarea
                    id={"description"}
                    label={t("fields.message")}
                    defaultValue={value}
                    onChange={onChange}
                    isInvalid={invalid}
                  />
                )}
              />
            </div>
            <div className="space-y-6">
              <h1 className={cn("text-xl md:text-2xl font-semibold text-[#101828] dark:text-[#F5F5F6]")}>{t("contact.choose-service")}</h1>
              <OrderServices />
            </div>
            <div className="">
              <button type={"submit"} className="w-full py-3 border border-[#7F56D9] hover:bg-[#7F56D9]/80  bg-[#7F56D9] rounded-lg text-white text-base font-semibold transition-colors">{t("button.send")}</button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
};

export default OrderForm;