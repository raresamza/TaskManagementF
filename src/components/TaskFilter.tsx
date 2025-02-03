import React from "react";
import { TaskFilterProps } from "../interface/TaskFileterProps";



const TaskFilter: React.FC<TaskFilterProps> = ({ searchTerm, onSearchTermChange }) => {
    return (
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />
    );
  };
  
  export default TaskFilter;