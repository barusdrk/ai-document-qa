import {
  FileSearch,
  LayoutDashboard,
  FileText,
  Upload,
  Moon,
  Sun,
} from "lucide-react";

import {
  useAuth,
} from "../context/AuthContext";

import {
  useTheme,
} from "../context/ThemeContext";

import ProfileMenu from "./ProfileMenu";

interface NavbarProps {
  onDashboard?: () => void;
  onDocuments?: () => void;
  onUpload?: () => void;
  onLogin?: () => void;
  onRegister?: () => void;
}

export default function Navbar({
  onDashboard,
  onDocuments,
  onUpload,
  onLogin,
  onRegister,
}: NavbarProps) {
  const { user } = useAuth();

  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-600 p-2 text-white">
            <FileSearch size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold">
              AI Document Q&A
            </h1>

            <p className="text-xs text-slate-500">
              Future SaaS Foundation
            </p>
          </div>

        </div>

        {/* Navigation */}

        {user && (
          <nav className="hidden items-center gap-2 lg:flex">

            <button
              onClick={
                onDashboard
              }
              className="flex items-center gap-2 rounded-xl px-4 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <LayoutDashboard
                size={18}
              />

              Dashboard
            </button>

            <button
              onClick={
                onDocuments
              }
              className="flex items-center gap-2 rounded-xl px-4 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <FileText
                size={18}
              />

              Documents
            </button>

            <button
              onClick={
                onUpload
              }
              className="flex items-center gap-2 rounded-xl px-4 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Upload
                size={18}
              />

              Upload
            </button>

          </nav>
        )}

        {/* Right Side */}

        <div className="flex items-center gap-3">

          <button
            onClick={
              toggleTheme
            }
            className="rounded-xl border border-slate-300 p-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme ===
            "dark" ? (
              <Sun
                size={20}
              />
            ) : (
              <Moon
                size={20}
              />
            )}
          </button>

          {user ? (
            <ProfileMenu
              onDashboard={
                onDashboard
              }
              onDocuments={
                onDocuments
              }
            />
          ) : (
            <div className="flex items-center gap-2">

              <button
                onClick={
                  onLogin
                }
                className="rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Login
              </button>

              <button
                onClick={
                  onRegister
                }
                className="rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                Register
              </button>

            </div>
          )}

        </div>

      </div>
    </header>
  );
}
