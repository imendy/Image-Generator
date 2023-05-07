import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'


function Header() {

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}
	const currentTheme = theme === "system" ? systemTheme : theme;


 // const currentTheme = theme === 'system' ? systemTheme : theme;

  {/* const renderThemeChanger = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
       return
         (
         <SunIcon 
           className="w-7 h-7"
           role="button"
           onClick{() => setTheme('light')}
           />
       )
    
    } else {
     return (
         <MoonIcon 
           className="w-7 h-7"
           role="button"
           onClick{() => setTheme('dark')}
           />
       )
  }
} */}
  
  return (
    <div className="flex items-center justify-between p-6 min-[560px]:px-16 md:px-40 md:p-8">
      <h1 className="text-2xl font-medium min-[560px]:text-3xl md:text-4xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-transparent inline-block bg-clip-text">imaGinator</h1>
      <div className="flex items-center space-x-2">
        <select value={theme} onChange={e => setTheme(e.target.value)}
          className="text-sm bg-transparent outline-none"
          >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
    </select>
        {currentTheme === "dark" ? (
				<SunIcon
					className="h-4 w-4 cursor-pointer text-yellow-500"
					onClick={() => setTheme("light")}
				/>
			) : (
				<MoonIcon
					className="h-4 w-4 cursor-pointer text-slate-600"
					onClick={() => setTheme("dark")}
				/>
			)}  
      </div>
    </div>
  )
}

export default Header