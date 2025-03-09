'use client'
import React,{createContext,useState,useContext,ReactNode} from "react";

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    themeColors: {
        primary: string;
        secondary: string;
        tertiary: string;
        text: string;
        hoverText: string;
        bg: string;
        base: string;
    }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
    const [theme, setTheme] = useState<Theme>('light');
    const toggleTheme = () => {
        console.log('theme toggle '+ theme);
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
      };

      const themeColors = theme === 'light' ? {
        primary: '#F1F5F9',     // Light background color
        secondary: '#E2E8F0',   // Light secondary color
        tertiary: '#CBD5E1',     // Light tertiary color
        text: '#000000', // Black text color
        hoverText: '#0000FF',  //blue
        bg: '#F8FAFC',         // สีแถบ navbar สำหรับ theme light
        base: "#FFFFFF",
      } : {
        primary: '#1F2937',       // Gray 800
        secondary: '#374151',     // Gray 700
        tertiary: '#4B5563',       // Gray 600
        text: '#E6E6E6',           // เทา
        hoverText: '#FFFFFF',  //ขาว
        bg: '#111827',         // Gray 900
        base: "#030712",
      };

      return(
        <ThemeContext.Provider value={{theme, toggleTheme, themeColors}}>
            {children}
        </ThemeContext.Provider>
      )};
      export const useTheme = ():ThemeContextType => {
        const context = useContext(ThemeContext);
        if (!context) {
            throw new Error('useTheme must be used within a ThemeProvider');
        }
        return context;
      }