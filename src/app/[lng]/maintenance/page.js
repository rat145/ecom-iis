"use client";

import MaintenanceComponent from "@/components/maintenance";
import SettingProvider from "@/helper/settingContext/SettingProvider";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const Maintenance = (children) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={children.dehydratedState}>
        <SettingProvider>
          <MaintenanceComponent />
        </SettingProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default Maintenance;
