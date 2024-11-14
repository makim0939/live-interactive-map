import { Booth, BoothInsertProps } from '../types';
import { supabase } from './supabaseClient';

export const selectAllBooths = async (): Promise<Booth[] | null> => {
  const { data: booths, error } = await supabase.from('booths').select('*');
  if (error) {
    console.error(error);
    return null;
  }
  return booths as Booth[];
};

export const insertBooth = async (insertData: BoothInsertProps): Promise<Booth | null> => {
  const { data: booth, error } = await supabase.from('booths').insert(insertData).select().single();
  if (error) {
    console.error(error);
    return null;
  }
  return booth as Booth;
};
