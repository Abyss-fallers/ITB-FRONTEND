# Этап 1: Билд
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только необходимые файлы для установки зависимостей
COPY yarn.lock package.json ./
RUN yarn install --ignore-scripts

# Копируем только исходный код и конфигурационные файлы
COPY src/ ./src/
COPY public/ ./public/
COPY tsconfig.json ./

# Собираем проект
RUN yarn build

# Этап 2: Прод
FROM node:18-alpine

# Создаем нового пользователя и группу без прав суперпользователя
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем собранные файлы из этапа сборки
COPY --from=builder /app/build ./build

# Изменяем владельца файлов приложения на нового пользователя
RUN chown -R appuser:appgroup /app

# Переключаемся на нового пользователя
USER appuser

# Устанавливаем переменную окружения
ENV NODE_ENV=production

# Открываем порт приложения
EXPOSE 3000

# Команда для запуска приложения
CMD ["yarn", "start"]
