import { GetStatistics } from "@/app/(dashboard)/dashboard/action";
import { useQuery } from "@tanstack/react-query"

export const useStatisticsQuery = () => {
  const listStatisticsQuery = useQuery({
    queryKey: ["statistics"],
    queryFn: () => GetStatistics(),
    retry: 1
  });
  return { listStatisticsQuery };
}
