import { View, Text, Modal, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";

//typscript type for props
type Props = {
  children: React.ReactNode;
  step: number;
  helpDescription: string;
  isLastStep?: boolean | undefined;
  stepDetails: number;
  setStepDetails: (prev: { complete: boolean; step: number }) => void;
  changePreviousBtnFunc?: () => void;
  changeFinishBtnFunc?: () => void;
  changeNextBtnFunc?: () => void;
  alignInfo?: "left" | "right" | "center";
};

const TutorialStep = (props: Props) => {
  const {
    children,
    step,
    helpDescription,
    isLastStep,
    stepDetails,
    setStepDetails,
    changeNextBtnFunc,
    alignInfo,
    changePreviousBtnFunc,
    changeFinishBtnFunc,
  } = props;

  // X
  const [x, setX] = useState();

  // Y
  const [y, setY] = useState();

  //childrenWidth
  const [childrenWidth, setChildrenWidth] = useState();

  //DescriptionViewWidth
  const [descriptionViewWidth, setDescriptionViewWidth] = useState();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  //make useeffect that logs each usestate that changes
  // useEffect(() => {
  //   console.log("x", x);
  // }, [x]);

  // useEffect(() => {
  //   console.log("y", y);
  // }, [y]);

  // useEffect(() => {
  //   console.log("childrenWidth", childrenWidth);
  // }, [childrenWidth]);

  // useEffect(() => {
  //   console.log("descriptionViewWidth", descriptionViewWidth);
  // }, [descriptionViewWidth]);

  const fadeIn = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
      delay: 500,
    }).start();
  };

  const fadeOut = (afterFunc) => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(afterFunc);
  };

  useEffect(() => {
    if (step === stepDetails.step && stepDetails.complete === false) {
      fadeIn();
    }
  }, []);

  return (
    <View
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        setX(layout.left);
        setY(layout.top);
        setChildrenWidth(layout.width);
      }}
    >
      {children}
      {step === stepDetails.step && stepDetails.complete === false && (
        <Modal transparent>
          <Animated.View
            style={[
              {
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "absolute",
                height: "100%",
                width: "100%",
              },
              { opacity: fadeAnim },
            ]}
          >
            <View style={{ position: "absolute", top: y, left: x }}>
              {children}
            </View>
            <View
              onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                setDescriptionViewWidth(layout.width);
              }}
              style={[
                {
                  position: "absolute",
                  top: y + 100,
                  left: x - descriptionViewWidth / 2 + 20,
                  padding: 20,
                  backgroundColor: "white",
                },
                alignInfo === "left" && {
                  left: x - descriptionViewWidth + childrenWidth,
                },
                alignInfo === "right" && {
                  left: x,
                },
                alignInfo === "center" && {
                  left: x - descriptionViewWidth / 2,
                },
              ]}
            >
              <View
                style={[
                  {
                    width: 0,
                    height: 0,
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderLeftWidth: 15,
                    borderRightWidth: 15,
                    borderBottomWidth: 15,
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderBottomColor: "white",
                    position: "absolute",
                    top: -15,
                    left: descriptionViewWidth / 2 - 7.5,
                  },
                  alignInfo === "left" && {
                    left: descriptionViewWidth - childrenWidth / 2 - 7.5,
                  },
                  alignInfo === "right" && {
                    left: descriptionViewWidth / 4 - 7.5,
                  },
                  alignInfo === "center" && {
                    left: descriptionViewWidth / 2 - 7.5,
                  },
                ]}
              />
              <Text style={{ marginBottom: 20 }}>{helpDescription}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {step > 1 ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (changePreviousBtnFunc) {
                        fadeOut(() => {
                          changePreviousBtnFunc();
                          fadeIn();
                        });
                      } else {
                        setStepDetails((prev) => ({
                          ...prev,
                          step: prev.step - 1,
                        }));
                        localStorage.setItem(
                          "tutorialComplete",
                          JSON.stringify({
                            complete: false,
                            step: stepDetails.step - 1,
                          })
                        );
                      }
                    }}
                  >
                    <Text style={{ marginRight: 15 }}>Previous</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      fadeOut(() => {
                        setStepDetails((prev) => ({
                          ...prev,
                          step: prev.step + 1,
                        }));
                        localStorage.setItem(
                          "tutorialComplete",
                          JSON.stringify({
                            complete: false,
                            step: stepDetails.step + 1,
                          })
                        );
                      });
                    }}
                  >
                    <Text style={{ marginRight: 15 }}>Skip</Text>
                  </TouchableOpacity>
                )}
                {isLastStep ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (changeFinishBtnFunc) {
                        changeFinishBtnFunc();
                      } else {
                        setStepDetails({
                          step: 0,
                          complete: true,
                        });
                        localStorage.setItem(
                          "tutorialComplete",
                          JSON.stringify({
                            step: 0,
                            complete: true,
                          })
                        );
                      }
                    }}
                  >
                    <Text>Finish</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      if (changeNextBtnFunc) {
                        changeNextBtnFunc();
                      } else {
                        setStepDetails((prev) => ({
                          ...prev,
                          step: prev.step + 1,
                        }));
                        localStorage.setItem(
                          "tutorialComplete",
                          JSON.stringify({
                            complete: false,
                            step: stepDetails.step + 1,
                          })
                        );
                      }
                    }}
                  >
                    <Text>Next</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Animated.View>
        </Modal>
      )}
    </View>
  );
};

export default React.memo(TutorialStep);
