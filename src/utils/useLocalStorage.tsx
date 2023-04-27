// import { useEffect, useState } from "react";
// import { ThemeType } from "~/types/ThemeType";

// export function useLocalStorage<T>(key: string, fallbackValue: T) {
//   const [value, setValue] = useState(fallbackValue);
//   console.log(value);

//   useEffect(() => {
//       const stored = localStorage.getItem(key);
//       setValue(stored ? JSON.parse(stored) as T : fallbackValue);
//   }, [fallbackValue, key]);

//   useEffect(() => {
//       localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue] as const;
// }

// export const useTheme = () => useLocalStorage<ThemeType>('theme', ThemeType.Dark);
