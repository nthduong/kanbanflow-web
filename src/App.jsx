import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useColorScheme } from "@mui/material/styles";

function SelectMode() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    setMode(event.target.value);
    console.log(event.target.value);
    
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="mode-select-label">Mode</InputLabel>
      <Select
        labelId="mode-select-label"
        id="mode-select"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">Light</MenuItem>
        <MenuItem value="dark">Dark</MenuItem>
        <MenuItem value="system">System</MenuItem>
      </Select>
    </FormControl>
  );
}

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}

function App() {
  return (
    <>
      <SelectMode />
      <ModeToggle />
      <div>Duong</div>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <ArchiveIcon />
    </>
  );
}

export default App;
