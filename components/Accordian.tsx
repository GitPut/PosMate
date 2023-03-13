import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";

const Accordian = ({question, answer}) => {
const animHeight = useRef(new Animated.Value(0)).current
  const [isOpen, setisOpen] = useState(false)

 const open = () => {
    // Will change animHeight value to 1 in 5 seconds
    Animated.timing(animHeight, {
      toValue: 500,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const close = () => {
    // Will change animHeight value to 0 in 3 seconds
    Animated.timing(animHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };


  return (
   <div className="faq-accordion">
                        <div
                          data-w-id="da3cc578-29e4-e501-7e52-9db3ebfeacb6"
                          className="faq-question"
                          onClick={() => {
                            if(isOpen){
                              setisOpen(false)
                              close()
                            }else {
                              setisOpen(true)
                              open()
                            }
                          }}
                        >
                          <div className="text-size-medium text-weight-semibold">
                           {question}
                          </div>
                          <div className="icon-1x1-small w-embed">
                            <svg
                              width="100%"
                              height="100%"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.8746 8.99999L11.9946 12.88L8.11461 8.99999C7.72461 8.60999 7.09461 8.60999 6.70461 8.99999C6.31461 9.38999 6.31461 10.02 6.70461 10.41L11.2946 15C11.6846 15.39 12.3146 15.39 12.7046 15L17.2946 10.41C17.6846 10.02 17.6846 9.38999 17.2946 8.99999C16.9046 8.61999 16.2646 8.60999 15.8746 8.99999Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                        <Animated.View style={{maxHeight: animHeight}}>
                        <div
                          className="faq-answer"
                          style={{ width: "100%"}}
                        >
                          <div className="max-width-large">
                            <div className="padding-vertical padding-medium">
                              <p className="text-size-regular">
                                {answer}
                              </p>
                            </div>
                          </div>
                        </div>
                        </Animated.View>
                      </div>
  );
}

export default Accordian