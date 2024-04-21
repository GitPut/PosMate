import React, { useState, useEffect } from "react";
import DropdownSelectableOption from "./DropdownSelectableOption"; // Adjust the import path as needed
import MultipleTimeSelectableOptionGroup from "./MultipleTimeSelectableOptionGroup"; // Adjust the import path as needed
import TableOption from "./TableOption"; // Adjust the import path as needed
import OneTimeSelectableOptionGroup from "./OneTimeSelectableOptionGroup"; // Adjust the import path as needed
import { Option, OptionsList, ProductProp } from "types/global";

interface DisplayOptionProps {
  e: Option;
  index: number;
  myObjProfile: ProductProp;
  setMyObjProfile: (
    val: ((prev: ProductProp) => ProductProp) | ProductProp
  ) => void;
  setopenOptions: (val: string | null) => void;
  openOptions: string | null;
  scrollY: number;
  isOnlineOrder?: boolean | null;
}

const DisplayOption = ({
  e,
  index,
  myObjProfile,
  setMyObjProfile,
  setopenOptions,
  openOptions,
  scrollY,
  isOnlineOrder,
}: DisplayOptionProps) => {
  const checkCases = () => {
    if (!e.selectedCaseList) return true;
    if (e.selectedCaseList?.length > 0) {
      return e.selectedCaseList.every((ifStatement) => {
        const option = myObjProfile.options
          .find((op) => op.label === ifStatement.selectedCaseKey)
          ?.optionsList.find(
            (opL) => opL.label === ifStatement.selectedCaseValue
          );
        // console.log("Option in checkCases: ", option);
        return option?.selected;
      });
    }
    return true;
  };

  const [optionVal, setOptionVal] = useState<OptionsList | null>(null);
  const [isConditionMet, setIsConditionMet] = useState<boolean>(true);

  useEffect(() => {
    const isMet = checkCases();
    if (isConditionMet !== isMet) {
      setIsConditionMet(isMet);
      if (!isMet) {
        setMyObjProfile((prev: ProductProp) => {
          const newOptions = [...prev.options];
          const newProfile = structuredClone(prev);

          newProfile.options[index].optionsList.forEach(
            (option: OptionsList) => {
              option.selected = false;
              option.selectedTimes = "0";
            }
          );

          newOptions[index] = newProfile.options[index];

          return {
            ...prev, // Spread all properties of prev
            options: newOptions, // Update the options property
          };
        });

        setOptionVal(null); // Reset the currently selected option value if any
      } else {
        if (e.defaultValue) {
          const defaultOption = e.optionsList.find(
            (op) => op.label === e.defaultValue?.label
          );
          const defaultOptionIndex = e.optionsList.findIndex(
            (op) => op.label === e.defaultValue?.label
          );

          if (defaultOption) {
            handleValueChange({
              option: {
                ...defaultOption,
                label: defaultOption.label,
                priceIncrease: defaultOption.priceIncrease,
                selected: true,
                selectedTimes: defaultOption.selectedTimes,
                countsAs: defaultOption.countsAs,
                id: defaultOption.id,
              },
              listIndex: defaultOptionIndex,
            });
          }
        }
      }
    }
  }, [myObjProfile.options, index, e]); // Refined to listen on specific changes

  useEffect(() => {
    const selectedOption = e.optionsList.find((op) => op.selected);
    if (selectedOption && selectedOption !== optionVal) {
      setOptionVal(selectedOption);
    }
  }, [e.optionsList]);

  const handleValueChange = ({
    option,
    listIndex,
  }: {
    option: OptionsList | null;
    listIndex: number | null;
  }) => {
    setMyObjProfile((prev: ProductProp) => {
      // Create a copy of the options array
      const newOptions = [...prev.options];

      // Clone the profile object to ensure immutability
      const newProfile = structuredClone(prev);

      // Loop through the optionsList array and update the selected property
      newProfile.options[index].optionsList.forEach((opt: OptionsList) => {
        opt.selected = false;
      });

      // Update the selected property of the specific option
      if (option && listIndex !== null) {
        newProfile.options[index].optionsList[listIndex].selected = true;
      }

      // Update the options array with the modified optionsList
      newOptions[index] = newProfile.options[index];

      // Return the updated state object
      return {
        ...prev,
        options: newOptions,
      };
    });
  };

  const renderOptionByType = () => {
    if (!isConditionMet) return null;

    const optionsSelectedLabel = e.optionsList
      .filter((op) => parseFloat(op.selectedTimes ?? "0") > 0)
      .map(
        (op, idx, arr) =>
          `${op.label} (${op.selectedTimes})${idx < arr.length - 1 ? ", " : ""}`
      )
      .join("");

    const Component =
      e.optionType === "Quantity Dropdown" || isOnlineOrder
        ? MultipleTimeSelectableOptionGroup
        : TableOption;

    switch (e.optionType) {
      case "Dropdown":
        return (
          <DropdownSelectableOption
            id={index.toString()}
            setopenDropdown={setopenOptions}
            openDropdown={openOptions}
            label={e.label ?? ""}
            isRequired={e.isRequired ? true : false}
            options={e.optionsList}
            setValue={({
              option,
              listIndex,
            }: {
              option: OptionsList | null;
              listIndex: number | null;
            }) => handleValueChange({ option, listIndex })}
            value={optionVal}
            scrollY={scrollY}
          />
        );
      case "Quantity Dropdown":
      case "Table View":
        return (
          <Component
            e={e}
            index={index}
            myObjProfile={myObjProfile}
            setmyObjProfile={setMyObjProfile}
            id={index.toString()}
            setopenDropdown={setopenOptions}
            openDropdown={openOptions}
            label={e.label ?? ""}
            isRequired={e.isRequired ? true : false}
            optionsSelectedLabel={optionsSelectedLabel}
            scrollY={scrollY}
            setMyObjProfile={setMyObjProfile}
          />
        );
      default:
        return (
          <OneTimeSelectableOptionGroup
            label={e.label ?? ""}
            isRequired={e.isRequired ? true : false}
            options={e.optionsList}
            setValue={({
              option,
              listIndex,
            }: {
              option: OptionsList | null;
              listIndex: number | null;
            }) => handleValueChange({ option, listIndex })}
            value={
              parseFloat(e.numOfSelectable ?? "0") === 1 ? optionVal : null
            }
          />
        );
    }
  };

  return renderOptionByType();
};

export default DisplayOption;
