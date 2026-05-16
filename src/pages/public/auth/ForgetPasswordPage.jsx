import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
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
import { Loader2, ArrowLeft, MailCheck, RotateCcw } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

const ForgetPasswordPage = () => {
  const { resetPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false); // Track if email was sent
  const [userEmail, setUserEmail] = useState(""); // Store email for the success view

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await resetPassword(data.email);
      setUserEmail(data.email); // Save the email to show in the success message
      setIsSent(true); // Switch to success view
      toast.success("Password reset email sent!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted/50">
      <div className="flex flex-col justify-center mb-6">
        <img src="/MicromintLogo.svg" className="w-40" alt="Micromint Logo" />
      </div>

      <Card className="w-full max-w-md">
        {!isSent ? (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-md uppercase font-bold tracking-tight">
                Reset Password
              </CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a link to reset your password.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-4 pt-4 pb-6">
                <FieldGroup>
                  <Field className="space-y-2">
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <span className="text-destructive text-xs mt-1 block">
                        {errors.email.message}
                      </span>
                    )}
                  </Field>
                </FieldGroup>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
                <Link
                  to="/login"
                  className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </CardFooter>
            </form>
          </>
        ) : (
          /* SUCCESS STATE VIEW */
          <CardContent className="pt-10 pb-10 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <MailCheck className="h-10 w-10 text-emerald-600" />
            </div>
            
            <div className="space-y-2">
              <CardTitle className="text-xl font-bold">Check your inbox</CardTitle>
              <CardDescription className="text-sm px-4">
                We've sent a password reset link to <br />
                <span className="font-semibold text-foreground">{userEmail}</span>
              </CardDescription>
            </div>

            <div className="pt-4 space-y-3">
              <Button asChild className="w-full">
                <a href="https://mail.google.com" target="_blank" rel="noreferrer">
                  Open Mail
                </a>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full text-xs text-muted-foreground"
                onClick={() => setIsSent(false)}
              >
                <RotateCcw className="mr-2 h-3 w-3" />
                Didn't receive it? Try another email
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
      
      <p className="text-xs text-center text-muted-foreground mt-6">
        &copy; 2026 Micromint. All rights reserved.
      </p>
    </div>
  );
};

export default ForgetPasswordPage;