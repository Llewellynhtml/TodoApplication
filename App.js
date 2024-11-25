import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { createTask, getTasks, updateTask, deleteTask } from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [preference, setPreference] = useState("");
  const [Status, setStatus] = useState("");  
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const taskData = await getTasks();
    console.log("Fetched tasks:", taskData); 
    setTasks(taskData);
  };

  const handleTaskSubmit = async () => {
    const newTask = {
      name: taskName,
      avatarUrl: avatarUrl,
      preference: preference,
      Status: Status, 
    };

    if (isEditing) {
      await updateTask(currentTaskId, newTask);
      setIsEditing(false);
    } else {
      await createTask(newTask);
    }

    setTaskName("");
    setAvatarUrl("");
    setPreference("");
    setStatus("");  
    fetchTasks();
  };

  const handleEditTask = (taskId, task) => {
    setIsEditing(true);
    setCurrentTaskId(taskId);
    setTaskName(task.name);
    setAvatarUrl(task.avatarUrl);
    setPreference(task.preference);
    setStatus(task.Status);  
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    fetchTasks();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task name"
          value={taskName}
          onChangeText={setTaskName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Avatar URL"
          value={avatarUrl}
          onChangeText={setAvatarUrl}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter preference"
          value={preference}
          onChangeText={setPreference}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter status"
          value={Status}
          onChangeText={setStatus}  
        />
        <Button
          title={isEditing ? "Update Task" : "Add Task"}
          onPress={handleTaskSubmit}
          color="#FF6347"  
        />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <View style={styles.taskHeader}>
              <Text style={styles.taskTitle}>{item.name}</Text>
              <Text style={[styles.taskStatus, item.Status === 'Completed' ? styles.completedStatus : styles.pendingStatus]}>
                {item.Status}
              </Text>
            </View>
            <Text style={styles.taskText}>Created At: {item.createdAt}</Text>
            <Text style={styles.taskText}>Avatar: {item.avatar}</Text>
            <Text style={styles.taskText}>Preference: {item.preference}</Text>

            <View style={styles.actionContainer}>
              <TouchableOpacity onPress={() => handleEditTask(item.id, item)}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f9",  
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#333",
  },
  formContainer: {
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,  
  },
  input: {
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff", 
    borderColor: "#ddd", 
  },
  taskCard: {
    backgroundColor: "#fff",  
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  taskStatus: {
    fontSize: 16,
    fontWeight: "bold",
  },
  completedStatus: {
    color: "#28a745", 
  },
  pendingStatus: {
    color: "#ffc107", 
  },
  taskText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  editText: {
    color: "#007BFF", 
    fontSize: 16,
  },
  deleteText: {
    color: "#FF4136", 
    fontSize: 16,
  },
});
