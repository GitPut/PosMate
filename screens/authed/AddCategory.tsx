import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "state/firebaseConfig";
import firebase from "firebase/app";

const AddCategory = ({ setaddCategoryModal }) => {
  const [name, setname] = useState("");

  function AddToDb() {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        categories: firebase.firestore.FieldValue.arrayUnion(name),
      })
      .then(() => setaddCategoryModal(false));
  }

  return (
    <View>
      <Text>AddCategory</Text>
      <TextInput
        placeholder="Enter Category Name"
        value={name}
        onChangeText={(val) => setname(val)}
      />
      <Button title="Enter" onPress={() => AddToDb()} />
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({});
