import { Container, CssBaseline } from "@mui/material";
import Pages from "./pages/Pages";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const themeLight = createTheme({
  palette: {
    background: {
      default: "#ECEDEC",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Pages />
      </Container>
    </ThemeProvider>
  );
}

export default App;
