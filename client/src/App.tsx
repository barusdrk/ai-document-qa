import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import LoadingSpinner from "./components/LoadingSpinner";

import { useAuth } from "./context/AuthContext";

export default function App() {
  const {
    user,
    loading,
  } = useAuth();

  const [
    isRegistering,
    setIsRegistering,
  ] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950">
      <Navbar />

      <main className="flex-1">
        {user ? (
          <Dashboard />
        ) : (
          <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-12">
            <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-900">
              <h1 className="mb-2 text-3xl font-bold text-center">
                AI Document Q&amp;A
              </h1>

              <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
                Upload documents, search them semantically, and ask AI-powered
                questions with cited sources.
              </p>

              {isRegistering ? (
                <RegisterForm
                  onLogin={() =>
                    setIsRegistering(false)
                  }
                />
              ) : (
                <LoginForm
                  onRegister={() =>
                    setIsRegistering(true)
                  }
                />
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
