import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  content: [
    // Пути к вашим файлам с разметкой:
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // HeroUI темы
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class", // класс "dark" на <html> переключает тёмную тему
  theme: {
    extend: {
      // Добавляем основные цвета, которые вы используете в CSS
      colors: {
        // Основной тёмный фон (#1f2029)
        "dark-base": "#1f2029",
        // Дополнительные оттенки тёмного
        "dark-1": "#14151a",
        "dark-2": "#242424",
        "dark-3": "#101010",
        "dark-4": "#000000",
        // Текст по умолчанию (#c4c3ca)
        "text-default": "#c4c3ca",
        white: "#ffffff",
        gray: {
          100: "#ebebeb",
          200: "#e1e1e1"
          // ... при желании добавляйте более тонкие градации
        },
        // можно добавить синонимы для background/foreground
        background: "var(--background)",
        foreground: "var(--foreground)"
      },
      // Прописываем кастомные шрифты, если нужны
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        muli: ["Muli", "sans-serif"]
        // Или как вы их используете
      },
      keyframes: {
        slideInUp: {
          "0%": {
            transform: "translateY(30px)",
            opacity: "0"
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1"
          }
        }
      },
      animation: {
        slideInUp: "slideInUp 0.6s ease forwards"
      }
    }
  },
  plugins: [
    // Плагин HeroUI:
    heroui({
      themes: {
        "purple-dark": {
          // Расширяем тёмную тему
          extend: "dark",
          colors: {
            primary: {
              900: "#1f2029",
              foreground: "#ffffff",
              DEFAULT: "#14151a"
            },
            focus: "#ffffff"
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px"
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px"
            }
          }
        }
      }
    })
  ]
} satisfies Config;
