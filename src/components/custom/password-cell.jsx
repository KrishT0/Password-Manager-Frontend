import { useState } from "react";

// icon imports
import { Eye, EyeOff } from "lucide-react";

// shadcn UI imports
import { Input } from "../ui/input";

function PasswordCell({ password }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center">
      {!showPassword ? (
        <>
          <div className="w-[140px]">
            <Input
              type="password"
              value="password"
              readOnly
              className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <EyeOff
            className="h-5 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </>
      ) : (
        <>
          <div className=" w-[140px]">
            <Input
              type="text"
              value={password}
              readOnly
              className="px-0 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <Eye
            className="h-5  cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </>
      )}
    </div>
  );
}

export default PasswordCell;
