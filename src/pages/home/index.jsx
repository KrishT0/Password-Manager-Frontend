import React from "react";
import HomeLayout from "@/layouts/HomeLayout";
import ThemeToggle from "@/components/custom/theme-toggle";

//lucid icon imports
import { Lock, RefreshCw, Share2 } from "lucide-react";

//shadcn UI imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function HomePage() {
  return (
    <HomeLayout>
      <header className="">
        <nav className="max-w-[1440px] mx-auto flex justify-between items-center p-2">
          <h1 className="text-lg font-semibold border p-1 rounded-full">PM</h1>
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <section className="max-w-[1440px] mx-auto p-2 flex justify-center gap-5 flex-col items-center h-[75vh]">
        <h1 className="text-7xl text-primary font-bold mb-4">
          Secure Your Digital Life
        </h1>
        <p className="text-2xl text-gray-400 font-normal w-1/2 text-center">
          Manage all your passwords in one secure place. Stay protected with our
          Password Manager.
        </p>
        <div className="space-x-4">
          <Button className="text-lg">Get Started</Button>
          <Button variant="outline" className="text-lg ">
            Learn More
          </Button>
        </div>
      </section>
      <section className="bg-gray-100 dark:bg-primary-foreground">
        <div className="max-w-[1440px] mx-auto p-2 flex flex-col gap-16 items-center justify-center h-[55vh]">
          <h1 className="text-6xl font-bold">Key Features</h1>
          <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
              <Lock className="h-8 w-8 mb-2" />
              <h3 className="text-xl font-bold">Secure Encryption</h3>
              <p className="text-base text-gray-500 dark:text-gray-400 text-center">
                Your data is protected with industry-leading encryption
                technology.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
              <RefreshCw className="h-8 w-8 mb-2" />
              <h3 className="text-xl font-bold">Auto-Sync</h3>
              <p className="text-base text-gray-500 dark:text-gray-400 text-center">
                Your passwords sync automatically across all your devices.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
              <Share2 className="h-8 w-8 mb-2" />
              <h3 className="text-xl font-bold">Secure Sharing</h3>
              <p className="text-base text-gray-500 dark:text-gray-400 text-center">
                Share passwords securely with family members or colleagues.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className=" max-w-[1440px] mx-auto h-[60vh] flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold  sm:text-5xl">
            Start Securing Your Passwords Today
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Join thousands of users who trust SecurePass to manage their digital
            lives. Sign up now and take control of your online security.
          </p>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <form className="flex space-x-2">
            <Input
              className="max-w-lg flex-1"
              placeholder="Enter your email"
              type="email"
            />
            <Button type="submit">Sign Up</Button>
          </form>
        </div>
      </section>
      <footer className="border-t">
        <section className="flex justify-between p-8 max-w-[1440px] mx-auto">
          <p className="text-sm">
            © 2024 Password Manager. All rights reserved.
          </p>
          <div className="flex gap-4">
            <p className="text-sm hover:underline cursor-pointer">
              Terms of Service
            </p>
            <p className="text-sm hover:underline cursor-pointer">Privacy</p>
          </div>
        </section>
      </footer>
    </HomeLayout>
  );
}

export default HomePage;
