import React, {useState, useEffect } from 'react'
import { Badge, Button, Table } from 'react-bootstrap';
import api from '../../services/api';
import './index.css';
import { useNavigate } from "react-router-dom";

interface ITask {
    id:number;
    title: string;
    description: string;
    finished: boolean;
}

const Tasks: React.FC = () => {

    const navigate = useNavigate();
    const [tasks, getTask] = useState<ITask[]>([])

    useEffect(() => {
        loadTask();
    }, [])

    async function loadTask(){
        const response = await api.get('/Task');
        console.log(response);
        getTask(response.data);
    }

    function newTask(){
        navigate('/new_task');
    }

    function editTask(id: number){
        navigate(`/new_task/${id}`);
    }

    function viewTask(id: number){
        navigate(`/Task/${id}`);
    }

    async function finishedTask(id: number){
        await api.patch(`/Task/${id}`);
        loadTask();
    }
 
    async function deteleteTask(id: number){
        await api.delete(`/Task/${id}`);
        loadTask();
    }


    return (
        <div className="container">
            <br />
            <div className="task-header">
                <h1>Task page</h1>
                <Button variant="primary" size="sm" onClick={newTask} >New Task</Button>
            </div>
            
            <hr />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map(task => (
                            <tr>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>
                                    <Badge bg={ task.finished ? "success": "warning"} > 
                                        {task.finished ? "Finished" : "Waiting"}
                                    </Badge>
                                </td>
                                <td>
                                    <Button size="sm" disabled={task.finished} onClick={() => editTask(task.id)}>Update</Button>{' '}
                                    <Button size="sm" disabled={task.finished} variant="success" onClick={() => finishedTask(task.id)}>Finish</Button>{' '}
                                    <Button size="sm" variant="info" onClick={() => viewTask(task.id)} > Visualize</Button>{' '}
                                    <Button size="sm" variant="danger" onClick={() => deteleteTask(task.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}
export default Tasks;

