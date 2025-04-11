import { NextResponse } from "next/server"
import { sendOrderReadyNotification } from "@/lib/whatsapp-service"

export async function POST(request: Request) {
  try {
    const { to, pedido } = await request.json()

    if (!to || !pedido) {
      return NextResponse.json({ success: false, error: "Faltan datos requeridos (to, pedido)" }, { status: 400 })
    }

    await sendOrderReadyNotification(to, pedido)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error al enviar notificación de pedido listo:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 },
    )
  }
}
