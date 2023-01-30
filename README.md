# Проект Movies-explorer (фронтенд)
Проект является **дипломной работой** на курсе веб-разработчик ***Яндекс.Практикума***.
Данное веб-приложение является сайтом-портфолио и кинопоиском, открывающимся после регистрации.

***В нём представлены:***

* Лендинг c кратким описанием:
  + Работы над дипломом (этапы, дэдлайны)
  + Изученных технологий во время обучения
  + Информации о себе
  + Портфолио (часть проектов)
* Поисковик фильмов с возможностью сохранения их к себе в коллекцию

---
## *Функциональность:*
* Защищённость роутов (нельзя перейти к приложению-поисковику, если не выполнен вход)
* Реализована "живая" **валидация** всех форм/полей ввода с использованием регулярных выражений и сторонних библиотек
* Использование собственных **хуков** (универсальный обработчик полей, валидация, контроль разрешения экрана)
* Возможность **поиска** фильмов со стороннего API
* Сохранение/удаление найденных фильмов к себе в аккаунт
* Реализован **фильтр** короткометражных фильмов
* Запоминание состояния полей ввода (в форме поиска фильмов), фильтра и найденных фильмов (при обновлении страницы данные не будут утеряны)
* Поиск фильмов как на русском, так и английском языке
* Реализован **попап** для демонтрации ошибок сервера или некорректных введённых данных
* При загрузке данных показывается прелоадер. По окончанию загрузки он скрывается
* Полноценый **респонсив** для всех популярных разрешений экрана
* Бургерное меню для мобильной и планшетной версии
* Реализовано закрытие попапа и бургерного меню по **оверлею** или по клавише **Esc**
* Переход к показу трейлера фильма при нажатии на постер
* Показ данных о фильме при наведении курсора на постер
* Все нужные кнопки подсвечиваются **outline**, им привязанно невидимое, но слышимое описание, для людей с **ограниченными** возможностями
* Приложение свёрстано по **BEM(БЭМ)**, соблюдается **семантичность**
* На странице поиска фильмов по клику на кнопку **"Ещё"** - показываются дополнительные фильмы (на роуте с сохранёнными фильмами показываются сразу **все** фильмы)
* Утилитарные функции, константы, функции обращения к серверу вынесены в отдельный файл
* Запросы к серверу написаны с использованием парадигмы **ООП**
* Возможность редактирования своего профиля (почты и имени)
* Запоминание **состояния** входа пользователя (при обновлении страницы будет выполнен автоматический вход)
* Реализована **микроанимация** всех ссылок и кнопок
* Для создания сеток используется **flex** и **grid**
* Все данные хранятся на сервере, использовано стороннее и собственное API

---
## *Используемые технологии:*
* React.js
* JS
* HTML5
* CSS3
---
## *Планы по доработке:*
* Реализовать сохранение токена в cookie
---
## *Директории:*

`/components` — папка с фунциональными компонентами

`/context` — папка с контекстом

`/hooks` — папка с кастомными хуками

`/images` — папка c изображениями

`/vendor` — папка с кодом сторонних разработчиков

`/utils` — папка с файлами, требуемых для работы сервиса (утилитарные функции, запросы к серверу, константы)

---
## *Запуск проекта:*
`npm i` — установка зависимостей

`npm run start` — запускает приложение

## _Ссылки:_

- Домен фронта [https://movex.nomoredomains.sbs](https://movex.nomoredomains.sbs)
- Локальный домен фронта для разработки и код-ревью [http://localhost:3000/](http://localhost:3000/)
- Домен бэка [https://api.movex.nomoredomains.sbs](https://api.movex.nomoredomains.sbs)
- IP сервера `51.250.10.237`
- Макет на [Figma](https://www.figma.com/proto/cASM20ikAsPlTi2doec68Q/Diploma?node-id=932%3A2618&scaling=min-zoom&page-id=891%3A3857)
