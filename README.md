# 🍕 Pizza v2 Application

## 🎫 Links

- `Ссылка на GitHub Pages` https://brainman17.github.io/react-star-wars/
- `Курс` https://www.youtube.com/playlist?list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl

## 🧾 Scripts and Commands

```bash
# General
npm run start            # run app in the development mode
npm run deploy           # deploy app on Github Pages
```

```bash
# Deploy (part of "deploy" script)
npm run build            # builds the app for production
npm run build-gh-pages   # deploy on Github Pages
```

### 📟 API

- https://65212399a4199548356cd797.mockapi.io

### 🏗 Технологии

- `React`: хуки useState для хранения локального состояния, useEffect для sideEffects
- `TypeScript`: типизация данных (пропсов, state, компонентов, actions) с помощью Type, Interface, enum
- `React Router v6+`: useParams для получения id пиццы; Link; useLocation для выборочного отображения элементов в зависимости от pathname; useNavigate для перевода на главную при ошибке сервера
- `Redux Toolkit`
- `React-redux`: хуки useDispatch для action dispatch, useSelector для извлечения данных из state
- `SCSS`
