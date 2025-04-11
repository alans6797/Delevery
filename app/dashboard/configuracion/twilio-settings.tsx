"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Save } from "lucide-react"

export function TwilioSettings() {
  const [settings, setSettings] = useState({
    accountSid: process.env.TWILIO_SID || "",
    authToken: process.env.TWILIO_AUTH || "",
    phoneNumber: "+14155238886", // Número de Twilio por defecto
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Aquí iría la lógica para guardar la configuración
      // Por ejemplo, una llamada a la API para actualizar las variables de entorno

      // Simulamos una espera
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Configuración guardada",
        description: "La configuración de Twilio ha sido actualizada correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la configuración. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de Twilio</CardTitle>
        <CardDescription>
          Configura tus credenciales de Twilio para enviar mensajes de WhatsApp a tus clientes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountSid">Account SID</Label>
            <Input
              id="accountSid"
              name="accountSid"
              value={settings.accountSid}
              onChange={handleChange}
              placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              required
            />
            <p className="text-sm text-muted-foreground">
              Puedes encontrar tu Account SID en el panel de control de Twilio
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="authToken">Auth Token</Label>
            <Input
              id="authToken"
              name="authToken"
              type="password"
              value={settings.authToken}
              onChange={handleChange}
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              required
            />
            <p className="text-sm text-muted-foreground">Tu Auth Token es privado, nunca lo compartas con nadie</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Número de WhatsApp</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={settings.phoneNumber}
              onChange={handleChange}
              placeholder="+14155238886"
              required
            />
            <p className="text-sm text-muted-foreground">
              El número de WhatsApp que usarás para enviar mensajes (con código de país)
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Guardando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Guardar configuración
              </span>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <p>Última actualización: {new Date().toLocaleDateString()}</p>
      </CardFooter>
    </Card>
  )
}
