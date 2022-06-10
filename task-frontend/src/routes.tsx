import React from 'react';
import {
    Routes,
    Route,
  } from "react-router-dom";

import Home from "./pages/Home";
import Tasks from './pages/Tasks';
import TasksForm from './pages/Tasks/Form';
import TasksDetail from './pages/Tasks/Detail';


const AppRouter: React.FC = () => {
    return (
        <Routes>
        <Route
            path="/"
            element={<Home /> } 
        />

        <Route
            path="/task"
            element={ <Tasks /> } />

        <Route
            path="/new_task"
            element={ <TasksForm /> } />

        <Route
            path="/new_task/:id"
            element={ <TasksForm /> } />

        <Route
            path="/task/:id"
            element={ <TasksDetail /> } />
    </Routes>
    );
}

export default AppRouter;
