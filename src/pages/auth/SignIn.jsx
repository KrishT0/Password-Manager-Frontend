import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "@/api";
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

const initialValues = {
  email: "",
  masterKey: "",
};

function SignIn() {
  const form = useForm({ defaultValues: initialValues });
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginAPI(data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
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
                  autoComplete="off"
                  id="email"
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
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="masterKey" className="pl-1">
                Master Key
              </FormLabel>
              <FormControl className="!mt-0">
                <div className="relative">
                  <Input
                    id="masterKey"
                    placeholder="master key"
                    {...field}
                    className="!mt-0 pr-10 bg-secondary"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-2/4 mx-auto" type="submit">
          {form.formState.isSubmitting ? <SmallLoader /> : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}

export default SignIn;
