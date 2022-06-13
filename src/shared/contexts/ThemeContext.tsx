import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { LightTheme, DarkTheme } from '../themes';

interface IThemeContextData {
    themeName: 'light' | 'dark',
    toggleTheme: () => void;
}

const ThemeContext = React.createContext({} as IThemeContextData);

type AppThemeProviderProps = {
    children: React.ReactNode
}

export const useAppThemeContext = () => {
    return React.useContext(ThemeContext);
}

export const AppThemeProvider = (props: AppThemeProviderProps) => {
    const [themeName, setThemeName] = React.useState<'light' | 'dark'>('light');
    const toggleTheme = React.useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
    }, []);

    const theme = React.useMemo(() => {
        if (themeName === 'light') return LightTheme;
        return DarkTheme;
    }, [themeName]);

    return ( 
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
          <ThemeProvider theme={DarkTheme}>
            <Box width="100w" height="100vh" bgcolor={theme.palette.background.default}>
              {props.children}
            </Box>
          </ThemeProvider>
        </ThemeContext.Provider>
    );
}