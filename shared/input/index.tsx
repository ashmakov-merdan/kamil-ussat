import { EyeIcon, EyeSlash } from "@/components/icons";
import { cn } from "@/utils";
import { ChangeEvent, FC, useCallback, useState } from "react";

interface Props {
  defaultValue?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  label: string
  id: string
  errorMessage?: string
  isInvalid?: boolean
  length?: number
  type?: string
}

const Input: FC<Props> = ({ defaultValue, id, label, type = "text", length = 100, onChange, errorMessage = "", isInvalid = false }) => {
  const [isShow, setShow] = useState<boolean>(false);

  const onToggle = useCallback(() => {
    setShow((prev) => !prev);
  }, [setShow]);

  return (
    <div className="w-full flex flex-col gap-y-1.5">
      <label htmlFor={id} className="text-sm text-[#344054] dark:text-[#CECFD2] font-medium">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={type === "password" ? isShow ? "text" : "password" : type}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          maxLength={length}
          className={cn(
            "w-full px-3.5 py-2.5 rounded-lg text-[#667085] dark:text-[#85888E] border focus:border-transparent focus:outline focus:outline-[#7F56D9] bg-transparent transition-colors",
            isInvalid ? "border-red-700" : "border-[#EAECF0] dark:border-[#1F242F]"
          )}
          onChange={onChange}
          defaultValue={defaultValue}
        />
        {type === "password" ? (
          <div className=" size-11 absolute right-0 top-0 bottom-0 h-full flex justify-center items-center">
            <button onClick={onToggle} type={"button"}>
              {isShow ? <EyeIcon size={20} /> : <EyeSlash size={20} />}
            </button>
          </div>
        ) : null}
      </div>
      <p className="text-xs text-red-700">{errorMessage && errorMessage}</p>
    </div>
  )
};

export default Input;