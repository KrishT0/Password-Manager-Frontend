import { useState, useEffect, useRef, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addPasswordAPI, deletePasswordAPI, editPasswordAPI } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import SmallLoader from "@/components/custom/small-loader";

//icon imports
import { Eye, EyeOff, CircleX } from "lucide-react";

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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { generatePassword } from "@/utils/generatePassword";

const PasswordModal = forwardRef(
  ({ data, setData, deleteFlag, addFlag, editFlag }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const dialogueCloseTriggerRef = useRef(null);
    const deleteDialogueCloseTriggerRef = useRef(null);
    const closeDrawerTriggerRef = useRef(null);
    const navigate = useNavigate();
    const { toast } = useToast();
    const isDesktop = useMediaQuery("(min-width: 640px)");

    const defaultValues = {
      websiteName: data?.websiteName || "",
      email: data?.email || "",
      password: data?.password || "",
    };
    const queryClient = useQueryClient();
    const form = useForm({ defaultValues });

    const generatePasswordHandler = () => {
      const newPassword = generatePassword();
      form.setValue("password", newPassword);
      form.clearErrors("password");
      setShowPassword(true);
    };

    const addData = useMutation({
      mutationFn: (data) => addPasswordAPI(data),
      onSuccess: () => {
        form.reset(defaultValues);
        toast({
          title: "Success",
          description: "Password added successfully",
        });
        queryClient.invalidateQueries({ queryKey: ["passwords"] });
      },
    });

    const editData = useMutation({
      mutationFn: (data) => editPasswordAPI(data),
      onSuccess: async () => {
        toast({
          title: "Success",
          description: "Password edited successfully",
        });
        // invalidateQueries is used to refetch the data from the server
        queryClient.invalidateQueries({ queryKey: ["passwords"] });
      },
    });

    const deleteData = useMutation({
      mutationFn: (id) => deletePasswordAPI(id),
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Password deleted successfully",
        });
        isDesktop
          ? deleteDialogueCloseTriggerRef.current.click()
          : closeDrawerTriggerRef.current.click();
        queryClient.invalidateQueries({ queryKey: ["passwords"] });
      },
    });

    const onSubmitData = async (data) => {
      try {
        if (addFlag) {
          await addData.mutateAsync(data);
        } else {
          const body = { ...data, _id: editFlag };
          // Here mutateAsync is used because regular mutate returns a promise which by default return undefined when any error occurs,
          // but mutateAsync behaves properly as a regular promise.
          await editData.mutateAsync(body);
        }
      } catch (error) {
        const errorMessage = error.response.data.message;
        if (
          errorMessage.includes("jwt") ||
          errorMessage.includes("login") ||
          errorMessage.includes("exist")
        ) {
          localStorage.clear();
          navigate("/auth");
        }
        setData({ websiteName: "", email: "", password: "" });
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
      isDesktop
        ? dialogueCloseTriggerRef.current.click()
        : closeDrawerTriggerRef.current.click();
    };

    useEffect(() => {
      form.reset(defaultValues);
      setShowPassword(false);
    }, [data]);

    const handleDeletePassword = async () => {
      try {
        await deleteData.mutateAsync(deleteFlag);
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
          navigate("/auth");
        }
      }
    };

    const closeModal = () => {
      if (data) setData({ websiteName: "", email: "", password: "" });
      dialogueCloseTriggerRef.current.click();
    };

    return isDesktop ? (
      <AlertDialog>
        <AlertDialogTrigger ref={ref}></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="flex flex-row justify-between">
            <AlertDialogTitle>
              {deleteFlag
                ? "Delete Password"
                : data
                ? "Edit Password"
                : "Add Password"}
            </AlertDialogTitle>
            {!deleteFlag && (
              <>
                <AlertDialogAction
                  className="hidden"
                  ref={dialogueCloseTriggerRef}
                >
                  Close
                </AlertDialogAction>
                <CircleX className="cursor-pointer" onClick={closeModal} />
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
                  {data
                    ? "Please edit the details to update."
                    : "Please add a strong password to secure your account. You can later edit or delete the password."}
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
                        maxLength: {
                          value: 16,
                          message: "Password must be at most 16 characters",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="password" className="pl-1">
                            Password
                          </FormLabel>
                          <div className="flex gap-2 items-end">
                            <FormControl className="!mt-0">
                              <div className="relative">
                                <Input
                                  id="password"
                                  autoComplete="off"
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
                            <Button
                              type="button"
                              variant="outline"
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
                      {form.formState.isSubmitting ? (
                        <SmallLoader />
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
    ) : (
      <Drawer
        dismissible={false}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      >
        <DrawerTrigger ref={ref}></DrawerTrigger>
        <DrawerContent className="pt-3 [&>div:first-child]:hidden">
          <DrawerHeader>
            <DrawerTitle>
              {deleteFlag
                ? "Delete Password"
                : data
                ? "Edit password"
                : "Add Password"}
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="px-2 mb-2 text-center">
            {deleteFlag
              ? "Are you sure you want to delete this password?"
              : data
              ? "Please edit the details to update."
              : "Please add a strong password to secure your account. You can later edit or delete the password."}
          </DrawerDescription>
          {deleteFlag ? (
            <Button
              className="mx-5"
              variant="destructive"
              onClick={handleDeletePassword}
            >
              Delete
            </Button>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitData)}
                className="flex flex-col gap-3 px-2"
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
                    maxLength: {
                      value: 16,
                      message: "Password must be at most 16 characters",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password" className="pl-1">
                        Password
                      </FormLabel>
                      <div className="flex gap-2 items-end">
                        <FormControl className="!mt-0">
                          <div className="relative w-full">
                            <Input
                              id="password"
                              autoComplete="off"
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
                        <Button
                          type="button"
                          variant="outline"
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
                  {form.formState.isSubmitting ? (
                    <SmallLoader />
                  ) : editFlag ? (
                    "Edit Password"
                  ) : (
                    "Add Password"
                  )}
                </Button>
              </form>
            </Form>
          )}
          <Button
            className="my-5 w-32 mx-auto"
            variant="secondary"
            ref={closeDrawerTriggerRef}
            onClick={() => setIsDrawerOpen((prev) => !prev)}
          >
            Cancel
          </Button>
        </DrawerContent>
      </Drawer>
    );
  }
);

PasswordModal.displayName = "PasswordModal";

export default PasswordModal;
