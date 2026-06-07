import { useState } from "react";
import TextField from "@mui/material/TextField";

function ToggleFocusInput({ value, onUpdateColumnTitle, inputFontSize = "16px", ...props }) {
  const [inputValue, setInputValue] = useState(value);

  const triggerBlur = () => {
    setInputValue(inputValue.trim());

    if (!inputValue || inputValue.trim() === value) {
      setInputValue(value);
      return;
    }

    onUpdateColumnTitle(inputValue);
  };

  return (
    <TextField
      id="toggle-focus-input-controlled"
      fullWidth
      variant="outlined"
      size="small"
      value={inputValue}
      onChange={(event) => {
        setInputValue(event.target.value);
      }}
      onBlur={triggerBlur}
      {...props}
      sx={{
        marginRight: "10px",
        "& label": {},
        "& input": { fontSize: inputFontSize, fontWeight: "bold", color: "#fff" },
        "& .MuiOutlinedInput-root": {
          backgroundColor: "transparent",
          "& fieldset": { borderColor: "transparent" },
        },
        "& .MuiOutlinedInput-root:hover": {
          borderColor: "transparent",
          "& fieldset": { borderColor: "transparent" },
        },
        "& .MuiOutlinedInput-root.Mui-focused": {
          paddingLeft: "10px",

          backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#64656a" : "#9eae8e"),
          "& fieldset": { borderColor: "#fff" },
        },
        "& .MuiOutlinedInput-input": {
          px: "0px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        },
      }}
    />
  );
}

export default ToggleFocusInput;
