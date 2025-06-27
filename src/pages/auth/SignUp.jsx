import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signUpAPI } from "@/api";
import { useToast } from "@/hooks/use-toast";
import SmallLoader from "@/components/custom/small-loader";

//icon imports
import { Eye, EyeOff } from "lucide-react";

//shadcn UI imports
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { generatePassword } from "@/utils/generatePassword";

const initialValues = {
  fullName: "",
  email: "",
  masterKey: "",
};

function SignUp() {
  const form = useForm({ defaultValues: initialValues });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const generatePasswordHandler = () => {
    const newPassword = generatePassword();

    form.setValue("masterKey", newPassword);
    form.clearErrors("masterKey");
    setShowPassword(true);
  };

  const signUpMutation = useMutation({
    mutationFn: (data) => signUpAPI(data),
    onSuccess: (response) => {
      localStorage.setItem("token", response.data.token);
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 3);
      localStorage.setItem("expirationTime", expirationTime.toISOString());
      navigate("/dashboard");
    },
  });

  const onSubmit = async (data) => {
    try {
      await signUpMutation.mutateAsync(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-5 border rounded-md p-5 mt-5"
      >
        <FormField
          control={form.control}
          name="fullName"
          rules={{
            required: "Please enter your name",
            minLength: {
              value: 3,
              message: "Full name must be at least 3 characters",
            },
            maxLength: {
              value: 50,
              message: "Full name must not exceed 50 characters",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name" className="pl-1">
                Name
              </FormLabel>
              <FormControl className="">
                <Input
                  id="name"
                  autoComplete="off"
                  placeholder="John Doe"
                  {...field}
                  className="!mt-0 bg-secondary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Please enter an email address",
            validate: (value) => {
              return (
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) ||
                "Invalid email address"
              );
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email" className="pl-1">
                Email
              </FormLabel>
              <FormControl className="">
                <Input
                  id="email"
                  autoComplete="off"
                  placeholder="example@gmail.com"
                  {...field}
                  className="!mt-0 bg-secondary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="masterKey"
          rules={{
            required: "Please enter a master key",
            minLength: {
              value: 6,
              message: "Master key must be at least 6 characters",
            },
            maxLength: {
              value: 16,
              message: "Master key must not exceed 16 characters",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="masterKey" className="pl-1">
                Master Key
              </FormLabel>
              <div className="flex gap-2 items-end">
                <FormControl className="!mt-0">
                  <div className="relative w-4/5">
                    <Input
                      id="masterKey"
                      placeholder="master key"
                      {...field}
                      className="!mt-0 pr-10 bg-secondary"
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={generatePasswordHandler}
                >
                  Generate
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-2/4 mx-auto"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? <SmallLoader /> : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}

export default SignUp;
