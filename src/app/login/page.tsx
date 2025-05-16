
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos de inicio de sesión:', { email, password });
    toast({
      title: 'Inicio de Sesión Exitoso (Simulación)',
      description: '¡Bienvenido de nuevo! Redirigiendo...',
      duration: 3000,
    });
    // TODO: Implement actual login logic and redirect
  };

  return (
    <>
      {/* Hero Section - Full Width */}
      <section
        className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] aspect-[16/4] overflow-hidden"
      >
        <Image
          src="https://placehold.co/1200x300.png"
          alt="Acceso seguro a la plataforma"
          layout="fill"
          objectFit="cover"
          priority
          className="z-0"
          data-ai-hint="secure access"
        />
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/50 p-4 z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
              Iniciar Sesión
            </h1>
        </div>
      </section>

      {/* Main content */}
      <div className="mt-8 md:mt-12 flex justify-center items-center px-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <LogIn className="mx-auto h-10 w-10 text-primary mb-3" />
            <CardTitle className="text-2xl font-bold">Accede a tu Cuenta</CardTitle> {/* Adjusted title */}
            <CardDescription>Ingresa tus credenciales para ComboExpress88.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-base"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-base"
                />
              </div>
              <div className="flex items-center justify-end text-sm mt-1">
                <Link href="#" className="font-medium text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base py-3 mt-2">
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center text-sm mt-2">
            <div className="flex">
              <p className="text-muted-foreground">¿No tienes una cuenta?&nbsp;</p>
              <Link href="/register" className="font-semibold text-primary hover:underline">
                Regístrate aquí
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
