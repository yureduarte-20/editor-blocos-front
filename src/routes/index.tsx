import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Home } from '../pages/Home';
import Navbar from '../components/Navbar';
import { GeneratedCodeArea } from '../components/GeneratedCode';
import Editor from '../pages/Editor';
import Login from '../pages/auth/Login';
import { useAuth } from '../store/authContext';


function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.token) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
export function AppRoutes() {

    return (
        <>
            <Navbar />
            <Routes >
                <Route  path='/' element={
                    <RequireAuth>
                        <Home />
                    </RequireAuth>
                } />
                <Route path="/editor" element={
                    <RequireAuth>
                        <Editor />
                    </RequireAuth>
                } />
                <Route path='/login' element={<Login />} />
            </Routes>
        </>
    )
}