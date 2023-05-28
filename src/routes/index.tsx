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
import { Roles, Services, useUser } from '../store/userContext';
import ProblemsList from '../pages/admin/ProblemsList';
import ProblemEdit from '../pages/admin/ProblemEdit';
import ProblemCreate from '../pages/admin/ProblemCreate';
import AdvisorChat from '../pages/advisor/Chat';
import Doubts from '../pages/advisor/Doubts';
import Chat from '../pages/Chat';
import ProblemShow from '../pages/advisor/ProblemShow';



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
function RequireAdvisor({ children, service }: { children: JSX.Element, service?: Services }) {
    let user = useUser()
    let location = useLocation();
    if (user.role == Roles.ADVISOR) {
        return children
    }
    return <Navigate to="/" state={{ from: location }} replace />;

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
                <Route path="/admin/problems" element={
                    <RequireAuth >
                        <RequireAdmin>
                            <ProblemsList />
                        </RequireAdmin>
                    </RequireAuth>
                } />
                <Route path="/admin/problem/:problemId" element={
                    <RequireAuth >
                        <RequireAdmin>
                            <ProblemEdit />
                        </RequireAdmin>
                    </RequireAuth>
                } />
                <Route path="/admin/problem/create" element={
                    <RequireAuth >
                        <RequireAdmin>
                            <ProblemCreate />
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
                <Route path='/orientador/chat'
                    element={
                        <RequireAuth>
                            <RequireAdvisor service={Services.CHAT_SERVICE}>
                                <AdvisorChat />
                            </RequireAdvisor>
                        </RequireAuth>
                    }
                />
                <Route path='/orientador/duvidas'
                    element={
                        <RequireAuth>
                            <RequireAdvisor service={Services.CHAT_SERVICE}>
                                <Doubts />
                            </RequireAdvisor>
                        </RequireAuth>
                    }
                />
                <Route path="/orientador/problema/:id" element={
                    <RequireAuth>
                        <RequireAdvisor service={Services.PROBLEM_SERVICE}>
                            <ProblemShow />
                        </RequireAdvisor>
                    </RequireAuth>
                } />
                <Route path='chat'
                    element={
                        <RequireAuth>
                            <Chat />
                        </RequireAuth>
                    }
                />
                <Route path='/perfil' element={
                    <RequireAuth>
                        <Profile />
                    </RequireAuth>
                } />
                <Route path='/login' element={<Login />} />
                <Route path="*" element={<div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }} ><p>Not Found</p></div>} />
                <Route path="*" element={<div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }} ><p>Not Found</p></div>} />
            </Routes>
        </>
    )
}