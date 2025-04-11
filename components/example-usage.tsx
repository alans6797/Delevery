"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button-with-variants"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { ChevronDown, Bell, Send } from "lucide-react"
import { sendWhatsAppMessage } from "@/lib/whatsapp-service"

export function ExampleUsage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSendNotification = async () => {
    setIsLoading(true)
    try {
      // Ejemplo de uso de Twilio para enviar una notificación
      await sendWhatsAppMessage(
        "+1234567890",
        "¡Tu pedido ha sido confirmado! Estará listo en aproximadamente 30 minutos.",
      )
      alert("Notificación enviada con éxito")
    } catch (error) {
      console.error("Error al enviar notificación:", error)
      alert("Error al enviar la notificación")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-bold">Ejemplo de uso de componentes</h2>

      <div className="flex flex-wrap gap-4">
        <Button variant="default">Botón Default</Button>
        <Button variant="destructive">Botón Destructive</Button>
        <Button variant="outline">Botón Outline</Button>
        <Button variant="rappi">Rappi</Button>
        <Button variant="ubereats">UberEats</Button>
        <Button variant="didifood">DidiFood</Button>
      </div>

      <div className="flex gap-4">
        <Button size="sm">Pequeño</Button>
        <Button size="default">Normal</Button>
        <Button size="lg">Grande</Button>
        <Button size="icon">
          <Bell />
        </Button>
      </div>

      <div>
        <Button isLoading>Cargando...</Button>
      </div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Opciones <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-md border bg-white p-2 shadow-md">
            <DropdownMenuItem className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
              Opción 1
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
              Opción 2
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">
              Opción 3
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <Button variant="primary" isLoading={isLoading} onClick={handleSendNotification}>
          <Send className="mr-2 h-4 w-4" />
          Enviar notificación WhatsApp
        </Button>
      </div>
    </div>
  )
}
