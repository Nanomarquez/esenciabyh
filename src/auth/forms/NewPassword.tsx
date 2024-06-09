import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewPasswordValidation } from "@/lib/validation";
import { Loader } from "@/components/shared";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import { AppwriteException } from "appwrite";
import { useState } from "react";
import { useNewPasswordAccount } from "@/lib/react-query/queriesAndMutations";
import { useSearchParams } from "react-router-dom";

function NewPassword() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  console.log(userId);
  console.log(secret);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: newPasswordAccount, isPending } =
    useNewPasswordAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof NewPasswordValidation>>({
    resolver: zodResolver(NewPasswordValidation),
    defaultValues: {
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof NewPasswordValidation>) {
    try {
      if(!userId || !secret){
        return toast({
          title: "Error al intentar restablecer la contraseña. Por favor, inténtelo de nuevo.",
          variant: "destructive",
        });
      }
      const newPassword = await newPasswordAccount({
        password: values.password,
        userId,
        secret
      });
      if (!newPassword) {
        return toast({
          title: `Error al intentar restablecer la contraseña. Por favor, inténtelo de nuevo.`,
          variant: "destructive",
        });
      }

      if (newPassword) {
        form.reset();
        navigate("/sign-in");
        toast({ title: "Cambio de contraseña exitoso", variant: "success" });
      } else {
        return toast({
          title: "Error al intentar restablecer la contraseña. Por favor, inténtelo de nuevo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      if (error instanceof Error || error instanceof AppwriteException) {
        return toast({
          title: error.message,
          variant: "destructive",
        });
      }
    }
  }

  const [seePassword, setSeePassword] = useState(false);

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-col bg-white/60 p-5 rounded-md shadow-md w-[90vw]">
        <h1 className="text-xl text-center">
          Esencia<span className="font-bold">B&H</span>{" "}
        </h1>
        <p className="text-light-3 text-center small-medium md:base-regular mt-2">
          Recuperar contraseña
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
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
          <Button type="submit" className="shad-button_primary">
            {isUserLoading || isPending ? (
              <div className="flex-center gap-2">
                <Loader /> Cargando...
              </div>
            ) : (
              "Enviar email"
            )}
          </Button>
          <p className="text-sm text-light-4 text-center mt-2">
            No tienes una cuenta?
            <Link
              to="/sign-up"
              className="text-primary-600 text-small-semibold ml-1"
            >
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}

export default NewPassword;
