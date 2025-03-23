import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {
  prevPage: () => void
  nextPage: () => void
  currentPage: number
  length: number
}

const Pagination: FC<Props> = ({ prevPage, nextPage, currentPage, length }) => {
  const t = useTranslations();

  return (
    <div className="p-3 flex justify-between items-center">
      <button
        type="button"
        onClick={prevPage}
        className={cn(
          "px-3 py-2 rounded-lg text-sm text-[#344054] dark:text-[#CECFD2] bg-[#FFFFFF] dark:bg-[#161B26] border border-[#D0D5DD] dark:border-[#333741] transition-all",
          currentPage === 1 ? "opacity-0" : ""
        )}
      >{t("button.previous")}</button>
      {<p className="text-sm text-nowrap text-[#344054] dark:text-[#CECFD2] font-medium">{t("columns.current-page")} {currentPage}</p>}
      <button
        type="button"
        onClick={nextPage}
        className={cn(
          "px-3 py-2 rounded-lg text-sm text-[#344054] dark:text-[#CECFD2] bg-[#FFFFFF] dark:bg-[#161B26] border border-[#D0D5DD] dark:border-[#333741] transition-all",
          length < 20 ? "opacity-0" : ""
        )}
      >{t("button.next")}</button>
    </div>
  )
};

export default Pagination;