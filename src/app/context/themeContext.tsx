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
        navbar: string;
    }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
    const [theme, setTheme] = useState<Theme>('light');
    const toggleTheme = () => {
        console.log('theme toggle')
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
      };

      const themeColors = theme === 'light' ? {
        primary: '#FFFFFF',       // สีพื้นหลังหลัก สำหรับ theme light
        secondary: '#F0F0F0',     // สีรอง สำหรับ theme light
        tertiary: '#E0E0E0',       // สีเพิ่มเติม สำหรับ theme light
        text: '#000000',           // สีข้อความ สำหรับ theme light
        navbar: '#CCCCCC',         // สีแถบ navbar สำหรับ theme light
      } : {
        primary: '#333333',       // สีพื้นหลังหลัก สำหรับ theme dark
        secondary: '#444444',     // สีรอง สำหรับ theme dark
        tertiary: '#555555',       // สีเพิ่มเติม สำหรับ theme dark
        text: 'text-[#E0E0E0]',           // สีข้อความ สำหรับ theme dark
        navbar: '#222222',         // สีแถบ navbar สำหรับ theme dark
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