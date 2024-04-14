import React, { useState, useEffect } from "react";
import DropdownSelectableOption from "./DropdownSelectableOption"; // Adjust the import path as needed
import MultipleTimeSelectableOptionGroup from "./MultipleTimeSelectableOptionGroup"; // Adjust the import path as needed
import TableOption from "./TableOption"; // Adjust the import path as needed
import OneTimeSelectableOptionGroup from "./OneTimeSelectableOptionGroup"; // Adjust the import path as needed

const DisplayOption = ({
  e,
  index,
  myObjProfile,
  setMyObjProfile,
  setopenOptions,
  openOptions,
  scrollY,
  isOnlineOrder,
}) => {
  const checkCases = () => {
    if (e.selectedCaseList?.length > 0) {
      return e.selectedCaseList.every((ifStatement) => {
        const option = myObjProfile.options
          .find((op) => op.label === ifStatement.selectedCaseKey)
          ?.optionsList.find(
            (opL) => opL.label === ifStatement.selectedCaseValue
          );
        return option?.selected;
      });
    }
    return true;
  };

  const [optionVal, setOptionVal] = useState();
  const [isConditionMet, setIsConditionMet] = useState(true);

  useEffect(() => {
    const isMet = checkCases();
    if (isConditionMet !== isMet) {
      setIsConditionMet(isMet);
      if (!isMet) {
        const newProfile = structuredClone(myObjProfile);
        newProfile.options[index].optionsList.forEach((option) => {
          option.selected = false;
          option.selectedTimes = 0;
        });
        setMyObjProfile(newProfile);
        setOptionVal(null); // Reset the currently selected option value if any
      }
    }
  }, [myObjProfile.options, index]); // Refined to listen on specific changes

  useEffect(() => {
    const selectedOption = e.optionsList.find((op) => op.selected);
    if (selectedOption && selectedOption !== optionVal) {
      setOptionVal(selectedOption);
    }
  }, [e.optionsList]);

  const handleValueChange = (option, listIndex) => {
    const newProfile = structuredClone(myObjProfile);
    const optionsList = newProfile.options[index].optionsList;

    optionsList.forEach((option) => (option.selected = false));

    if (option) {
      optionsList[listIndex].selected = true;
    }

    setOptionVal(option);
    setMyObjProfile(newProfile);
  };

  const renderOptionByType = () => {
    if (!isConditionMet) return null;

    switch (e.optionType) {
      case "Dropdown":
        return (
          <DropdownSelectableOption
            id={index}
            setopenDropdown={setopenOptions}
            openDropdown={openOptions}
            label={e.label}
            isRequired={e.isRequired}
            options={e.optionsList}
            setValue={({ option, listIndex }) =>
              handleValueChange(option, listIndex)
            }
            value={optionVal}
            scrollY={scrollY}
          />
        );
      case "Quantity Dropdown":
      case "Table View":
        const optionsSelectedLabel = e.optionsList
          .filter((op) => op.selectedTimes > 0)
          .map(
            (op, idx, arr) =>
              `${op.label} (${op.selectedTimes})${
                idx < arr.length - 1 ? ", " : ""
              }`
          )
          .join("");

        const Component =
          e.optionType === "Quantity Dropdown" || isOnlineOrder
            ? MultipleTimeSelectableOptionGroup
            : TableOption;

        return (
          <Component
            e={e}
            index={index}
            myObjProfile={myObjProfile}
            setmyObjProfile={setMyObjProfile}
            id={index}
            setopenDropdown={setopenOptions}
            openDropdown={openOptions}
            label={e.label}
            isRequired={e.isRequired}
            optionsSelectedLabel={optionsSelectedLabel}
            scrollY={scrollY}
          />
        );
      default:
        return (
          <OneTimeSelectableOptionGroup
            label={e.label}
            isRequired={e.isRequired}
            options={e.optionsList}
            setValue={({ option, listIndex }) =>
              handleValueChange(option, listIndex)
            }
            value={e.numOfSelectable === 1 ? optionVal : false}
          />
        );
    }
  };

  return renderOptionByType();
};

export default DisplayOption;
