
"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react"; // Usaremos MessageCircle como ícono genérico

// Enlace directo al chat de WhatsApp proporcionado por el usuario
const WHATSAPP_CHAT_LINK = "https://chat.whatsapp.com/HJE0NbqNWXi5wHgQiKy6dV";

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    window.open(WHATSAPP_CHAT_LINK, "_blank", "noopener,noreferrer");
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

