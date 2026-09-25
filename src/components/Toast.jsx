"use client";
import { createContext, useContext, useCallback } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const showToast = useCallback((msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes("already") || lower.includes("full") || lower.includes("max")) {
      toast.warning(msg);
    } else if (lower.includes("removed") || lower.includes("remove")) {
      toast.info(msg);
    } else {
      toast.success(msg);
    }
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={2200}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        draggable="touch"
        theme="light"
        transition={Bounce}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be within ToastProvider");
  return ctx;
}
