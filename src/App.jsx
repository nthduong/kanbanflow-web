import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useColorScheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";

function SelectMode() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    setMode(event.target.value);
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
        <MenuItem value="light">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LightModeIcon fontSize="small" />
            Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <NightsStayIcon fontSize="small" />
            dark
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function App() {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <Box
          sx={{
            backgroundColor: "primary.light",
            height: (theme) => theme.kanban.appBarHeight,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SelectMode />
        </Box>
        <Box
          sx={{
            backgroundColor: "primary.dark",
            height: (theme) => theme.kanban.boardBarHeight,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          Board Bar
        </Box>
        <Box
          sx={{
            backgroundColor: "primary.light",
            height: (theme) =>
              `calc( 100vh - ${theme.kanban.appBarHeight} - ${theme.kanban.boardBarHeight})`,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          content
        </Box>
      </Container>
    </>
  );
}

export default App;
