import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import './index.css'
// import {BrowserRouter} from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
    <Provider store = {store}>
    <App/>
    </Provider>
    </HashRouter>     
);