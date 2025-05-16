
import { MapPin, Building, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DeliveryZonesPage() {
  // Puedes reemplazar esta información con tus datos reales
  const deliveryAreas = [
    { name: "Centro Ciudad", details: "Entrega en 24-48 horas. Costo: $5.00" },
    { name: "Zona Residencial Norte", details: "Entrega en 48-72 horas. Costo: $7.50" },
    { name: "Área Industrial Sur", details: "Consultar disponibilidad y costos." },
  ];

  const pickupPoints = [
    { name: "Tienda Principal", address: "Calle Falsa 123, Centro", hours: "L-V: 9am - 6pm, S: 10am - 2pm" },
    { name: "Almacén Secundario", address: "Avenida Siempreviva 742, Zona Norte", hours: "Solo con cita previa" },
  ];

  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      <section className="text-center">
        <MapPin className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-3">Nuestras Zonas de Entrega</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Consulta aquí la información sobre dónde podemos llevar tus pedidos o dónde puedes recogerlos.
        </p>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <MapPin className="mr-3 h-6 w-6 text-accent" />
              Áreas de Entrega a Domicilio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {deliveryAreas.map((area, index) => (
              <div key={index} className="p-4 border rounded-lg bg-background shadow-sm">
                <h3 className="font-semibold text-lg text-primary">{area.name}</h3>
                <p className="text-muted-foreground">{area.details}</p>
              </div>
            ))}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Nota Importante</AlertTitle>
              <AlertDescription>
                Los tiempos y costos de entrega pueden variar según la demanda y la ubicación exacta.
                Por favor, confirma al finalizar tu pedido o contáctanos para más detalles.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Building className="mr-3 h-6 w-6 text-accent" />
              Puntos de Recogida
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pickupPoints.map((point, index) => (
              <div key={index} className="p-4 border rounded-lg bg-background shadow-sm">
                <h3 className="font-semibold text-lg text-primary">{point.name}</h3>
                <p className="text-muted-foreground">{point.address}</p>
                <p className="text-sm text-muted-foreground/80">Horario: {point.hours}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="text-center mt-12">
        <h2 className="text-2xl font-semibold mb-3">¿Preguntas sobre la entrega?</h2>
        <p className="text-muted-foreground mb-4">
          No dudes en contactarnos si tienes alguna duda sobre nuestras zonas o métodos de entrega.
        </p>
        <a href="mailto:combospress@gmail.com" className="text-primary hover:underline font-medium">
          Enviar un correo
        </a>
        <span className="mx-2 text-muted-foreground">|</span>
        <a href="tel:+5354423736" className="text-primary hover:underline font-medium">
          Llamar ahora
        </a>
      </section>
    </div>
  );
}
