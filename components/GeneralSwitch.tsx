import React from "react";

type GeneralSwitchProps = {
  isActive: boolean;
  toggleSwitch: () => void;
};

const GeneralSwitch = ({ isActive, toggleSwitch }: GeneralSwitchProps) => {
  return (
    <div
      style={{
        cursor: "pointer",
        width: "39px",
        height: "18px",
        borderRadius: "15px",
        backgroundColor: isActive ? "#1D294E" : "#ccc",
        position: "relative",
        transition: "background-color 0.3s",
      }}
      onClick={toggleSwitch}
    >
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: isActive ? "21px" : "0px", // Move knob based on isActive
          width: "19px",
          height: "19px",
          borderRadius: "50%",
          backgroundColor: "#EEF2FF",
          transition: "left 0.3s",
        }}
      />
    </div>
  );
};

export default GeneralSwitch;
