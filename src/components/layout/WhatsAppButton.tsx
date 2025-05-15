
"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react"; // Usaremos MessageCircle como ícono genérico

// IMPORTANTE: Reemplaza estos valores con tu número de WhatsApp y mensaje predeterminado
const WHATSAPP_PHONE_NUMBER = "521XXXXXXXXXX"; // Ejemplo: 5215512345678 (código de país + código de área + número)
const WHATSAPP_PREDEFINED_MESSAGE = "Hola, me gustaría obtener más información.";

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREDEFINED_MESSAGE)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-xl z-50 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
      size="icon"
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
    </Button>
  );
}
