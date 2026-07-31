import {
  useState,
  type FormEvent,
} from "react";

import { useAuth } from "../context/AuthContext";

interface LoginFormProps {
  onRegister?: () => void;
}

export default function LoginForm({
  onRegister,
}: LoginFormProps) {
  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [error, setError] =
    useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login({
        email,
        password,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          required
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Password
        </label>

        <input
          type="password"
          required
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Signing in..."
          : "Sign In"}
      </button>

      {onRegister && (
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onRegister}
            className="font-medium text-blue-600 hover:underline"
          >
            Create one
          </button>
        </p>
      )}
    </form>
  );
}
