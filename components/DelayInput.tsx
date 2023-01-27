import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from '@react-native-material/core';

const DelayInput = ({ newProduct, index, indexInnerList, setautoFocusOn, setnewProduct, autoFocusOn, eInnerList }) => {
    const [txtVal, settxtVal] = useState()
    
  return (
    <TextInput
      placeholder="Enter price increase"
      onChangeText={(val) => {
        setTimeout(() => {
          const newOptionsList = structuredClone(newProduct);
          newOptionsList.options[index].optionsList[
            indexInnerList
          ].priceIncrease = val;
          setautoFocusOn({
            index: index,
            inputName: "priceIncrease",
            innerList: true,
            indexInnerList: indexInnerList,
          });
          setnewProduct(newOptionsList);
        }, 5000);
      }}
      value={eInnerList.priceIncrease}
      autoFocus={
        autoFocusOn.index === index &&
        autoFocusOn.innerList === true &&
        autoFocusOn.inputName === "priceIncrease" &&
        autoFocusOn.indexInnerList === indexInnerList
      }
      style={{ marginLeft: 20, marginRight: 20 }}
    />
  );
}

export default DelayInput