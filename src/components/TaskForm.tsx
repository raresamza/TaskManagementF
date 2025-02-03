import React, { useState } from "react";
import { createTask } from "../api/api";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

const TaskForm: React.FC<{ onTaskAdded: () => void }> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await createTask({ title, description });
    setTitle("");
    setDescription("");
    onTaskAdded();
  };

  return (
    <Card elevation={3} sx={{ padding: "16px", marginBottom: "20px" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Create Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            margin="dense"
          />
          <TextField
            fullWidth
            label="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            margin="dense"
            multiline
            rows={3}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "10px" }}
            fullWidth
          >
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;