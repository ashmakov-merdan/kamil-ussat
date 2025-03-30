"use client"
import useForget from "@/api/queries/auth/use-forget";
import { Navigation } from "@/components";
import { LogoIcon } from "@/components/icons";
import { Button, Input } from "@/shared";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { Controller, FormProvider } from "react-hook-form";

const ForgetPasswordPage: FC = () => {
  const t = useTranslations();
  const { methods, onSend, onSubmit, isSending, isPending } = useForget();
  const { control } = methods;

  return (
    <div>
      <Navigation />
      <section id={"forget-password"} className="px-4 lg:min-h-svh container mx-auto pt-20 lg:pt-24">
        <FormProvider {...methods}>
          <div className="flex flex-col items-center gap-y-8 pb-10">
            <div className="flex flex-col gap-y-6 items-center">
              <LogoIcon />
              <div>
                <h2 className="text-2xl text-center lg:text-[30px] text-[#101828] dark:text-[#F5F5F6] font-semibold">{t("auth.reset-password")}</h2>
                <p className="text-sm lg:text-base text-center text-[#475467] dark:text-[#94969C] font-medium">{t("auth.reset-description")}</p>
              </div>
            </div>
            <form className="space-y-3 w-full max-w-sm" onSubmit={onSubmit}>
              <Controller
                control={control}
                name={"email"}
                render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                  <Input
                    id={"email"}
                    label={t("fields.email")}
                    defaultValue={value}
                    onChange={onChange}
                    isInvalid={invalid}
                    errorMessage={error?.message ? t(`${error.message}`) : ""}
                  />
                )}
              />
              <Controller
                control={control}
                name={"new_password"}
                render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                  <Input
                    id={"password"}
                    label={t("fields.newPassword")}
                    defaultValue={value}
                    onChange={onChange}
                    isInvalid={invalid}
                    type={"password"}
                    errorMessage={error?.message ? t(`${error.message}`) : ""}
                  />
                )}
              />
              <Controller
                control={control}
                name={"otp"}
                render={({ field: { value, onChange }, fieldState: { invalid } }) => (
                  <div className="relative gap-x-3 w-full">
                    <Input
                      id={"otp"}
                      label={t("fields.verificationCode")}
                      defaultValue={value}
                      onChange={onChange}
                      length={4}
                      isInvalid={invalid}
                    />
                    <div className="absolute right-2 bottom-1  pb-2 flex items-end">
                      <Button
                        type={"button"}
                        label="OTP"
                        variant={"primary"}
                        className="py-1"
                        loading={isSending}
                        onClick={onSend}
                      />
                    </div>
                  </div>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                label={t("button.confirm")}
                loading={isPending}
              />
            </form>
          </div>
        </FormProvider>
      </section>
    </div>
  )
};

export default ForgetPasswordPage;