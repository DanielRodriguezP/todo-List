import React, { useState, useEffect } from "react";
import { Button, Card, Badge } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
}

const Detail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    findTask();
  }, [id]);

  async function findTask() {
    const response = await api.get<ITask>(`/Task/${id}`);
    console.log(response);
    setTask(response.data);
  }

  function goBack() {
    navigate(-1);
  }
  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Task Detail</h1>
        <Button variant="primary" size="sm" onClick={goBack}>
          {" "}
          Return{" "}
        </Button>
      </div>
      <hr />
      <Card>
        <Card.Body>
          <Card.Title>{task?.title}</Card.Title>
          <Card.Text>
            {task?.description}
            <br />
            <Badge bg={task?.finished ? 'success' : 'warning'}>
                {task?.finished ? "FINALIZADO" : "PENDIENTE"}
            </Badge>
            <br />
            
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Detail;
