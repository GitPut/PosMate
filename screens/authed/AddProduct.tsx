import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "state/firebaseConfig";
import firebase from "firebase/app";
import DropDownPicker from "react-native-dropdown-picker";

const AddProduct = ({ setaddProductModal, categories }) => {
  const [name, setname] = useState();
  const [price, setprice] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (items.length == 0) {
      categories.forEach((element) => {
        setItems((prev) => [...prev, { label: element, value: element }]);
      });
    }
  }, [categories]);

  function AddToDb() {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        products: firebase.firestore.FieldValue.arrayUnion({
          name: name,
          price: price,
          category: value,
        }),
      })
      .then(() => setaddProductModal(false));
  }

  return (
    <View>
      <Text>AddProduct</Text>
      <TextInput
        placeholder="Enter Product Name"
        value={name}
        onChangeText={(val) => setname(val)}
      />
      <TextInput
        placeholder="Enter Product Price"
        value={price}
        onChangeText={(val) => setprice(val)}
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <Button title="Enter" onPress={() => AddToDb()} />
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({});
