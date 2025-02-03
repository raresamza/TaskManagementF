import React from "react";
import { TaskFilterProps } from "../interface/TaskFileterProps";
import { TextField } from "@mui/material";


const TaskFilter: React.FC<TaskFilterProps> = ({ searchTerm, onSearchTermChange }) => {
    return (
        <TextField
        fullWidth
        label="Search tasks..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        margin="dense"
        variant="outlined"
      />
    );
  };
  
  export default TaskFilter;