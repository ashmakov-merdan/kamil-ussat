"use client"
import { useCallback, useState } from "react"

const usePagination = () => {
  const limit = 20;
  const [ itemsLength, setItemsLength ] = useState<number>(0);
  const [ page, setPage ] = useState<number>(1);

  const prevPage = useCallback(() => {
    if(page > 1){
      setPage((prev) => prev -= 1);
    }
  }, [page, setPage]);

  const nextPage = useCallback(() => {
    if(itemsLength >= limit){
      setPage((prev) => prev += 1);
    }
  }, [page, setPage]);

  return { limit, page, nextPage, prevPage, setItemsLength };
};

export default usePagination;