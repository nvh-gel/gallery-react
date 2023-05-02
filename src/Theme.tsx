import {theme} from "antd";

const themeBlue = {
    token: {
        colorBgBase: '#74ccee',

    }
};
const themePurple = {
    token: {
        colorBgBase: '#7d5af8',
    }
};
const themeRed = {
    token: {
        colorBgBase: '#ed544c',
    }
};
const themeYellow = {
    token: {
        colorBgBase: '#eaa319',
    }
};
const themeGreen = {
    token: {
        colorBgBase: '#16b5a3',
    }
};

const themeDark = {
    algorithm: theme.defaultAlgorithm
};

function defineTheme(pathname: string) {
    switch (pathname) {
        case "/":
            return themeBlue;
        case "/model":
            return themePurple;
        case "/album":
            return themeRed;
        case "/about":
            return themeYellow;
        case "/contact":
            return themeGreen;
        case "/admin/crawler":
        case "/admin/user":
        case "/admin/transaction":
            return themeDark;
        default:
            return themeBlue;
    }
}

export default defineTheme;
