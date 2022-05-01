import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./store/authContext";
import SnackbarProvider from 'react-simple-snackbar';
export default function App() {
  return (
    <AuthProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SnackbarProvider>
    </AuthProvider>
  )
}
