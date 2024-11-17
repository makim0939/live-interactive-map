import type { Booth, BoothInsertProps } from "../types";
import { supabase } from "./supabaseClient";

export const selectAllBooths = async (): Promise<Booth[]> => {
  const { data: booths, error } = await supabase.from("booths").select("*");
  if (error) throw new Error(error.message);
  return booths as Booth[];
};

export const insertBooth = async (insertData: BoothInsertProps): Promise<Booth> => {
  const { data: booth, error } = await supabase.from("booths").insert(insertData).select().single();
  if (error) throw new Error(error.message);
  return booth as Booth;
};

export const updateBooth = async (updateData: Booth): Promise<Booth[]> => {
  const { data: booths, error } = await supabase
    .from("booths")
    .update(updateData)
    .eq("id", updateData.id)
    .select();
  if (error) throw new Error(error.message);
  return booths as Booth[];
};
