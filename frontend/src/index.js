import React from 'react';
import ReactDOM from 'react-dom';
import Login from './pages/Login';
import Routes from './routes/Routes';
//import Routes from './routes/Routes';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';





ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

