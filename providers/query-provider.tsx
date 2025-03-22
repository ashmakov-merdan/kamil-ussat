"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode, useState } from "react";

interface Props {
  children: ReactNode
}

const QueryProvider: FC<Props> = ({ children }) => {
  const [client] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  )
};

export default QueryProvider;