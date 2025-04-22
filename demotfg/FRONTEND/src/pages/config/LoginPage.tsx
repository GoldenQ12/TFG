import { useState } from "react";
import { LoginData } from "@/interfaces/user";
import { useAuthStore } from "@/store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, Tv } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";


const LoginPage = () => {

  const demoUser : LoginData = {
    password: "",
    email: ''
  }

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginData>(demoUser);

  const {login, isLoggingIn} = useAuthStore();

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
  }

  return (
    <div className="h-screen flex justify-center items-center ">
    {/* Left Side - Form */}
    <div className="flex flex-col gap-8 justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div
              className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
            transition-colors"
            >
              <Tv className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Bienvenido de nuevo!</h1>
            <p className="text-base-content/60">Inicia sesión en tu cuenta</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col gap-4">
          <div className="form-control text-left">
            <label className="label">
              <h3 className="label-text text-white font-medium">Email</h3>
            </label>
            <div className="relative bg-red-500">
              <div className="absolute  inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className={`input input-bordered w-full pl-10`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-control text-left">
            <label className="label">
              <span className="label-text text-white font-medium">Contraseña</span>
            </label>
            <div className="relative flex flex-col bg-red-500">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`input w-full pl-10`}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className=" btn btn-primary w-full" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Cargando...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </form>

      </div>
        <div className="text-left ">
          <p className="text-base-content/60">
            No tienes una cuenta?{" "}
            <Link to="/signup" className="link link-primary">
              Creala aquí
            </Link>
          </p>
        </div>
    </div>

    {/* Right Side - Image/Pattern */}
    
  </div>
  );

}


export default LoginPage
