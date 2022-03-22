import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import Navbar from '../components/Navbar';
import { GeneratedCodeArea } from '../components/GeneratedCode';
import Editor from '../pages/Editor';
import Login from '../pages/auth/Login';

export function AppRoutes () {

    return (
        <>
        <Navbar />
        <Routes >
            <Route path='/'  element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path="/editor" element={ <Editor /> } />
        </Routes>
        </>
    )
}