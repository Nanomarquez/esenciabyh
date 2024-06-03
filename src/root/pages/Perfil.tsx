import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { UpdateProfileValidation } from "@/lib/validation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/shared";
import { Link } from "react-router-dom";
import { useState } from "react";

function Perfil() {
  const form = useForm<z.infer<typeof UpdateProfileValidation>>({
    resolver: zodResolver(UpdateProfileValidation),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateProfileValidation>) {
    console.log(values);
  }

  const [seePassword, setSeePassword] = useState(false);

  const Required = () => <span className="text-destructive text-xl">*</span>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full mt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nombre <Required />
              </FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Apellido <Required />
              </FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefono</FormLabel>
              <div className="flex">
                <Input
                  value={"+54"}
                  className="shad-input w-[50px] mr-2"
                  disabled
                />
                <FormControl>
                  <Input
                    type="number"
                    className="shad-input"
                    {...field}
                    placeholder="11-12345678"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <Required />
              </FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Contraseña <Required />
              </FormLabel>
              <div className="flex items-center">
                <FormControl>
                  <Input
                    type={seePassword ? "text" : "password"}
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setSeePassword(!seePassword)}
                >
                  <img
                    src={`/icons/${
                      seePassword ? "eye-out-white" : "eye-white"
                    }.svg`}
                    className="w-6 h-6 ml-2 cursor-pointer"
                    alt="eye"
                  />
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary mt-2">
          {/* {isCreatingAccount || isUserLoading || isSignin ? (
            <div className="flex-center gap-2">
              <Loader /> Cargando...
            </div>
          ) : ( */}
            "Crear Cuenta"
          {/* )} */}
        </Button>
        <p className="text-sm text-light-4 text-center mt-2">
          Ya tienes una cuenta?
          <Link
            to="/sign-in"
            className="text-primary-600 text-small-semibold ml-1"
          >
            Inicia sesión
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default Perfil;
