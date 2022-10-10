import { createTheme } from "@material-ui/core/styles"
export const legacyTheme = createTheme({
  palette: {
    primary: {
      main: "#1C1F23",
      light: "#3D3D3D"
    },
    secondary: {
      main: "#4BCF93",
      light: "#81FEB7"
    },
    text: {
      primary: "#000000",
      secondary: "#fff"
    },
    error: {
      main: "#ED254E"
    },
    info: {
      main: "#3866F9"
    },
    warning: {
      main: "#FFC839"
    }
  },
  typography: {
    fontFamily: "Roboto Mono",
    h1: {
      fontSize: 35,
      letterSpacing: "-0.01em"
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "146.3%",
      letterSpacing: "-0.01em"
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 400
    },
    h3: {
      fontSize: 35,
      fontWeight: 400,
      fontFamily: "Roboto"
    },
    h2: {
      color: "#000000",
      fontSize: 25,
      fontWeight: 500
    },
    h4: {
      fontSize: 20
    },
    h5: {
      fontSize: 35
    },
    body1: {
      fontSize: 16
    },
    body2: {
      fontSize: 16,
      fontWeight: 300,
      lineHeight: "413.4%",
      opacity: 0.8
    }
  },
  overrides: {
    MuiSlider: {
      root: {
        color: "#3D3D3D"
      }
    },
    MuiTab: {
      root: {
        maxWidth: "100%"
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: "#4BCF93",
        fontSize: 14,
        padding: "10px 15px"
      }
    },
    MuiStepLabel: {
      label: {
        "color": "#fff",
        "opacity": 0.5,
        "marginLeft": 15,
        "lineHeight": "40px",
        "&$completed": {
          fontWeight: 300
        },
        "&$active": {
          fontWeight: 300
        },
        "& .MuiStepLabel-completed": {
          fontWeight: 300
        }
      },
      active: {
        color: "#fff !important",
        opacity: 1
      },
      completed: {
        color: "#fff !important",
        opacity: 0.5,
        fontWeight: 300
      }
    },
    MuiStepConnector: {
      lineVertical: {
        display: "none"
      }
    },
    MuiStepContent: {
      root: {
        borderLeft: "none"
      }
    },
    MuiStep: {
      root: {
        marginBottom: 15
      }
    },
    MuiStepIcon: {
      active: {
        color: "#1C1F23 !important"
      },
      completed: {
        color: "#fff !important"
      },
      root: {
        "height": 32,
        "width": 32,
        "color": "#1C1F23",
        "border": "1px solid #3D3D3D",
        "borderRadius": "50%",
        "&$active": {
          "fill": "#fff",
          "border": "1px solid #3D3D3D",
          "borderRadius": "50%",
          "& $text": {
            fill: "#1C1F23",
            border: "1px solid #3D3D3D"
          }
        }
      },
      text: {
        fill: "#fff"
      }
    },
    MuiInput: {
      underline: {
        "&:after": {
          borderBottom: "none"
        },
        "&$focused:after": {
          borderBottom: "none"
        },
        "&$error:after": {
          borderBottom: "none"
        },
        "&:before": {
          borderBottom: "none"
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: "none"
        },
        "&$disabled:before": {
          borderBottom: "none"
        },
        "&:active:not($disabled):not($focused):not($error):before": {
          borderBottom: "none"
        }
      },
      root: {
        borderRadius: 8
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "8px !important"
      }
    },
    MuiButton: {
      root: {
        "&$disabled": {
          color: "#3d3d3d"
        },
        "textTransform": "capitalize",
        "fontWeight": 500,
        "fontSize": 18
      },
      outlined: {
        "&$disabled": {
          border: "2px solid #3d3d3d"
        },
        "borderWidth": "2px !important",
        "borderRadius": "4px",
        "padding": "1px 8px",
        "fontSize": "1rem"
      }
    },
    MuiInputBase: {
      input: {
        textAlign: "center",
        color: "#fff"
      }
    },
    MuiDivider: {
      root: {
        background: "#7D8C8B"
      }
    },
    MuiDialog: {
      paper: {
        background: "#1C1F23",
        width: 615,
        maxWidth: "100%"
      },
      root: {
        height: "auto"
      },
      paperWidthSm: {
        maxWidth: 615,
        height: "auto"
      }
    },
    MuiFormControl: {
      root: {
        width: "100%"
      }
    },
    MuiDialogContent: {
      root: {
        "padding": "42px 54px",
        "&:first-child": {
          paddingTop: "42px"
        }
      }
    },
    MuiSelect: {
      select: {
        textAlign: "right"
      }
    },
    MuiDialogContentText: {
      root: {
        marginBottom: 0
      }
    },
    MuiSwitch: {
      root: {
        marginBottom: 0
      },
      switchBase: {
        "color": "red",
        "top": 8,
        "left": 8,
        "$checked$checked + &": {
          opacity: 1,
          backgroundColor: "#1C1F23",
          color: "#81FEB7"
        }
      },
      track: {
        "borderRadius": "40px",
        "backgroundColor": "inherit",
        "border": "1px solid #fff",
        "opacity": 0.5,
        "$checked$checked + &": {
          opacity: 1,
          backgroundColor: "#1C1F23",
          color: "#81FEB7"
        }
      },
      thumb: {
        "width": 18,
        "height": 18,
        "$checked$checked + &": {
          color: "#81FEB7"
        }
      },
      colorSecondary: {
        "color": "#fff",
        "$checked$checked + &": {
          color: "#81FEB7"
        },
        "& .Mui-checked": {
          color: "#81FEB7"
        }
      }
    },
    MuiFormHelperText: {
      root: {
        display: "none"
      }
    },
    MuiTable: {
      root: {
        borderRadius: "8px",
        backgroundColor: "#2F3438"
      }
    },
    MuiTableHead: {
      root: {
        minHeight: 58,
        fontSize: 16,
        fontWeight: 400,
        letterSpacing: "-0.01em",
        color: "#FFFFFF"
      }
    },
    MuiTableFooter: {
      root: {
        minHeight: 60,
        fontSize: 16,
        fontWeight: 400,
        letterSpacing: "-0.01em",
        color: "##81FEB7",
        borderTop: "0.3px solid #3D3D3D"
      }
    },
    MuiTableBody: {
      root: {
        "& > *": {
          borderTop: "0.3px solid #3D3D3D",
          minHeight: 90
        }
      }
    },
    MuiTableCell: {
      root: {
        borderBottom: "unset"
      }
    },
    MuiTableRow: {
      root: {
        "& th:first-child, & td:first-child": {
          paddingLeft: 46
        },
        "& th:last-child, & td:last-child": {
          paddingRight: 46
        }
      }
    }
  }
})
