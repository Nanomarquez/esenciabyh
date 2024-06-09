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
import { ForgotPasswordValidation } from "@/lib/validation";
import { Loader } from "@/components/shared";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/UserContext";
import { AppwriteException } from "appwrite";

function ForgotPassword() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: forgotPasswordAccount, isPending } = useForgotPasswordAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof ForgotPasswordValidation>>({
    resolver: zodResolver(ForgotPasswordValidation),
    defaultValues: {
      email: ""
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ForgotPasswordValidation>) {
    try {
      const forgotPassword = await forgotPasswordAccount({
        email: values.email
      });
      if (!forgotPassword) {
        return toast({
          title: `Error al intentar restablecer la contraseña. Por favor, inténtelo de nuevo.`,
          variant: "destructive",
        });
      }

      if (forgotPassword) {
        form.reset();
        toast({ title: "Email enviado", variant: "success" });
        navigate("/sign-in");
      } else {
        return toast({
          title: `Error al intentar restablecer la contraseña. Por favor, inténtelo de nuevo.`,
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
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

export default ForgotPassword;
