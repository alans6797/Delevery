"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Send, ThumbsUp, Clock } from "lucide-react"

export function WhatsAppTemplates() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({
    confirmation: false,
    ready: false,
    survey: false,
  })

  const handleSendTemplate = async (templateType: string) => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Error",
        description: "Por favor ingresa un número de teléfono válido",
        variant: "destructive",
      })
      return
    }

    setIsLoading({ ...isLoading, [templateType]: true })

    try {
      // Datos de ejemplo para la demostración
      const pedidoDemo = {
        id: Math.floor(Math.random() * 1000) + 1,
        productos: ["Hamburguesa Clásica", "Papas Fritas", "Refresco Cola"],
        total: 189.5,
      }

      const endpoint = `/api/whatsapp/templates/${templateType}`

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: phoneNumber,
          pedido: pedidoDemo,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Mensaje enviado",
          description: `Se ha enviado la plantilla de "${templateType}" al número ${phoneNumber}`,
        })
      } else {
        throw new Error(data.error || "Error al enviar el mensaje")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al enviar el mensaje",
        variant: "destructive",
      })
    } finally {
      setIsLoading({ ...isLoading, [templateType]: false })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plantillas de WhatsApp</CardTitle>
        <CardDescription>Envía mensajes predefinidos a tus clientes utilizando plantillas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Label htmlFor="phone">Número de teléfono</Label>
          <Input
            id="phone"
            placeholder="+52 1234567890"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Ingresa el número con código de país (ej: +52 para México)
          </p>
        </div>

        <Tabs defaultValue="confirmation">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="confirmation">Confirmación</TabsTrigger>
            <TabsTrigger value="ready">Pedido Listo</TabsTrigger>
            <TabsTrigger value="survey">Encuesta</TabsTrigger>
          </TabsList>

          <TabsContent value="confirmation" className="mt-4 space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-bold">🎉 ¡Pedido Confirmado! 🎉</p>
                  <p>Hola, tu pedido #123 ha sido confirmado.</p>
                  <p className="mt-2">📦 Detalles del pedido:</p>
                  <ul className="list-disc pl-5">
                    <li>Hamburguesa Clásica</li>
                    <li>Papas Fritas</li>
                    <li>Refresco Cola</li>
                  </ul>
                  <p className="mt-2">💰 Total: $189.50</p>
                  <p>⏱️ Tiempo estimado de entrega: 30-45 minutos</p>
                  <p className="mt-2">Gracias por tu preferencia. ¡Buen provecho!</p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => handleSendTemplate("confirmation")}
              className="w-full"
              disabled={isLoading.confirmation}
            >
              {isLoading.confirmation ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Enviando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Enviar confirmación de pedido
                </span>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="ready" className="mt-4 space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-bold">🍔 ¡Tu pedido está listo! 🍔</p>
                  <p>Tu pedido #123 está listo y en camino.</p>
                  <p className="mt-2">🚚 Tiempo estimado de llegada: 15-20 minutos</p>
                  <p className="mt-2">Si tienes alguna pregunta, no dudes en contactarnos.</p>
                </div>
              </div>
            </div>
            <Button onClick={() => handleSendTemplate("ready")} className="w-full" disabled={isLoading.ready}>
              {isLoading.ready ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Enviando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Enviar notificación de pedido listo
                </span>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="survey" className="mt-4 space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <div className="flex items-start gap-3">
                <ThumbsUp className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-bold">✨ ¿Cómo estuvo tu experiencia? ✨</p>
                  <p>Esperamos que hayas disfrutado tu pedido #123.</p>
                  <p className="mt-2">
                    Nos encantaría conocer tu opinión. ¿Podrías calificar tu experiencia del 1 al 5?
                  </p>
                  <p>Simplemente responde a este mensaje con el número.</p>
                  <p className="mt-2">¡Gracias por ayudarnos a mejorar!</p>
                </div>
              </div>
            </div>
            <Button onClick={() => handleSendTemplate("survey")} className="w-full" disabled={isLoading.survey}>
              {isLoading.survey ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Enviando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Enviar encuesta de satisfacción
                </span>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          Estas plantillas utilizan la API de WhatsApp Business a través de Twilio
        </p>
      </CardFooter>
    </Card>
  )
}
