import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { init, ws } from "./api/nvExcel";
import * as serviceWorker from './serviceWorker';
// import { init, ws } from "./api/nvExcel";
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// const Office = window.Office;
Office.initialize = async () => {
  await init().then(x => ReactDOM.render(<App />, document.getElementById('root')));
  ws.regEvents();
  // await ws?.regEvents();
  // console.log(ws);
  // ReactDOM.render(<App />, document.getElementById('root'));
};


// ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
