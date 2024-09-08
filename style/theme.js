import { extendTheme } from "native-base";

const customTheme = {
    components: {
        Input: {
            baseStyle: {
                bg: "rgba(28, 38, 51, 0.5)",
                color: 'white',
                borderColor: "#BDC1C6",
                _focus: {
                    borderColor: '#6FCF97"',
                    bg: "rgba(28, 38, 51, 0.5)",
                },
                _web: {
                    fontSize: "18px",
                },
                _ios: {
                    fontSize: "18px",
                },
                _android: {
                    fontSize: "18px",
                },
            },
        },
        Button: {
            baseStyle: {
                bg: "0466BF",
            },
        },
    },
    colors: {
        primaryBg: "#1C2633",
        primaryGray: "#293751",
        actionBlue: "#0466BF",
        secondaryGreen: "#6FCF97",
    },
};

const theme = extendTheme(customTheme);

export default theme;