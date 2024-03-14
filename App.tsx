import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';

interface TodoItem {
  id: string;
  title: string;
}

const TodoApp: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Math.random().toString(),
        title: newTodo.trim(),
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const removeTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <View style={styles.addTodoContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập công việc mới"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <Button title="Thêm" onPress={addTodo} />
      </View>
      <FlatList
        data={todos}
        renderItem={({item}) => (
          <View style={styles.todoItem}>
            <Text>{item.title}</Text>
            <Button title="Xóa" onPress={() => removeTodo(item.id)} />
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  addTodoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default TodoApp;
