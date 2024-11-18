import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Booth, BoothInsertProps } from "../types";
import { insertBooth } from "../utils/supabaseFunctions";

const useBoothMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: BoothInsertProps) => {
      return await insertBooth(data);
    },
    onSuccess: (result) => {
      queryClient.setQueryData<Booth[]>(["booths"], (old) => (old ? [...old, result] : [result]));
    },
  });
};

export default useBoothMutation;
