import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './components/Navigation';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Navigation/>, document.getElementById('root'));
registerServiceWorker();
