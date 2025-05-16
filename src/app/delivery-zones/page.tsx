
import { MapPin, Building, Info, PackageCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DeliveryZonesPage() {
  const mainDeliveryArea = {
    province: "Holguín",
    municipality: "Holguín",
    details: "Entregas a domicilio disponibles en toda la ciudad de Holguín y áreas cercanas dentro del municipio. ¡Llevamos tu pedido directamente a tu puerta!",
    cost: "Varía según la distancia. Se confirmará al procesar el pedido."
  };

  const otherDeliveryAreas = [
    { name: "Repartos Especiales Fuera del Municipio", details: "Para entregas fuera del municipio de Holguín, por favor contáctanos para consultar disponibilidad y costos adicionales." },
  ];

  const pickupPoints = [
    { name: "Punto de Recogida Central (Holguín)", address: "Calle Falsa 123, Centro, Holguín", hours: "L-V: 9am - 6pm, S: 10am - 2pm (Confirmar cita previa)" },
    // Puedes añadir más puntos de recogida si los tienes
  ];

  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      <section className="text-center">
        <MapPin className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-3">Nuestras Zonas de Entrega</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          ¡Entregamos tus combos y productos directamente en {mainDeliveryArea.municipality}, Provincia {mainDeliveryArea.province}!
        </p>
      </section>

      <section>
        <Card className="border-primary shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center text-primary">
              <PackageCheck className="mr-3 h-7 w-7" />
              Entrega Principal: {mainDeliveryArea.municipality}, {mainDeliveryArea.province}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-lg text-foreground">{mainDeliveryArea.details}</p>
            <p className="font-medium">Costo de entrega: <span className="text-muted-foreground">{mainDeliveryArea.cost}</span></p>
            <Alert variant="default" className="bg-primary/10 border-primary/30">
              <Info className="h-5 w-5 text-primary" />
              <AlertTitle className="text-primary font-semibold">¡Servicio Confiable!</AlertTitle>
              <AlertDescription className="text-foreground/80">
                Nos esforzamos por llevar tus productos de forma rápida y segura a tu hogar en Holguín.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <MapPin className="mr-3 h-6 w-6 text-accent" />
              Otras Áreas y Consideraciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {otherDeliveryAreas.map((area, index) => (
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
              Puntos de Recogida Disponibles
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
