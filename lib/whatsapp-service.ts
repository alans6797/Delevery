/**
 * Envía un mensaje de WhatsApp usando Twilio
 * @param to Número de teléfono del destinatario (con código de país, sin "whatsapp:")
 * @param message Contenido del mensaje
 * @returns Promesa con el resultado del envío
 */
export async function sendWhatsAppMessage(to: string, message: string) {
  const accountSid = process.env.TWILIO_SID
  const authToken = process.env.TWILIO_AUTH

  if (!accountSid || !authToken) {
    throw new Error("Faltan las credenciales de Twilio en las variables de entorno")
  }

  const client = require("twilio")(accountSid, authToken)

  return client.messages.create({
    body: message,
    from: "whatsapp:+14155238886", // Número de Twilio
    to: `whatsapp:${to}`,
  })
}

/**
 * Envía una notificación de nuevo pedido
 * @param to Número de teléfono del destinatario
 * @param pedido Datos del pedido
 * @returns Promesa con el resultado del envío
 */
export async function sendOrderNotification(to: string, pedido: any) {
  const mensaje = `🛎️ *Nuevo pedido de ${pedido.plataforma}*

👤 *Cliente:* ${pedido.cliente}
💵 *Total:* $${pedido.total}
📦 *Productos:*
- ${pedido.productos.join("\n- ")}
🕒 *Hora:* ${pedido.hora}`

  return sendWhatsAppMessage(to, mensaje)
}

/**
 * Envía una confirmación de pedido al cliente
 * @param to Número de teléfono del cliente
 * @param pedido Datos del pedido
 * @returns Promesa con el resultado del envío
 */
export async function sendOrderConfirmation(to: string, pedido: any) {
  const mensaje = `🎉 *¡Pedido Confirmado!* 🎉

Hola, tu pedido #${pedido.id} ha sido confirmado.

📦 *Detalles del pedido:*
${pedido.productos.map((producto: string) => `- ${producto}`).join("\n")}

💰 *Total:* $${pedido.total}

⏱️ *Tiempo estimado de entrega:* 30-45 minutos

Gracias por tu preferencia. ¡Buen provecho!`

  return sendWhatsAppMessage(to, mensaje)
}

/**
 * Envía una notificación de pedido listo para entrega
 * @param to Número de teléfono del cliente
 * @param pedido Datos del pedido
 * @returns Promesa con el resultado del envío
 */
export async function sendOrderReadyNotification(to: string, pedido: any) {
  const mensaje = `🍔 *¡Tu pedido está listo!* 🍔

Tu pedido #${pedido.id} está listo y en camino.

🚚 *Tiempo estimado de llegada:* 15-20 minutos

Si tienes alguna pregunta, no dudes en contactarnos.`

  return sendWhatsAppMessage(to, mensaje)
}

/**
 * Envía una encuesta de satisfacción después de la entrega
 * @param to Número de teléfono del cliente
 * @param pedido Datos del pedido
 * @returns Promesa con el resultado del envío
 */
export async function sendSatisfactionSurvey(to: string, pedido: any) {
  const mensaje = `✨ *¿Cómo estuvo tu experiencia?* ✨

Esperamos que hayas disfrutado tu pedido #${pedido.id}.

Nos encantaría conocer tu opinión. ¿Podrías calificar tu experiencia del 1 al 5?
Simplemente responde a este mensaje con el número.

¡Gracias por ayudarnos a mejorar!`

  return sendWhatsAppMessage(to, mensaje)
}
