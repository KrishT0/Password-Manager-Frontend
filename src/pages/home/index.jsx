import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HomepageSignup from "@/pages/home/HomepageSignup";

//lucid icon imports
import { Lock, RefreshCw, Share2, Github } from "lucide-react";

//shadcn UI imports
import { Button } from "@/components/ui/button";

function HomePage() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div>
      <header>
        <nav className="max-w-[1440px] mx-auto flex justify-between items-center p-2">
          <h1 className="text-lg font-semibold border p-1 rounded-full">PM</h1>
          <Link
            to={isAuthenticated ? "/dashboard" : "/auth"}
            className="text-primary hover:text-primary/80 transition-all duration-200"
          >
            {isAuthenticated ? "Dashboard" : "Login"}
          </Link>
        </nav>
      </header>
      <section className="max-w-[1440px] mx-auto p-2 flex justify-center gap-3 min-[1000px]:gap-5 flex-col items-center h-[60vh] sm:h-[85vh] relative">
        <div className="absolute bg-blue-800 h-56 sm:h-64  md:h-96 aspect-square  rounded-full filter blur-[70px] sm:blur-[100px] md:blur-[130px] -z-10"></div>
        <motion.h1
          className="text-3xl sm:text-5xl min-[1000px]:text-7xl text-primary font-bold"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Secure Your Digital Life
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl min-[1000px]:text-2xl font-normal sm:w-1/2 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Manage all your passwords in one secure place. Stay protected with our
          Password Manager.
        </motion.p>
        <motion.div
          className="space-x-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/auth">
            <Button className="min-[1000px]:text-lg">Get Started</Button>
          </Link>
          <Link to="/auth">
            <Button variant="outline" className=" min-[1000px]:text-lg ">
              Learn More
            </Button>
          </Link>
        </motion.div>
      </section>
      <section className="max-w-[1440px] mx-auto p-2 pb-5 flex flex-col overflow-hidden gap-16 items-center justify-center my-20">
        <motion.h1
          className="text-4xl mt-5 md:text-6xl font-bold"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Key Features
        </motion.h1>
        <div className="grid gap-16 sm:grid-cols-2 md:grid-cols-3 ">
          <motion.div
            className="flex flex-col items-center overflow-hidden space-y-2 border-gray-800 border p-5 rounded-lg relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute blur-3xl -z-10 bg-yellow-900 aspect-square rounded-full h-44"></div>
            <Lock className="h-10 w-10 mb-2" />
            <h3 className="text-xl font-bold">Secure Encryption</h3>
            <p className="text-lg font-semibold text-gray-400  text-center">
              Your data is protected with industry-leading encryption
              technology.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center overflow-hidden relative space-y-2 border border-gray-800  p-5 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute blur-3xl -z-10 bg-yellow-900 aspect-square rounded-full h-44"></div>
            <RefreshCw className="h-10 w-10 mb-2" />
            <h3 className="text-xl font-bold">Auto-Sync</h3>
            <p className="text-lg font-semibold text-gray-400 text-center">
              Your passwords sync automatically across all your devices.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center overflow-hidden relative space-y-2 border-gray-800 border p-5 rounded-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute blur-3xl -z-10 bg-yellow-900 aspect-square rounded-full h-44"></div>
            <Share2 className="h-10 w-10 mb-2" />
            <h3 className="text-xl font-bold">Secure Sharing</h3>
            <p className="text-lg font-semibold text-gray-400 text-center">
              Share passwords securely with family members or colleagues.
            </p>
          </motion.div>
        </div>
      </section>
      <section className=" max-w-[1440px] px-2 mx-auto overflow-hidden h-[60vh] flex flex-col items-center justify-center space-y-4 text-center relative">
        <div className="absolute aspect-square w-60 rounded-full -bottom-32 -z-10 fliter blur-[80px] bg-blue-600"></div>
        <div className="space-y-2">
          <motion.h2
            className="text-3xl font-semibold  sm:text-5xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Start Securing Your Passwords Today
          </motion.h2>
          <motion.p
            className="max-w-[900px] text-lg sm:text-xl md:text-2xl text-gray-400"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Join thousands of users who trust Password Manager to manage their
            digital lives. Subscribe to our newsletter and get regular updates.
          </motion.p>
        </div>
        <HomepageSignup />
      </section>
      <footer className="border-t">
        <section className="flex flex-col items-center gap-2 sm:flex-row justify-between py-4 px-1 sm:p-8 max-w-[1440px] mx-auto">
          <p className="text-sm">
            © {new Date().getFullYear()} Password Manager. All rights reserved.
          </p>
          <div className="flex gap-1 text-sm  items-center">
            Made by <span className="font-semibold">KrishT0</span>
            <a
              href="https://github.com/KrishT0/Password-Manager-Frontend"
              target="_blank"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </section>
      </footer>
    </div>
  );
}

export default HomePage;
