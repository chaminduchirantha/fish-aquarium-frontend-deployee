import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Success
export const showSuccessAlert = (title: string, message?: string) => {
  return Swal.fire({
    title,
    text: message,
    icon: "success",
    confirmButtonColor: "#10B981",
    confirmButtonText: "OK ✓",
  });
};

// Error
export const showErrorAlert = (title: string, message?: string) => {
  return Swal.fire({
    title,
    text: message,
    icon: "error",
    confirmButtonColor: "#EF4444",
    confirmButtonText: "Try Again",
  });
};

// Warning
export const showWarningAlert = (title: string, message?: string) => {
  return Swal.fire({
    title,
    text: message,
    icon: "warning",
    confirmButtonColor: "#F59E0B",
    confirmButtonText: "OK",
  });
};

// Info
export const showInfoAlert = (title: string, message?: string) => {
  return Swal.fire({
    title,
    text: message,
    icon: "info",
    confirmButtonColor: "#3B82F6",
    confirmButtonText: "Got it",
  });
};

// Confirm Dialog
export const showConfirmDialog = (
  title: string,
  message: string,
  confirmButtonText = "Yes",
  cancelButtonText = "No"
) => {
  return Swal.fire({
    title,
    text: message,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3B82F6",
    cancelButtonColor: "#EF4444",
    confirmButtonText,
    cancelButtonText,
  });
};
