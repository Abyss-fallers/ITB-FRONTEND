# Руководство по Стилю Кодирования ✨

Для обеспечения единообразия и качества кода в проекте ITB - IT Exchange, мы используем следующие инструменты и правила:

## Инструменты и Конфигурации 🛠️

### ESLint

- **Конфигурация:**
  ```json
  {
    "extends": ["next/core-web-vitals", "plugin:storybook/recommended"]
  }
  ```
- **next/core-web-vitals:** Стандарты для проектов на Next.js.
- **plugin:storybook/recommended** Рекомендуемые правила для Storybook.

### StyleLint

- **Конфигурация:**

```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "color-function-notation": ["legacy", { "disableFix": true }],
    "selector-class-pattern": [
      "^[a-z][a-z0-9]*(__[a-z0-9]+)?(--[a-z0-9]+)?$",
      {
        "message": "Class names should follow BEM notation"
      }
    ]
  }
}
```

- **stylelint-config-standard:** Стандартные правила для CSS.
- **color-function-notation:** Настройки для функций цвета.
- **selector-class-pattern:** Использование BEM нотации для классов.

### Prettier

- **Конфигурация:**

```json
{
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "bracketSpacing": true,
  "endOfLine": "lf"
}
```

- **tabWidth:** 2 пробела для отступов.
- **useTabs:** Использование пробелов вместо табуляций.
- **semi:** Отсутствие точек с запятой в конце строк.
- **singleQuote:** Использование одинарных кавычек.
- **bracketSpacing:** Пробелы внутри фигурных скобок.
- **endOfLine:** Конец строки в формате LF.

### EditorConfig

- **Конфигурация:**

```ini
root = true

# All files
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

# TypeScript and JavaScript files
[*.ts, *.tsx, *.js, *.jsx]
indent_size = 2

# HTML files
[*.html]
indent_size = 2

# CSS files
[*.css]
indent_size = 2

# JSON files
[*.json]
indent_size = 2

# YAML files
[*.yml, *.yaml]
indent_size = 2
```

- **charset:** Устанавливает кодировку UTF-8 для всех файлов.
- **indent_style:** Использует пробелы для отступов.
- **indent_size:** Размер отступов — 2 пробела.
- **end_of_line:** Устанавливает конец строки в формат LF.
- **insert_final_newline:** Вставляет новую строку в конце файла.
- **trim_trailing_whitespace:** Удаляет пробелы в конце строк.

Эти настройки помогут поддерживать код в чистоте и упрощают совместную работу над проектом. Соблюдение этих правил обеспечит единый стиль и высокое качество кода.

Этот документ кратко и ясно описывает используемые инструменты и их настройки.

---

Если вам нужно добавить больше специфичных правил или настроек, вы всегда можете расширить этот документ, чтобы он соответствовал вашим требованиям.
