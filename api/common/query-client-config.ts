import { QueryClientConfig } from "@tanstack/react-query";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: STALE_TIME,
    },
  },
};
