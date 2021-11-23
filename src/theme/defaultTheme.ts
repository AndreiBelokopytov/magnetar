import { ThemeType } from "grommet";

export const defaultTheme: ThemeType = {
  global: {
    font: {
      family: "Poppins",
    },
    colors: {
      white: "#fff",
      "accent-1": "#6FEBB0",
      "accent-2": "#22B07D",
      "dark-1": "#131720",
      "dark-2": "#202632",
      "light-1": "#E7E8E9",
      "light-2": "#BCBEC1",
      "light-3": "#8F9399",
      "status-warning": "#FFAA15",
      "status-ok": "#22B07D",
      "status-error": "#DE5454",
      get ["background-back"]() {
        return this["dark-2"];
      },
    },
  },
  text: {
    large: {
      size: "18px",
      height: "32px",
    },
    medium: {
      size: "16px",
      height: "24px",
    },
    small: {
      size: "14px",
      height: "16px",
    },
    xsmall: {
      size: "12px",
      height: "16px",
    },
  },
  heading: {
    level: {
      1: {
        font: {
          weight: 500,
        },
        medium: {
          size: "32px",
          height: "40px",
        },
      },
      2: {
        font: {
          weight: 600,
        },
        medium: {
          size: "24px",
          height: "32px",
        },
      },
      3: {
        font: {
          weight: 600,
        },
        medium: {
          size: "18px",
          height: "32px",
        },
      },
    },
  },
  avatar: {
    size: {
      medium: "48px",
    },
  },
  button: {
    // @ts-ignore
    extend: () => {
      return {
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "24px",
      };
    },
    border: {
      width: "0",
    },
    size: {
      medium: {
        border: {
          radius: "40px",
        },
        pad: {
          vertical: "8px",
          horizontal: "24px",
        },
      },
    },
  },
  tabs: {
    header: {
      // @ts-ignore
      extend: ({ theme }) => {
        return {
          borderBottom: `solid 2px ${theme.global?.colors?.["dark-2"]}`,
        };
      },
    },
  },
  tab: {
    // @ts-ignore
    extend: () => {
      return {
        fontSize: "16px",
        lineHeight: "24px",
        position: "relative",
        top: "3px",
      };
    },
    margin: {
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
    },
    pad: {
      bottom: "16px",
      left: "16px",
      right: "16px",
    },
    color: "light-2",
    active: {
      color: "light-1",
    },
    border: {
      color: "transparent",
      active: {
        color: "accent-1",
      },
    },
  },
};
