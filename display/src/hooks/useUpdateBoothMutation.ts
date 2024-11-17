import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { type Booth, BoothInsertProps } from "../types";
import { insertBooth, updateBooth } from "../utils/supabaseFunctions";

const useUpdateBoothMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Booth) => {
      return await updateBooth(data);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["booths"] });
    },
  });
};

export default useUpdateBoothMutation;
