import ReactDOM from 'react-dom';
import App from 'App';
import 'style.css';
import { BrowserRouter as Router } from "react-router-dom" 
import { Provider } from 'react-redux';
import store from "redux-setup";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

