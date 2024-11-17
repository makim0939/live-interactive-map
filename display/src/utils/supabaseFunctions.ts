import type { Booth, BoothInsertProps } from "../types";
import { supabase } from "./supabaseClient";

export const selectAllBooths = async (): Promise<Booth[] | undefined> => {
  const { data: booths, error } = await supabase.from("booths").select("*");
  if (error) {
    console.error(error);
    return undefined;
  }
  return booths as Booth[];
};

export const insertBooth = async (insertData: BoothInsertProps): Promise<Booth | undefined> => {
  const { data: booth, error } = await supabase.from("booths").insert(insertData).select().single();
  if (error) {
    console.error(error);
    return undefined;
  }
  return booth as Booth;
};
