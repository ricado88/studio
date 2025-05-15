
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: 'Error de Contraseña',
        description: 'Las contraseñas no coinciden.',
        variant: 'destructive',
        duration: 3000,
      });
      return;
    }
    // Placeholder for actual registration logic
    console.log('Datos de registro:', { fullName, email, password });
    toast({
      title: 'Registro Exitoso (Simulación)',
      description: '¡Tu cuenta ha sido creada! Redirigiendo...',
      duration: 3000,
    });
    // TODO: Implement actual registration logic and redirect, e.g.:
    // import { useRouter } from 'next/navigation';
    // const router = useRouter();
    // router.push('/login');
  };

  return (
    <div className="flex justify-center items-center py-12 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto h-10 w-10 text-primary mb-3" />
          <CardTitle className="text-2xl font-bold">Crear una Cuenta Nueva</CardTitle>
          <CardDescription>Ingresa tus datos para registrarte en ComboExpress88.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Ej: Ana Pérez"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="text-base"
              />
            </div>
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
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="text-base"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="text-base"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base py-3 mt-2">
              Registrarse
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center text-sm mt-2">
          <div className="flex">
            <p className="text-muted-foreground">¿Ya tienes una cuenta?&nbsp;</p>
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Iniciar Sesión
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
