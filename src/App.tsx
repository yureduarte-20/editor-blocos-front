import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./store/authContext";
import GlobalStylesSet from "./styles/global";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { UserProvider } from "./store/userContext";

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <GlobalStylesSet />
          <ReactNotifications />
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  )
}
