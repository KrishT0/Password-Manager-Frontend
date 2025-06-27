export function generatePassword() {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const special = "!@#$%^&*()_+";
  const allChars = lower + upper + digits + special;

  let newPassword = "";
  const length = 12;

  newPassword += lower[Math.floor(Math.random() * lower.length)];
  newPassword += upper[Math.floor(Math.random() * upper.length)];
  newPassword += digits[Math.floor(Math.random() * digits.length)];
  newPassword += special[Math.floor(Math.random() * special.length)];

  for (let i = 4; i < length; i++) {
    newPassword += allChars[Math.floor(Math.random() * allChars.length)];
  }

  newPassword = newPassword
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return newPassword;
}
