import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';

interface StageStepViewProps {
    step: number,
    stageLbl: string,
    stageDesc: string,
    stageNum: number
    }

const StageStepView = ({ step, stageLbl, stageDesc, stageNum } : StageStepViewProps) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{
          fontWeight: "600",
          color: "rgba(255,255,255,1)",
          fontSize: 30,
          opacity: step <= stageNum ? 1 : 0.5,
        }}
      >
        {step}
      </Text>
      <View style={styles.subscription1StackStack}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontWeight: "600",
              color: "rgba(255,255,255,1)",
              fontSize: 25,
              marginRight: 25,
              opacity: step <= stageNum ? 1 : 0.5,
            }}
          >
            {stageLbl}
          </Text>
          {step < stageNum && (
            <View style={styles.stageChecked}>
              <Entypo name="check" style={styles.checkedIcon} />
            </View>
          )}
        </View>
        <Text
          style={{
            fontWeight: "500",
            color: "rgba(155,155,155,1)",
            fontSize: 22,
            opacity: step <= stageNum ? 1 : 0.5,
          }}
        >
          {stageDesc}
        </Text>
      </View>
    </View>
  );
};

export default StageStepView

const styles = StyleSheet.create({
  subscription1StackStack: {
    width: 252,
    height: 50,
    marginLeft: 42,
  },
  stageChecked: {
    width: 26,
    height: 26,
    backgroundColor: "rgba(10,188,27,1)",
    borderRadius: 13,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 90,
    shadowOpacity: 0.54,
    shadowRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 18,
  },
});