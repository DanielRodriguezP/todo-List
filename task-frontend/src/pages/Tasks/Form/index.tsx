import React, {useState, useEffect } from 'react'
import { ChangeEvent } from 'react';
import { Badge, Button, Form, Table } from 'react-bootstrap';
import api from '../../../services/api';
import { useNavigate, useParams } from "react-router-dom";

interface ITask {
    id: number;
    title: string;
    description: string;
    finished: boolean;
}

const TasksForm: React.FC = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const[model, setModel] = useState<ITask>({
        id: 0,
        title: "",
        description: "",
        finished: false
    });

    useEffect(() => {
        if(id !== undefined){
            findTask(id);
        }
    },[id]);


    function updateModel(e: ChangeEvent<HTMLInputElement>){
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function findTask(id:string){
        
        const response = await api.get(`Task/${id}`);

        setModel({
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            finished: false
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();

        console.log("valor id", id);
        if(id !== undefined){
            console.log("diferente entro")
            const response = await api.put(`/Task/${id}`, model);
        } else {
            console.log("igual entro")
            const response = await api.post('/Task', model);
        }

        goBack();   
    }

    function goBack(){
        navigate(-1);
    }

    return (
        <div className="container">

            <br />

            <div className="task-header">
                <h3>New Task</h3>
                <Button variant="primary" size="sm" onClick={goBack}>Return</Button>
            </div>
            
            <hr />

            <div className="container">

                <Form  onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="title" 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                            value={model.title} 
                        />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Description task</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3}
                            name="description"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} 
                            value={model.description} 
                        />
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form.Group>
                    
                </Form>

            </div>
        </div>
    )
}
export default TasksForm;

