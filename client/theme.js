import { createTheme } from "@material-ui/core/styles";
import { black, deepPurple, amber, brown, orange } from "@material-ui/core/colors";
import { alpha, makeStyles } from "@material-ui/core/styles";

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: "body2",
          },
          style: {
            fontSize: 11,
          },
        },
        {
          props: {
            variant: "button",
          },
          style: {
            fontSize: 9,
          },
        },
      ],
    },
  },
  palette: {
    primary: {
      main: "#a05050",
    },

    secondary: {
      main: "#000000",
      // contrastText: amber[900],
    },
  },
});

theme.overrides = {
  MuiButton: {
    root: {
      borderRadius: 15,
      textTransform: "none",
    },
    containedPrimary: {
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.light,
      },
    },
    containedSecondary: {
      fontWeight: 700,
    },
  },
};

export const useNavStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    marginBottom: 25,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default theme;
