import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Home } from '../pages/Home';
import Navbar from '../components/Navbar';
import { GeneratedCodeArea } from '../components/GeneratedCode';
import Editor from '../pages/Editor';
import Login from '../pages/auth/Login';
import { useAuth } from '../store/authContext';
import Signup from '../pages/auth/Signup';
import LevelSelect from '../pages/exercise/LevelSelect';
import Exercises from '../pages/exercise/Exercises';
import Show from '../pages/Show';
import Profile from '../pages/Profile';
import { Roles, useUser } from '../store/userContext';
import IssuesList from '../pages/admin/IssuesList';
import IssueEdit from '../pages/admin/IssueEdit';
import IssueCreate from '../pages/admin/IssueCreate';



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

function RequireAdmin({ children }: { children: JSX.Element }) {
    const user = useUser();
    let location = useLocation();
    if (user.role != Roles.ADMIN) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children
}
export function AppRoutes() {

    return (
        <>

            <Navbar />

            <Routes >
                <Route path="/admin/issues" element={
                    <RequireAuth >
                        <RequireAdmin>
                            <IssuesList />
                        </RequireAdmin>
                    </RequireAuth>
                } />
                <Route path="/admin/issue/:issueId" element={
                    <RequireAuth >
                        <RequireAdmin>
                            <IssueEdit />
                        </RequireAdmin>
                    </RequireAuth>
                } />
                <Route path="/admin/issue/create" element={
                    <RequireAuth >
                        <RequireAdmin>
                            <IssueCreate />
                        </RequireAdmin>
                    </RequireAuth>
                } />

                <Route path='/' element={
                    <RequireAuth>
                        <Home />
                    </RequireAuth>
                } />
                <Route path="/editor/:id" element={
                    <RequireAuth>
                        <Editor />
                    </RequireAuth>
                } />
                <Route path='/signup' element={<Signup />} />
                <Route path='/exercicios' element={
                    <RequireAuth>
                        <LevelSelect />
                    </RequireAuth>
                } />
                <Route path='/submissoes/:id' element={
                    <RequireAuth>
                        <Show />
                    </RequireAuth>
                } />
                <Route path='/exercicios/:dificultyLevel' element={
                    <RequireAuth>
                        <Exercises />
                    </RequireAuth>
                } />
                <Route path='/perfil' element={
                    <RequireAuth>
                        <Profile />
                    </RequireAuth>
                } />
                <Route path='/login' element={<Login />} />
                <Route path="*" element={<div><p>Not FOund</p></div>} />
            </Routes>
        </>
    )
}