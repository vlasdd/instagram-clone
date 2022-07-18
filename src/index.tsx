import ReactDOM from 'react-dom/client';
import App from 'App';
import 'style.css';
import { BrowserRouter as Router, HashRouter } from "react-router-dom" 
import { Provider } from 'react-redux';
import store from "redux-setup";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

