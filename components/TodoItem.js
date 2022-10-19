import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { doc, updateDoc } from 'firebase/firestore';
import { db, TODOS_REF } from '../firebase/Config';

export const TodoItem = ({todoItem: {todoItem: title, done, id}}) => {

  const [doneState, setDone] = useState(done);

  const onCheck = async() => {
    try {
      setDone(!doneState);
      await updateDoc(doc(db, TODOS_REF, id), {
        todoItem: title,
        done: !doneState 
      })
    }
    catch(error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.todoItem}>
      <Pressable onPress={onCheck}>
        {doneState 
          ? <MaterialIcons name={'check-box'} size={32} />
          : <MaterialIcons name={'check-box-outline-blank'} size={32} />}
      </Pressable>
      <Text onPress={onCheck}style={styles.todoText}>{title}</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  todoText: {
    borderColor: '#afafaf',
    backgroundColor: 'lightblue',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,
    minWidth: '60%'
  }
});