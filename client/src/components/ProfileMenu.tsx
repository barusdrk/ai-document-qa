import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

import {
  useAuth,
} from "../context/AuthContext";

interface ProfileMenuProps {
  onDashboard?: () => void;
  onDocuments?: () => void;
  onSettings?: () => void;
}

export default function ProfileMenu({
  onDashboard,
  onDocuments,
  onSettings,
}: ProfileMenuProps) {
  const {
    user,
    logout,
  } = useAuth();

  const [open, setOpen] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  if (!user) {
    return null;
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  function handleLogout() {
    logout();
    setOpen(false);
  }

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-3 py-2 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
          {initials}
        </div>

        <div className="hidden text-left md:block">
          <div className="font-medium">
            {user.name}
          </div>

          <div className="text-xs text-slate-500">
            {user.email}
          </div>
        </div>

        <ChevronDown
          size={18}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-72 rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <div className="border-b border-slate-200 p-5 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                {initials}
              </div>

              <div>
                <h3 className="font-semibold">
                  {user.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <button
              onClick={() => {
                setOpen(false);
                onDashboard?.();
              }}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button
              onClick={() => {
                setOpen(false);
                onDocuments?.();
              }}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <FileText size={18} />
              My Documents
            </button>

            <button
              onClick={() => {
                setOpen(false);
                onSettings?.();
              }}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Settings size={18} />
              Settings
            </button>

            <hr className="my-2 border-slate-200 dark:border-slate-700" />

            <button
              onClick={
                handleLogout
              }
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
