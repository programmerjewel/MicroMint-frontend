import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

// Destructure the function from props
export function LoginForm({ className, onFormSubmit, onGoogleLogin, ...props }) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          {/* We pass the local handleSubmit to the prop from the parent */}
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button" onClick={onGoogleLogin}>
                  <FcGoogle />
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  {...register("email", { required: "Email is required" })} 
                />
                {errors.email && (
                  <span className="text-destructive text-xs">{errors.email.message}</span>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  {...register("password", { required: "Password is required" })} 
                />
                {errors.password && (
                  <span className="text-destructive text-xs">{errors.password.message}</span>
                )}
              </Field>

              <Field>
                {/* isSubmitting helps prevent double-clicks during the API call */}
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Authenticating..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don't have an account? <Link to='/register' className="underline">Register</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}