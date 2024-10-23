import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);

  const addExpense = () => {
    if (expense && amount) {
      setExpenses((prevExpenses) => [
        ...prevExpenses,
        { id: Math.random().toString(), expense, amount: parseFloat(amount) },
      ]);
      setExpense('');
      setAmount('');
    }
  };

  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((item) => item.id !== id));
  };

  const calculateGrossExpense = () => {
    return expenses.reduce((total, item) => total + item.amount, 0);
  };

  const renderExpenseItem = ({ item }) => (
    <TouchableOpacity style={styles.expenseItem} onPress={() => deleteExpense(item.id)}>
      <Text style={styles.expenseText}>{item.expense}: ₹{item.amount.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>
      <View style={styles.line} />

      <View style={styles.inputContainer}>
        <Icon name="money" size={20} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Expense"
          value={expense}
          onChangeText={setExpense}
          placeholderTextColor="#ccc"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Icon name="calculator" size={20} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          keyboardType="numeric"
          onChangeText={setAmount}
          placeholderTextColor="#ccc"
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={addExpense}>
          <Icon name="plus" size={20} color="#fff" />
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton} onPress={() => alert(`Gross Expense: ₹${calculateGrossExpense().toFixed(2)}`)}>
          <Icon name="bar-chart" size={20} color="#fff" />
          <Text style={styles.buttonText}>Gross</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2C2C54',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  line: {
    height: 2,
    backgroundColor: '#fff',
    marginBottom: 20,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    padding: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  iconButton: {
    backgroundColor: '#1D1D6B',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 100,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  expenseItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  expenseText: {
    fontSize: 18,
  },
});

export default App;
