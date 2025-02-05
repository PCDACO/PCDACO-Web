"use client";

import { QueryClientProvider, QueryClient, QueryCache } from "@tanstack/react-query";
import { useState } from "react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient({
    queryCache: new QueryCache({
      onError: () => { }
    })
  }));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
