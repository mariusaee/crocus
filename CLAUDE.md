# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Проект

"Crocus" - это интерактивное веб-приложение "Волшебный Сад" для посадки виртуальных цветов с именами пользователей. Цветы отображаются на визуальном поле сада с табличками имён, анимациями и различными эффектами покачивания.

## Основные команды

**Разработка:**
- `npm run dev` - запуск dev-сервера Vite (порт 5173)
- `npm run build` - production сборка в директорию `dist/`
- `npm run preview` - предпросмотр production сборки

**Деплой:**
- `npm run deploy` - автоматический деплой на GitHub Pages (выполняет build + gh-pages)
- Проект доступен по адресу: https://mmalyshev.github.io/crocus/

## Архитектура приложения

### Технологический стек
- **React 18** с React Router для навигации
- **Firebase Realtime Database** для синхронизации данных между пользователями в реальном времени
- **Vite** как сборщик и dev-сервер
- **GitHub Pages** для хостинга

### Структура компонентов

**App.jsx** - корневой компонент:
- Инициализирует Firebase подписку через `onValue()` для real-time синхронизации
- Управляет состоянием массива `flowers` через Firebase
- Методы: `addFlower()`, `removeFlower()`, `removeAllFlowers()`
- Настройка роутинга с `basename="/crocus"` для GitHub Pages

**GardenField.jsx** - главная страница (путь `/`):
- Визуальное отображение сада с цветами и облаками
- Интерактивность: клик по цветку для удаления, hover для тултипа с информацией
- Звуковые эффекты при удалении (Web Audio API)
- Каждый цветок имеет: изображение, табличку с именем, случайную позицию, анимацию появления, тип покачивания

**FlowerControls.jsx** - страница управления (путь `/add`):
- Форма для ввода имени пользователя (макс. 12 символов)
- Выбор анимации посадки (spiral, bounce, zoom, flip, elastic, wave, или random)
- Выбор типа покачивания (gentle, wind, dance, rotate, bounce, или random)
- Кнопки: посадить 1 цветок, посадить 5 цветов, удалить все цветы
- Генерация случайных координат для размещения цветков

**Устаревшие компоненты** (не используются в текущей версии):
- `GuestList.jsx` - старый компонент списка гостей
- `AddGuest.jsx` - старая форма добавления гостей

### Firebase структура данных

База данных: `crocus-garden-default-rtdb.europe-west1.firebasedatabase.app`

Структура объекта цветка в Firebase (`flowers/{flowerId}`):
```javascript
{
  id: "timestamp_randomstring",
  x: number,              // координата X (100 до viewport width - 200)
  y: number,              // координата Y (50%-90% от высоты viewport)
  flower: "flowerP.png" | "flowerPW.png" | "flowerW.png" | "flowerWYP.png" | "flowerY.png" | "flowerYP.png" | "flowerYW.png",
  sign: "sign1.png" | "sign2.png" | "sign3.png",
  layout: "left-layout" | "right-layout",
  animation: "spiral" | "bounce" | "zoom" | "flip" | "elastic" | "wave",
  sway: "gentle" | "wind" | "dance" | "rotate" | "bounce",
  userName: string,       // имя пользователя (макс. 12 символов)
  plantDate: ISOString    // дата создания
}
```

### Конфигурация деплоя

- **Base URL**: `/crocus/` (настроено в `vite.config.js` и роутере)
- **SPA routing**: `index.html` содержит скрипт для редиректа 404 -> правильный route (для GitHub Pages)
- **Изображения**: размещаются в `public/` и доступны через `import.meta.env.BASE_URL`

## Важные правила работы

- **Всегда делай коммит** со своими изменениями, чтобы на GitHub Pages был виден результат
- **Всегда в конце** давай ссылку на проект: https://mmalyshev.github.io/crocus/
- При работе с изображениями используй `${import.meta.env.BASE_URL}` для корректных путей
- Firebase подписки требуют cleanup через `return () => unsubscribe()` в useEffect
- на сранице /add у нас только управление кнопками. Никаких анимаций там не должно быть. Никаких допольнительных окон тоже.
Все view на странице с садом /crocus/. Все анимации, цветы, допольнительные окна