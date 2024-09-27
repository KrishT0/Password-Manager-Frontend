import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUpAPI } from "@/api";
import { useTokenStore } from "@/store/user";
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
  fullName: "",
  email: "",
  masterKey: "",
};

function SignUp() {
  const form = useForm({ defaultValues: initialValues });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useTokenStore();
  const { toast } = useToast();

  const onSubmit = async (data) => {
    try {
      const response = await signUpAPI(data);
      setToken(response.data.token);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.log(error);
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
                  className="!mt-0"
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
                  className="!mt-0"
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
                    className="!mt-0 pr-10"
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
          {form.formState.isSubmitting ? <SmallLoader /> : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}

export default SignUp;
