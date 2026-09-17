import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useApp } from "../context/AppContext";

export function Toast() {
  const { toast, notify } = useApp();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case "error":
        return <AlertCircle size={20} className="toast-icon" />;
      case "info":
        return <Info size={20} className="toast-icon" />;
      default:
        return <CheckCircle2 size={20} className="toast-icon" />;
    }
  };

  return (
    <div className={`toast-notification ${toast.type || "success"}`}>
      {getIcon()}
      <span className="toast-msg">{toast.message}</span>
      <button
        className="toast-close"
        onClick={() => notify(null)}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default Toast;
