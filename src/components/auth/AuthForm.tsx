import * as React from "react";

export type AuthFormProps = React.FormHTMLAttributes<HTMLFormElement>;

/**
 * AuthForm
 * Shared form container. Keep minimal defaults so page-level classes
 * control exact width/spacing.
 */
export function AuthForm({ className = "", ...props }: AuthFormProps) {
  return <form className={className} {...props} />;
}
