import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

const ResetPasswordPage = () => {
  const { confirmNewPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const oobCode = searchParams.get("oobCode");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange"
  });

  //watch the 'password' field only
  const passwordValue = useWatch({
    control,
    name: "password",
  });

  const onSubmit = async (data) => {
    if (!oobCode) return toast.error("Invalid reset link.");

    setIsSubmitting(true);
    try {
      await confirmNewPassword(oobCode, data.password);
      setIsSuccess(true);
      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to reset password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 bg-muted/50">
      <Card className="w-full max-w-md border-t-4 border-t-emerald-500 shadow-lg">
        <CardContent className="pt-10 pb-8 text-center space-y-6">
          {/* Animated Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 animate-in zoom-in duration-500">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-foreground">Password Updated!</CardTitle>
            <CardDescription className="text-base px-2">
              Your Micromint account is now secure with your new password. You can now log back in to manage your tasks and earnings.
            </CardDescription>
          </div>

          <div className="pt-4 px-2">
            <Button 
              className="w-full h-11 text-md font-semibold bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>
            
            <p className="mt-6 text-xs text-muted-foreground">
              Didn't change your password? <br />
              <Link to="/contact" className="text-primary hover:underline font-medium">
                Contact Micromint Security
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-md uppercase font-bold tracking-tight">Set New Password</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FieldGroup className="space-y-4">
              <Field className="space-y-2">
                <FieldLabel htmlFor="password">New Password</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Min 6 characters" }
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-destructive text-xs">{errors.password.message}</p>}
              </Field>

              <Field className="space-y-2">
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm your password",
                    validate: (value) => 
                      value === passwordValue || "Passwords do not match" // Use passwordValue from useWatch
                  })}
                />
                {errors.confirmPassword && <p className="text-destructive text-xs">{errors.confirmPassword.message}</p>}
              </Field>
            </FieldGroup>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Update Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;