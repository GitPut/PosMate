export const GooglePlacesStyles = {
  menu: (provided) => ({
    ...provided,
    fontFamily: "sans-serif",
  }),
  menuList: (provided) => ({
    ...provided,
    fontFamily: "sans-serif",
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  // Customizing the options
  option: (provided) => ({
    ...provided,
    fontFamily: "sans-serif",
  }),
  // Customizing the input
  input: (provided) => ({
    ...provided,
    fontFamily: "sans-serif",
    width: "100%",
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    paddingTop: 10,
  }),
  // Adjusting placeholder styling here
  placeholder: (provided) => ({
    ...provided,
    fontFamily: "sans-serif",
    color: "grey", // Example to add more placeholder-specific styles
  }),
  singleValue: (provided) => ({
    ...provided,
    fontFamily: "sans-serif",
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    fontFamily: "sans-serif",
  }),
  control: (base) => ({
    ...base,
    width: "100%",
    borderWidth: 1,
    borderColor: "#9b9b9b",
  }),
};
