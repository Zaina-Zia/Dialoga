/**
 * Authentication and role utilities
 */

export type UserRole = "superadmin" | "company" | "unknown";

/**
 * Get the current user's email from localStorage
 */
export const getCurrentUserEmail = (): string => {
  if (typeof window === "undefined") return "";
  return (
    localStorage.getItem("auth_email") ||
    localStorage.getItem("email") ||
    sessionStorage.getItem("auth_email") ||
    sessionStorage.getItem("email") ||
    ""
  );
};

/**
 * Get the current user's role based on email
 */
export const getUserRole = (): UserRole => {
  const email = getCurrentUserEmail();
  if (email === "superadmin@example.com") {
    return "superadmin";
  }
  if (email === "company@example.com" || (email && email !== "superadmin@example.com" && email !== "admin@example.com")) {
    return "company";
  }
  // Legacy support for admin@example.com (treat as superadmin)
  if (email === "admin@example.com") {
    return "superadmin";
  }
  return "unknown";
};

/**
 * Check if user is Super Admin
 */
export const isSuperAdmin = (): boolean => {
  return getUserRole() === "superadmin";
};

/**
 * Check if user is Company user
 */
export const isCompanyUser = (): boolean => {
  return getUserRole() === "company";
};

/**
 * Get redirect path based on user role
 */
export const getRedirectPath = (email: string, password: string): string => {
  if (!password.trim()) return "/dashboard";
  
  if (email === "superadmin@example.com" || email === "admin@example.com") {
    return "/admin-panel-page";
  }
  
  return "/dashboard";
};



