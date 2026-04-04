import { LoginForm } from "@/components/login-form";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const { loginUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    try {
      await loginUser(data.email, data.password);
      toast.success("Welcome back!");
      navigate("/"); // Redirect after success
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.message || "Failed to login. Check your credentials.");
    }
  };
  // Google Handler
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Google login failed");
    }
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted/50">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img src="/MicromintLogo.svg" className="w-40" alt="" />
        </div>
        <LoginForm onFormSubmit={handleLogin} onGoogleLogin={handleGoogleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;