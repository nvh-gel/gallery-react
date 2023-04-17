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

function defineTheme(pathname: string) {
    switch (pathname) {
        case "/":
            return themeBlue;
        case "/model":
            return themePurple;
        case "/gallery":
            return themeRed;
        case "/about":
            return themeYellow;
        case "/contact":
            return themeGreen;
        default:
            return themeBlue;
    }
}

export default defineTheme;
