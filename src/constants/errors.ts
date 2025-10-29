// Centralized reusable error messages (English)
export const ERROR_MESSAGES = {
  invalidEmail: "Invalid email address.",
  requiredEmail: "Email is required.",
  requiredPassword: "Password is required.",
  requiredConfirmPassword: "Please confirm your new password.",
  passwordsMismatch: "Passwords do not match.",
  wrongCredentials: "Incorrect email or password.",
  resetEmailSent: "If an account exists with that email, we sent a reset link.",
  unknown: "Something went wrong. Please try again.",
} as const;

export type ErrorKey = keyof typeof ERROR_MESSAGES;
