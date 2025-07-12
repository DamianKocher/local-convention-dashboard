import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from "./App.tsx";
import {setupStore} from "./store/store.ts";
import {Provider} from "react-redux";
import {initializeApp} from "./app/appSaga.ts";

const store = setupStore();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
);

store.dispatch(initializeApp());