"use client"
import { FC } from "react";
import { LogoIcon } from "../icons";
import { Button, Input } from "@/shared";
import Link from "next/link";
import { useLogin } from "@/api/queries/auth";
import { Controller, FormProvider } from "react-hook-form";

const Login: FC = () => {
  const { methods, onSubmit, isPending } = useLogin();
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center gap-y-8">
        <div className="flex flex-col gap-y-6 items-center">
          <LogoIcon />
          <div className="space-y-3">
            <h2 className="text-2xl text-center lg:text-[30px] text-[#101828] dark:text-[#F5F5F6] font-semibold">Log in to your account</h2>
            <p className="text-sm lg:text-base text-center text-[#475467] dark:text-[#94969C] font-medium">Welcome back! Please enter your details</p>
          </div>
        </div>
        <form className="space-y-5 w-full max-w-sm" onSubmit={onSubmit}>
          <Controller
            control={control}
            name={"email"}
            render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
              <Input
                id="email"
                label="Email"
                defaultValue={value}
                onChange={onChange}
                isInvalid={invalid}
                errorMessage={error?.message ? error.message : ""}
              />
            )}
          />
          <Controller
            control={control}
            name={"password"}
            render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
              <Input
                id="password"
                label="Password"
                defaultValue={value}
                onChange={onChange}
                isInvalid={invalid}
                errorMessage={error?.message ? error.message : ""}
              />
            )}
          />
          <div className="text-right">
            <Link href={"/forgot-password"} className="font-semibold text-[#6941C6] dark:text-[#CECFD2] transition-colors">Forgot password</Link>
          </div>
          <Button
            type="submit"
            className="w-full"
            label="Login"
            loading={isPending}
          />
        </form>
        <div>
          <div className="inline-flex justify-center items-center gap-x-1">
            <p className="text-[#475467] dark:text-[#94969C]">Don't have an account?</p>
            <Link href={"/register"} className="font-semibold text-[#6941C6] dark:text-[#CECFD2] transition-colors">Sign up</Link>
          </div>
        </div>
      </div>
    </FormProvider>
  )
};

export default Login;