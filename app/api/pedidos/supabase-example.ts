import { supabase } from "@/lib/supabase"

// Ejemplo: Obtener todos los pedidos
export async function obtenerPedidos() {
  const { data, error } = await supabase.from("pedidos").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error al obtener pedidos:", error)
    throw error
  }

  return data
}

// Ejemplo: Insertar un nuevo pedido
export async function crearPedido(pedido: any) {
  const { data, error } = await supabase.from("pedidos").insert([pedido]).select()

  if (error) {
    console.error("Error al crear pedido:", error)
    throw error
  }

  return data[0]
}

// Ejemplo: Actualizar el estado de un pedido
export async function actualizarEstadoPedido(id: number, estado: string) {
  const { data, error } = await supabase.from("pedidos").update({ estado }).eq("id", id).select()

  if (error) {
    console.error("Error al actualizar pedido:", error)
    throw error
  }

  return data[0]
}
