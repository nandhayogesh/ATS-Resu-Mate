import { supabase } from "@/integrations/supabase/client";

export async function getHuggingFaceApiKey(): Promise<string | null> {
  const { data, error } = await supabase
    .from("secure_api_keys")
    .select("api_key")
    .eq("service", "huggingface")
    .single();
  if (error || !data) return null;
  return data.api_key;
}
