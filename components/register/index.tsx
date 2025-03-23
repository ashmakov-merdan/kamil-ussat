"use client"
import { useRegister } from "@/api/queries/auth";
import { FC } from "react";
import { Controller, FormProvider } from "react-hook-form";
import { LogoIcon } from "../icons";
import { Button, Input } from "@/shared";
import Link from "next/link";

const Register: FC = () => {
  const { methods, onSend, isSending, onSubmit, isPending } = useRegister();
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center gap-y-8 pb-10">
        <div className="flex flex-col gap-y-6 items-center">
          <LogoIcon />
          <div>
            <h2 className="text-2xl text-center lg:text-[30px] text-[#101828] dark:text-[#F5F5F6] font-semibold">Register your account</h2>
            <p className="text-sm lg:text-base text-center text-[#475467] dark:text-[#94969C] font-medium">Please enter your details</p>
          </div>
        </div>
        <form className="space-y-3 w-full max-w-sm" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <Controller
              control={control}
              name={"first_name"}
              render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                <Input
                  id={"first_name"}
                  label={"First name"}
                  defaultValue={value}
                  onChange={onChange}
                  isInvalid={invalid}
                  errorMessage={error?.message ? error.message : ""}
                />
              )}
            />
            <Controller
              control={control}
              name={"last_name"}
              render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                <Input
                  id={"last_name"}
                  label={"Last name"}
                  defaultValue={value}
                  onChange={onChange}
                  isInvalid={invalid}
                  errorMessage={error?.message ? error.message : ""}
                />
              )}
            />
          </div>
          <Controller
            control={control}
            name={"email"}
            render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
              <Input
                id={"email"}
                label={"Email"}
                defaultValue={value}
                onChange={onChange}
                isInvalid={invalid}
                errorMessage={error?.message ? error.message : ""}
              />
            )}
          />
          <Controller
            control={control}
            name={"birthdate"}
            render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
              <Input
                id={"birthdate"}
                label={"Birth date"}
                type={"date"}
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
                id={"password"}
                label={"Password"}
                defaultValue={value}
                onChange={onChange}
                isInvalid={invalid}
                errorMessage={error?.message ? error.message : ""}
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
                  label="Verification code"
                  defaultValue={value}
                  onChange={onChange}
                  length={4}
                  isInvalid={invalid}
                />
                <div className="absolute right-2 bottom-1  pb-2 flex items-end">
                  <Button
                    type={"button"}
                    label="OTP"
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
            label="Sign up"
            loading={isPending}
          />
        </form>
        <div>
          <div className="inline-flex justify-center items-center gap-x-1">
            <p className="text-[#475467] dark:text-[#94969C]">Already have an account?</p>
            <Link href={"/login"} className="font-semibold text-[#6941C6] dark:text-[#CECFD2] transition-colors">Login</Link>
          </div>
        </div>
      </div>
    </FormProvider>
  )
};

export default Register;