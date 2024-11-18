import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Booth } from "../types";
import { updateBooth } from "../utils/supabaseFunctions";

const useUpdateBoothMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Booth) => {
      return await updateBooth(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booths"] });
    },
  });
};

export default useUpdateBoothMutation;
