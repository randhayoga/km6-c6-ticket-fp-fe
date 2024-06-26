import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// ASSETS
import bgAuth from "@/assets/images/bgauth.png";
// ICONS
import { Eye, EyeOff } from "lucide-react";
//  COMPONENTS
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "../../../redux/actions/auth";
import GoogleLoginComponent from "../GoogleLogin";
// import { login } from "@/services/user/auth/login";

const formSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().nonempty({ message: "Password harus diisi" }),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Define submit handler.
  function onSubmit(values) {
    const email = values.email;
    const password = values.password;
    dispatch(login(navigate, email, password));
  }

  return (
    <>
      <div className="flex-1 hidden md:block">
        <img
          src={bgAuth}
          alt="Background Auth"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="flex flex-col px-8 md:px-16 lg:px-32 justify-center h-full gap-10">
          <div>
            <h1 className="text-3xl font-bold font-sans">Masuk</h1>
          </div>

          {/* Form */}
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans text-black">
                        Email/No Telepon
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contoh: johndoe@gmail.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="italic" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between font-sans font-medium text-sm">
                        <FormLabel className="text-black">Password</FormLabel>
                        <FormLabel>
                          <Link
                            to="/reset-password"
                            className="text-color-primary"
                          >
                            Lupa kata sandi
                          </Link>
                        </FormLabel>
                      </div>
                      <FormControl>
                        <div className="relative flex flex-col">
                          <Input
                            placeholder="Masukkan password"
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                          {!showPassword ? (
                            <Eye
                              className="text-slate-300 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
                              onClick={() => setShowPassword(!showPassword)}
                              size={28}
                            />
                          ) : (
                            <EyeOff
                              className="text-slate-300 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
                              onClick={() => setShowPassword(!showPassword)}
                              size={28}
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="italic" />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full bg-color-primary hover:bg-hover-primary mt-5"
                  type="submit"
                >
                  Masuk
                </Button>
              </form>
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="px-4 text-gray-500">or</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>
              <GoogleLoginComponent text={"Masuk dengan Google"} />
            </Form>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-5">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="font-sans text-color-primary hover:text-hover-primary font-bold"
            >
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
