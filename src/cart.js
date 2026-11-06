import { supabase } from "./supabaseClient";

export async function addToCart(flowerId) {
    const { data: existing } = await supabase
        .from("cart")
        .select("id, quantity")
        .eq("flower_id", flowerId)
        .maybeSingle();

    if (existing) {
        return supabase
            .from("cart")
            .update({ quantity: existing.quantity + 1 })
            .eq("id", existing.id);
    }
    return supabase.from("cart").insert({ flower_id: flowerId });
}

export async function changeQty(id, qty) {
    if (qty < 1) return;
    return supabase.from("cart").update({ quantity: qty }).eq("id", id);
}

export async function removeFromCart(id) {
    return supabase.from("cart").delete().eq("id", id);
}