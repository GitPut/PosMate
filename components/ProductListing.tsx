import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Button, TextInput } from '@react-native-material/core';

const ProductListing = () => {
  return (
    <ScrollView style={styles.modalContainer}>
      <Text style={styles.h2Black}>Name: {myObj.name}</Text>
      {myObj.description && (
        <Text style={styles.h2Black}>Name: {myObj.description}</Text>
      )}
      <Text style={[{ marginBottom: 25 }, styles.h2Black]}>Price: {total}</Text>
      {myObjProfile.options.map((e, index) => (
        <DisplayOption e={e} index={index} key={index} />
      ))}
      <TextInput
        placeholder="Write any extra info here.."
        multiline={true}
        onChangeText={(val) => setextraInput(val)}
        value={extraInput}
        style={{ marginTop: 15, marginBottom: 15 }}
        inputStyle={{ padding: 10 }}
      />
      <Button title="Add To Cart" onPress={AddToCart} style={styles.btn} />
      <Button
        title="Close"
        onPress={() => setModalVisible(false)}
        style={styles.btn}
      />
    </ScrollView>
  );
}

export default ProductListing