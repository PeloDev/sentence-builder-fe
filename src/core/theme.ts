import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#84cea3",
    primaryDark: "#00A961",
    layBlue: 'hsl(198, 78%, 64%)',
    pumkin: 'hsl(24, 96%, 55%)',
    appTeal: 'hsl(181, 92%, 15%)',
    background: "hsl(211, 100%, 6%)"
  },
  components: {
    Text: {
      baseStyle: {
        color: "#333",
        fontFamily: "Raleway",
      }
    }
  }
});

export default theme;
