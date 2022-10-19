import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, TODOS_REF } from '../firebase/Config';

export const TodoCheckedItem = ({todoItem: {todoItem: title, done, id}}) => {

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

  const onRemove = async() => {
    try {
      await deleteDoc(doc(db, TODOS_REF, id));
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
      <Pressable>
        <Entypo name={'trash'} size={32} onPress={onRemove} />
      </Pressable>
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
    backgroundColor: 'lightgreen',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,
    minWidth: '60%'
  }
});