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
import { SignupValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/UserContext";
import Loader from "@/components/shared/Loader";
import { useState } from "react";

function SignupForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSignin } =
    useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({
        title: "Sign up failed. Please try again.",
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        title: "Sign in failed. Please try again.",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({ title: "Sign up failed. Please try again." });
    }
  }

  const [seePassword, setSeePassword] = useState(false);

  const Required = () => <span className="text-destructive text-xl">*</span>;

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col bg-white/60 p-5 rounded-md shadow-md w-[90vw]">
        <h1 className="text-xl">
          Esencia<span className="font-bold">B&H</span>{" "}
        </h1>
        <p className="text-light-3 small-medium md:base-regular mt-2 text-center">
          Para continuar, por favor ingrese los detalles de su cuenta.
        </p>
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
            {isCreatingAccount || isUserLoading || isSignin ? (
              <div className="flex-center gap-2">
                <Loader /> Cargando...
              </div>
            ) : (
              "Crear Cuenta"
            )}
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
      </div>
    </Form>
  );
}

export default SignupForm;
