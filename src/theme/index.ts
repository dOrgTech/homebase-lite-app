import { createTheme } from "@material-ui/core"
const defaultTheme = createTheme()
const { breakpoints } = defaultTheme


export const theme = createTheme({
  palette: {
    primary: {
      main: "#2f3438",
      dark: "#1c1f23",
      light: "#7d8c8b33"
    },
    secondary: {
      main: "#81FEB7",
      dark: "#273833",
      contrastText: "#1C1F23",
      light: "#7E496F"
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#DDDDDD"
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  typography: {
    fontFamily: "Roboto Mono",
    h1: {
      fontSize: 30,
      fontWeight: 500,
      [breakpoints.down("sm")]: {
        fontSize: 22
      },
      [breakpoints.down("xs")]: {
        fontSize: 18
      }
    },
    subtitle1: {
      fontSize: 30,
      lineHeight: "124.3%",
      fontWeight: 500,
      [breakpoints.down("sm")]: {
        fontSize: 26
      },
      [breakpoints.down("xs")]: {
        fontSize: 22
      }
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
      fontSize: 18,
      fontWeight: 200,
      lineHeight: "146.3%",
      cursor: "default",
      [breakpoints.down("sm")]: {
        fontSize: 16
      },
      [breakpoints.down("xs")]: {
        fontSize: 13
      }
    },
    h4: {
      fontSize: 22,
      fontWeight: 500,
      [breakpoints.down("sm")]: {
        fontSize: 16
      },
      [breakpoints.down("xs")]: {
        fontSize: 13
      }
    },
    h5: {
      fontSize: 16,
      [breakpoints.down("xs")]: {
        fontSize: 14
      }
    },
    body1: {
      fontSize: 18,
      [breakpoints.down("xs")]: {
        fontSize: 16
      }
    },
    body2: {
      fontSize: 17,
      fontWeight: 300,
      [breakpoints.down("xs")]: {
        fontSize: 16
      }
    },
    h6: {
      fontSize: 14
    }
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          backgroundColor: 'red !important',
        },
      }
    }
  },
  overrides: {
    MuiPaper: {
      elevation8: {
        background: 'rgb(47, 52, 56) !important',
        '& .MuiCalendarPicker-root': {
          background:'hwb(207deg 18% 78% / 90%)'
        },
        '& .MuiPickersCalendarHeader-root': {
          background: 'rgb(0 0 0 / 20%)'
        },
        '& .MuiClockPicker-root' : {
          background: 'hwb(207deg 18% 78% / 90%)'
        },
        '& .MuiClock-clock' : {
          background: '#2f3438 !important'
        },
        '& .MuiClockNumber-root' : {
          color: '#fff'
        },
        '& .MuiClockNumber-root.Mui-disabled': {
          color: 'rgb(255 255 255 / 30%) !important'
        },
        '& .MuiTypography-root' : {
          color: '#fff !important'
        },
        '& .MuiPickersDay-root.Mui-selected': {
          background: '#81feb7 !important',
          borderColor: '#81feb7 !important',
          color: 'black'
        },
        '& .MuiClockPointer-thumb': {
          backgroundColor: '#81FEB7 !important',
          border: '16px solid #81FEB7 !important'        },
        '& .MuiClockPointer-root' : {
          backgroundColor: '#81FEB7 !important'
        },
        '& .MuiClock-pin': {
          backgroundColor: '#81FEB7 !important'
        },
        '& .MuiClock-amButton' :{
          backgroundColor: '#81FEB7 !important',
          '& span' : {
            color: "black !important"
          }
        },
        '& .MuiPickersPopper-paper': {
          background: 'rgb(47, 52, 56) !important'
        },
        '& .MuiClock-pmButton':{
          backgroundColor: '#81FEB7 !important',
          '& span' : {
            color: "black !important"
          }
        },
        '& .MuiPickersDay-root.Mui-disabled': {
          color: 'rgba(0, 0, 0, 0.38)',
          opacity: 0.5,
          border: '2px solid rgb(0 0 0 / 87%) !important'
        },
        '& .MuiPickersDay-root:not(.Mui-selected)' : {
          border: '2px solid #81FEB7',
          '&:hover': {
            color: 'white'
          },
          '&:focus': {
            color: '#81feb7'
          }
        },
        '& .MuiPickersDay-root':{
          border: '2px solid #81FEB7'
        },
        '& .MuiDayPicker-weekDayLabel': {
          fontWeight: '900 !important'
        },
        '& .MuiPickersCalendarHeader-label' :{
          color: 'white'
        }
      },
      root:{
        '& .MuiPickersPopper': {
          paper: {
            background: 'rgb(47, 52, 56) !important'
          }
        }
      }
    },
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
      root: {
        "&.Mui-active": {
          color: "#fff !important",
          opacity: 1
        },
        "&.Mui-completed": {
          color: "#fff !important",
          opacity: 0.5,
          fontWeight: 300
        }
      },
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
        "&.MuiStepLabel-completed": {
          fontWeight: 300
        }
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
      root: {
        "&.Mui-active": {
          color: "#1C1F23 !important"
        },
        "&.Mui-completed": {
          color: "#fff !important"
        },
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    MuiCalendarPicker: {
      root: {
        background: "#2F3438"
      }
    },
    MuiList: {
      root: {
        "background": "#2F3438",
        "&:hover fieldset": {
          border: "none"
        }
      }
    },
    MuiPickersDay: {
      root: {
        "background": "#2F3438",
        "&:Mui-selected": {
          border: "1px solid #fff"
        }
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
          borderBottom: "none",
          "&:hover": {
            borderBottom: "none"
          }
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: "none"
        },
        "&$disabled:before": {
          borderBottom: "none"
        },
        "&:active:not($disabled):not($focused):not($error):before": {
          borderBottom: "none"
        },
        "&:hover:not($disabled)": {
          borderBottom: "none",
          "&:before": {
            borderBottom: "none"
          }
        }
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
      colorInherit: {
        "&$disabled": {
          border: "2px solid #3d3d3d"
        },
        background: "#81feb7",
        "&:hover": {
          background: "#ff486e"
        }
      },
      outlined: {
        "&$disabled": {
          border: "2px solid #3d3d3d"
        },
        "borderWidth": "2px !important",
        "borderRadius": "4px",
        "padding": "1px 8px",
        "fontSize": "1rem"
      },
      label: {
        [breakpoints.down("xs")]: {
          fontSize: 15
        }
      }
    },
    MuiLinearProgress: {
      colorSecondary: {
        backgroundColor: "rgba(125,140,139, 0.2) !important"
      },
      colorPrimary:{
        backgroundColor: "rgba(125,140,139, 0.2) !important"
      },
      barColorSecondary: {
        backgroundColor: "#3FE888"
      },
      barColorPrimary: {
        backgroundColor: "#3866F9"
      },
      bar: {
        borderRadius: 4
      },
      root: {
        borderRadius: 4

      }
    },
    MuiDatePicker: {
      root: {
        border: "none"
      }
    },
    MuiInputBase: {
      root: {
        background: "#2f3438",
        borderRadius: 4,
        paddingLeft: 26,
        paddingTop: 19,
        paddingBottom: 19,
        outline: "none",
        "&:focus-visible": {
          outline: "none",
        },
        "& .MuiOutlinedInput": {
          root: {
            height: 72
          }
        }
      },
      input: {
        fontSize: 18,
        lineHeight: "146.3%",
        fontFamily: "Roboto Mono",
        color: "#fff",
        borderRadius: 8,
        "&::placeholder": {
          color: "rgba(255, 255, 255, 0.65)"
        },
        '&:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 100px #2f3438 inset',
          '-webkit-text-fill-color': '#fff',
          borderRadius: "initial"
        }
      },
      inputMultiline: {
        paddingLeft: 26,
        paddingTop: 19,
        paddingBottom: 19
      },

    },
    MuiTextField: {
      root: {
        borderRadius: 8
      }
    },
    MuiOutlinedInput: {
      root: {
        height: 72,
        "background": "#2F3438",
        "borderRadius": 8,
        "&:hover fieldset": {
          border: "none"
        }
      },
      input: {
        paddingLeft: 26,
        paddingTop: 19,
        paddingBottom: 19,
        fontWeight: 300,
        "&::placeholder": {
          color: "rgba(255, 255, 255, 0.65)"
        },
        '&:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 100px #000 inset',
          '-webkit-text-fill-color': '#fff'
        }
      }
    },
    MuiDivider: {
      root: {
        marginTop: 0,
        marginBottom: 0,
        border: "1px solid #7d8c8b33"
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
    MuiDialogTitle: {
      root: {
        padding: "46px 54px",
        paddingBottom: 16
      }
    },
    MuiSelect: {
      select: {
        textAlign: "right"
      },
      icon: {
        top: 'calc(50% - 8px)',
        color: 'hsl(240deg 8% 93%)'
      }
    },
    MuiDialogContentText: {
      root: {
        marginBottom: 0
      }
    },
    MuiDialogActions: {
      root: {
        justifyContent: "center",
        paddingTop: 24,
        paddingBottom: 24
      }
    },
    MuiCheckbox: {
      colorSecondary: {
        color: "#2f3438"
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
