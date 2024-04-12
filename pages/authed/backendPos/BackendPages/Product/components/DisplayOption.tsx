import DropdownSelectableOption from "components/MainPosPage/components/ProductBuilderModal/DropdownSelectableOption";
import MultipleTimeSelectableOptionGroup from "components/MainPosPage/components/ProductBuilderModal/MultipleTimeSelectableOptionGroup";
import OneTimeSelectableOptionGroup from "components/MainPosPage/components/ProductBuilderModal/OneTimeSelectableOptionGroup";
import TableOption from "components/MainPosPage/components/ProductBuilderModal/TableOption";
import React, { useState } from "react";

const DisplayOption = ({
  e,
  index,
  setmyObjProfile,
  myObjProfile,
  setopenOptions,
  openOptions,
  scrollYDisplayOption,
}) => {
  const checkCases = () => {
    if (e.selectedCaseList?.length > 0) {
      const listOfTrueIfS = [];

      e.selectedCaseList.forEach((ifStatement) => {
        const caseKeyList = myObjProfile.options.filter(
          (op) => op.label == ifStatement.selectedCaseKey
        );

        if (caseKeyList.length > 0) {
          const caseValueList = caseKeyList[0].optionsList.filter(
            (opL) => opL.label == ifStatement.selectedCaseValue
          );

          if (caseValueList.length > 0) {
            if (caseValueList[0].selected === true) {
              listOfTrueIfS.push(ifStatement);
            }
          }
        }
      });

      if (e.selectedCaseList?.length === listOfTrueIfS.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const [optionVal, setoptionVal] = useState();

  const selectedList = e.optionsList.filter((checkOp) => checkOp.selected);

  if (selectedList.length > 0 && !optionVal) {
    setoptionVal(selectedList[0]);
  }
  if (!(e.selectedCaseList?.length > 0) || checkCases()) {
    if (e.optionType === "Dropdown") {
      return (
        <DropdownSelectableOption
          scrollYDisplayOption={scrollYDisplayOption}
          id={index}
          setopenDropdown={setopenOptions}
          openDropdown={openOptions}
          label={e.label}
          isRequired={e.isRequired}
          options={e.optionsList}
          setValue={({ option, listIndex }) => {
            const newMyObjProfile = structuredClone(myObjProfile);
            newMyObjProfile.options[index].optionsList.forEach(
              (element, indexOfOl) => {
                if (element.selected) {
                  newMyObjProfile.options[index].optionsList[
                    indexOfOl
                  ].selected = false;
                }
              }
            );

            if (option) {
              newMyObjProfile.options[index].optionsList[listIndex].selected =
                true;
            }
            setoptionVal(option);

            setmyObjProfile(newMyObjProfile);
          }}
          value={optionVal}
        />
      );
    } else if (e.optionType === "Quantity Dropdown") {
      const optionsSelected = myObjProfile.options[index].optionsList.filter(
        (op) => op.selectedTimes > 0
      );
      const optionsSelectedLabel =
        optionsSelected.length > 0
          ? optionsSelected.map((op, index) => {
              if (index > 0) return `, ${op.label} (${op.selectedTimes})`;
              return `${op.label} (${op.selectedTimes})`;
            })
          : "";

      return (
        <MultipleTimeSelectableOptionGroup
          scrollYDisplayOption={scrollYDisplayOption}
          e={e}
          index={index}
          myObjProfile={myObjProfile}
          setmyObjProfile={setmyObjProfile}
          id={index}
          setopenDropdown={setopenOptions}
          openDropdown={openOptions}
          label={e.label}
          isRequired={e.isRequired}
          optionsSelectedLabel={optionsSelectedLabel}
        />
      );
    } else if (e.optionType === "Table View") {
      const optionsSelected = myObjProfile.options[index].optionsList.filter(
        (op) => op.selectedTimes > 0
      );
      const optionsSelectedLabel =
        optionsSelected.length > 0
          ? optionsSelected.map((op, index) => {
              if (index > 0) return `, ${op.label} (${op.selectedTimes})`;
              return `${op.label} (${op.selectedTimes})`;
            })
          : "";

      return (
        <TableOption
          e={e}
          index={index}
          myObjProfile={myObjProfile}
          setmyObjProfile={setmyObjProfile}
          id={index}
          setopenDropdown={setopenOptions}
          openDropdown={openOptions}
          label={e.label}
          isRequired={e.isRequired}
          optionsSelectedLabel={optionsSelectedLabel}
        />
      );
    } else {
      return (
        <OneTimeSelectableOptionGroup
          label={e.label}
          isRequired={e.isRequired}
          options={e.optionsList}
          setValue={({ option, listIndex }) => {
            const newMyObjProfile = structuredClone(myObjProfile);
            newMyObjProfile.options[index].optionsList.forEach(
              (element, indexOfOl) => {
                if (element.selected) {
                  newMyObjProfile.options[index].optionsList[
                    indexOfOl
                  ].selected = false;
                }
              }
            );

            newMyObjProfile.options[index].optionsList[listIndex].selected =
              true;
            setoptionVal(option);
            setmyObjProfile(newMyObjProfile);
          }}
          value={optionVal}
        />
      );
    }
  } else if (checkCases() === false) {
    // else {
    // console.log("Inside else of checkCases() === false");
    const newMyObjProfile = structuredClone(myObjProfile);
    newMyObjProfile.options[index].optionsList.forEach((item, indexOfItem) => {
      if (item.selected === true) {
        // console.log("item.selected === true");
        newMyObjProfile.options[index].optionsList[indexOfItem].selected =
          false;
        setmyObjProfile(newMyObjProfile);
      } else if (item.selectedTimes > 0) {
        // console.log("item.selectedTimes > 0");
        newMyObjProfile.options[index].optionsList[
          indexOfItem
        ].selectedTimes = 0;
        setmyObjProfile(newMyObjProfile);
      }
    });
    return <></>;
  }
};

export default DisplayOption;
