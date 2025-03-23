"use client"
import { FC } from "react";
import { LogoIcon } from "../icons";
import { Button, Input } from "@/shared";
import Link from "next/link";
import { useLogin } from "@/api/queries/auth";
import { Controller, FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";

const Login: FC = () => {
  const t = useTranslations();
  const { methods, onSubmit, isPending } = useLogin();
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center gap-y-8">
        <div className="flex flex-col gap-y-6 items-center">
          <LogoIcon />
          <div className="space-y-3">
            <h2 className="text-2xl text-center lg:text-[30px] text-[#101828] dark:text-[#F5F5F6] font-semibold">{t("auth.login-to-account")}</h2>
            <p className="text-sm lg:text-base text-center text-[#475467] dark:text-[#94969C] font-medium">{t("auth.welcome-back")}</p>
          </div>
        </div>
        <form className="space-y-5 w-full max-w-sm" onSubmit={onSubmit}>
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
                errorMessage={error?.message ? t(`${error.message}`) : ""}
              />
            )}
          />
          <Controller
            control={control}
            name={"password"}
            render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
              <Input
                id="password"
                label={t("fields.password")}
                defaultValue={value}
                onChange={onChange}
                isInvalid={invalid}
                errorMessage={error?.message ? t(`${error.message}`) : ""}
              />
            )}
          />
          <div className="text-right">
            <Link href={"/forgot-password"} className="font-semibold text-[#6941C6] dark:text-[#CECFD2] transition-colors">{t("button.forgot")}</Link>
          </div>
          <Button
            type="submit"
            className="w-full"
            label={t("button.login")}
            loading={isPending}
          />
        </form>
        <div>
          <div className="inline-flex justify-center items-center gap-x-1">
            <p className="text-[#475467] dark:text-[#94969C]">{t("auth.dont-have-account")}</p>
            <Link href={"/register"} className="font-semibold text-[#6941C6] dark:text-[#CECFD2] transition-colors">{t("button.signup")}</Link>
          </div>
        </div>
      </div>
    </FormProvider>
  )
};

export default Login;