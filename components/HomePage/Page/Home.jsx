import React, { useState, useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, toggleTaskCompletion } from '../../../redux/reducers/tasksReducer';

const Home = () => {

    const [taskName, setTaskName] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [showBlogs, setShowBlogs] = useState(false);

    const tasks = useSelector(state => state.tasks.tasks)
    const dispatch = useDispatch();

    const handleAddTask = () => {
        if (typeof taskName !== 'string' || !taskName.trim()) {
            alert('Please add name of the task');
            return;
        }
        if (taskName.trim()) {
            dispatch(addTask({ id: Date.now().toString(), name: taskName, completed: false }))
            setTaskName('');
        }
    }

    const renderTask = ({ item }) => (
        <View style={styles.task}>
            <TouchableOpacity onPress={() => dispatch(toggleTaskCompletion(item.id))} style={styles.taskTextContainer}>
                <Text style={[styles.taskText, item.completed && styles.completedTask]}>
                    {item.name}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(deleteTask(item.id))} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    const renderBlog = ({ item }) => (
        <View style={styles.blog}>
            <Text style={styles.blogTitle}>{item.title}</Text>
            <Text style={styles.blogBody}>{item.body}</Text>
        </View>
    );

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
    
        fetchBlogs();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Task Manager</Text>
            <Text style={styles.todos}>Add Task</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a task"
                    value={taskName}
                    onChangeText={text => setTaskName(text)}
                />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>
            <Text style={styles.todos}>Todos List</Text>
            <FlatList data={tasks} renderItem={renderTask} />
            
            <TouchableOpacity 
                style={styles.toggleButton} 
                onPress={() => setShowBlogs(prevState => !prevState)}
            >
                <Text style={styles.toggleButtonText}>
                    {showBlogs ? 'Show Tasks' : 'Show Blogs'}
                </Text>
            </TouchableOpacity>

            {showBlogs && (
                <View>
                    <Text style={styles.todos}>Blogs</Text>
                    <FlatList data={blogs} renderItem={renderBlog} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
        color: '#4CAF50',
    },
    todos: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 5,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    task: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    taskTextContainer: {
        flex: 1, 
        marginRight: 10,
    },
    taskText: {
        fontSize: 16,
        flexWrap: 'wrap',
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    toggleButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toggleButtonText: {
        color: 'white',
        fontSize: 16,
    },
    blog: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    blogTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    blogBody: {
        fontSize: 16,
        color: '#555',
        marginTop: 10,
    },
});


export default Home
