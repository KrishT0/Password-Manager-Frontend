import { useState } from "react";
import { useForm } from "react-hook-form";

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

  const onSubmit = (data) => {
    console.log(data);
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
              value: 8,
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
          Sign In
        </Button>
      </form>
    </Form>
  );
}

export default SignIn;
