import React, { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../api/api";
import { Task } from "../interface/Task";
import TaskFilter from "./TaskFilter";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import { Edit, Delete, CheckCircle } from "@mui/icons-material";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    fetchTasks();
  };

  const toggleCompletion = async (task: Task) => {
    await updateTask(task.id, { ...task, isCompleted: !task.isCompleted });
    fetchTasks();
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditedTitle("");
    setEditedDescription("");
  };

  const handleSaveEdit = async () => {
    if (editingTask) {
      await updateTask(editingTask.id, {
        ...editingTask,
        title: editedTitle,
        description: editedDescription,
      });
      fetchTasks();
      setEditingTask(null);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>
      <TaskFilter searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      <Grid container spacing={2}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card elevation={3} sx={{ padding: "16px", borderRadius: "10px" }}>
              <CardContent>
                {editingTask && editingTask.id === task.id ? (
                  <>
                    <TextField
                      fullWidth
                      label="Title"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="Description"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      margin="dense"
                      multiline
                      rows={3}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSaveEdit}
                      sx={{ marginTop: "10px", marginRight: "5px" }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleCancelEdit}
                      sx={{ marginTop: "10px" }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {task.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={task.isCompleted ? "success.main" : "error.main"}
                      sx={{ marginTop: "5px" }}
                    >
                      Status: {task.isCompleted ? "Completed ✅" : "Pending ⏳"}
                    </Typography>
                    <IconButton
                      color={task.isCompleted ? "warning" : "success"}
                      onClick={() => toggleCompletion(task)}
                    >
                      <CheckCircle />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleEditClick(task)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(task.id)}>
                      <Delete />
                    </IconButton>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TaskList;
