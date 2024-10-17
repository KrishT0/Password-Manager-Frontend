import { useState, useEffect, useRef, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addPasswordAPI, deletePasswordAPI, editPasswordAPI } from "@/api";
import { useToast } from "@/hooks/use-toast";

//icon imports
import { Eye, EyeOff, CircleX, LoaderCircle } from "lucide-react";

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const PasswordModal = forwardRef(
  (
    { data, deleteFlag, addFlag, editFlag, setRefetch, setRefetchChild },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const dialogueCloseTriggerRef = useRef(null);
    const deleteDialogueCloseTriggerRef = useRef(null);
    const navigate = useNavigate();
    const { toast } = useToast();

    const defaultValues = {
      websiteName: data?.websiteName || "",
      email: data?.email || "",
      password: data?.password || "",
    };

    const form = useForm({ defaultValues });

    const onSubmitData = async (data) => {
      try {
        if (addFlag) {
          await addPasswordAPI(data);
          form.reset(defaultValues);
          setRefetchChild((prev) => !prev);
          toast({
            title: "Success",
            description: "Password added successfully",
          });
        } else {
          const body = { ...data, _id: editFlag };
          await editPasswordAPI(body);
          setRefetch((prev) => !prev);
          toast({
            title: "Success",
            description: "Password edited successfully",
          });
        }
      } catch (error) {
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
        if (
          errorMessage.includes("jwt") ||
          errorMessage.includes("login") ||
          errorMessage.includes("exist")
        ) {
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
          localStorage.clear();
          navigate("/");
        }
      }
      dialogueCloseTriggerRef.current.click();
    };

    useEffect(() => {
      form.reset(defaultValues);
    }, [data]);

    const handleDeletePassword = async () => {
      try {
        await deletePasswordAPI(deleteFlag);
        setRefetch((prev) => !prev);
        deleteDialogueCloseTriggerRef.current.click();
      } catch (error) {
        const errorMessage = error.response.data.message;
        if (
          errorMessage.includes("jwt") ||
          errorMessage.includes("login") ||
          errorMessage.includes("exist")
        ) {
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
          localStorage.clear();
          navigate("/");
        }
      }
    };

    return (
      <AlertDialog>
        <AlertDialogTrigger ref={ref}></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="flex flex-row justify-between">
            <AlertDialogTitle>
              {deleteFlag ? "Delete Password" : "Add Password"}
            </AlertDialogTitle>
            {!deleteFlag && (
              <>
                <AlertDialogAction
                  className="hidden"
                  ref={dialogueCloseTriggerRef}
                >
                  Close
                </AlertDialogAction>
                <CircleX
                  className="cursor-pointer"
                  onClick={() => dialogueCloseTriggerRef.current.click()}
                />
              </>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter
            className={`${
              deleteFlag
                ? " flex flex-col "
                : "flex !flex-col justify-center items-center gap-2"
            }`}
          >
            {deleteFlag ? (
              <>
                <AlertDialogDescription>
                  Are you sure you want to delete this password?
                </AlertDialogDescription>
                <div className="flex mt-2 gap-3">
                  <Button variant="destructive" onClick={handleDeletePassword}>
                    Delete
                  </Button>
                  <AlertDialogAction
                    ref={deleteDialogueCloseTriggerRef}
                    className="w-fit inline-block"
                  >
                    Cancel
                  </AlertDialogAction>
                </div>
              </>
            ) : (
              <>
                <AlertDialogDescription>
                  Please add a strong password to secure your account. You can
                  later edit or delete the password.
                </AlertDialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmitData)}
                    className="flex flex-col gap-3"
                  >
                    <FormField
                      control={form.control}
                      name="websiteName"
                      rules={{
                        required: "Please enter webiste name or link",
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="name" className="pl-1">
                            Name
                          </FormLabel>
                          <FormControl className="">
                            <Input
                              autoComplete="off"
                              id="name"
                              placeholder="Website Name"
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
                            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                              value
                            ) || "Invalid email address"
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
                      name="password"
                      rules={{
                        required: "Please enter a password",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="password" className="pl-1">
                            Password
                          </FormLabel>
                          <FormControl className="!mt-0">
                            <div className="relative">
                              <Input
                                id="password"
                                placeholder="Password"
                                {...field}
                                className="!mt-0 pr-10"
                                type={showPassword ? "text" : "password"}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                              >
                                {showPassword ? (
                                  <EyeOff size={20} />
                                ) : (
                                  <Eye size={20} />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className="w-2/4 mx-auto" type="submit">
                      {form.formState.isSubmitting ? (
                        <div className="animate-spin">
                          <LoaderCircle size={20} />
                        </div>
                      ) : editFlag ? (
                        "Edit Password"
                      ) : (
                        "Add Password"
                      )}
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

PasswordModal.displayName = "PasswordModal";

export default PasswordModal;
