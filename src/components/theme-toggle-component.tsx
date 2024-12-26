'use client';

import { motion} from 'framer-motion'
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggleComponent() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
     return (
    <div className="relative flex items-center w-16 h-10 bg-primary-foreground rounded-full p-1">
      <motion.button
        onClick={toggleTheme}
        className="absolute w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-md flex items-center justify-center cursor-pointer border-white"
        initial={{ x: theme === 'light' ? 0 : 20 }}
        animate={{ x: theme === 'light' ? 0 : 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        {theme === 'light' ? <Moon className="h-5 w-5 text-blue-500" /> : <Sun className="h-5 w-5 text-yellow-500" />}
      </motion.button>
    </div>
  );
}