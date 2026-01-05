import React from "react";
import type { FieldErrors, UseFormRegister, FieldValues, Path } from "react-hook-form";

// 1. Define a base interface for common fields
interface BaseFormFields extends FieldValues {
  email: string;
  password: string;
  fullname?: string; // Make it optional here so it's "safe" to reference
}

interface AuthFormProps<T extends BaseFormFields> {
  title: string;
  submitLabel: string;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  loading?: boolean;
  showFullname?: boolean;
}

// 2. Add <T extends BaseFormFields> to the function definition
const AuthForm = <T extends BaseFormFields>({
  submitLabel,
  onSubmit,
  register,
  errors,
  loading,
  showFullname = false,
}: AuthFormProps<T>) => {
  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
     
      {showFullname && (
        <div>
          <label className="block text-sm text-gray-400 mb-1">Full name</label>
          <input
            {...register("fullname" as Path<T>)}
            className={`w-full rounded-lg bg-neutral-800 px-3 py-2
              text-white outline-none ring-1 ring-neutral-700
              focus:ring-2 focus:ring-indigo-600
              ${errors.fullname ? "ring-red-500" : ""}`}
            placeholder="John Doe"
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullname.message as string}
            </p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm text-gray-400 mb-1">Email address</label>
        <input
          {...register("email" as Path<T>)}
          className={`w-full rounded-lg bg-neutral-800 px-3 py-2
            text-white outline-none ring-1 ring-neutral-700
            focus:ring-2 focus:ring-indigo-600
            ${errors.email ? "ring-red-500" : ""}`}
          placeholder="email@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message as string}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Password</label>
        <input
          type="password"
          {...register("password" as Path<T>)}
          className={`w-full rounded-lg bg-neutral-800 px-3 py-2
            text-white outline-none ring-1 ring-neutral-700
            focus:ring-2 focus:ring-indigo-600
            ${errors.password ? "ring-red-500" : ""}`}
          placeholder="********"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message as string}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-indigo-600 py-3
          font-semibold text-white hover:bg-indigo-500 transition-colors
          shadow-lg shadow-indigo-600/30 disabled:opacity-50"
      >
        {loading ? "Loading..." : submitLabel}
      </button>
    </form>
  );
};

export default AuthForm;