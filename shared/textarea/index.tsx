"use client"
import { cn } from "@/utils";
import { ChangeEvent, FC } from "react";

interface Props {
  id?: string
  label: string
  defaultValue?: string
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  isInvalid?: boolean
  errorMessage?: string
}

const Textarea: FC<Props> = ({ id, label, defaultValue, onChange, isInvalid, errorMessage }) => {
  return (
    <div className="w-full flex flex-col gap-y-1.5">
      <label htmlFor={id} className="text-sm text-[#344054] dark:text-[#CECFD2] font-medium">{label}</label>
      <textarea
        id={id}
        onChange={onChange}
        defaultValue={defaultValue}
        className={cn(
          "w-full px-3.5 py-2.5 rounded-lg resize-none text-[#667085] dark:text-[#85888E] border focus:outline focus:outline-[#7F56D9] bg-transparent transition-colors",
          isInvalid ? "border-red-700" : "border-[#EAECF0] dark:border-[#1F242F]"
        )}
      ></textarea>
      <p className="text-xs text-red-700">{errorMessage && errorMessage}</p>
    </div>
  )
};

export default Textarea;