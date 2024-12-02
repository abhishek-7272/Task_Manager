import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    tasks: [],
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        toggleTaskCompletion: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        }
    }
})

export const {addTask, deleteTask , toggleTaskCompletion} = tasksSlice.actions;

export default tasksSlice.reducer;