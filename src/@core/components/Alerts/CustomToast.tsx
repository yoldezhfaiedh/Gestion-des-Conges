import React from "react"
import { Toaster } from "react-hot-toast"

const Toast = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Define default options
        style: {
          borderRadius: "8px",
          background: "linear-gradient(90deg, #a1c4fd, #c2e9fb)",
          color: "#333",
          fontSize: "16px",
          padding: "12px 20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        duration: 5000,
      }}
    />
  )
}

export default Toast

