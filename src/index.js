import 'babel-polyfill';
// import 'core-js';

import dva from 'dva';
import * as serviceWorker from './serviceWorker';
import router from './router';
import createLoading from 'dva-loading';
import CONSTANT from './config/constant.config';
import '../node_modules/react-resizable/css/styles.css';
import './index.less';

const app = dva({
  onError(error, dispatch) {
    //统一错误处理
  },
});

// 把app对象抛给 给全局对象
Object.defineProperty(window, CONSTANT.GLOBAL_REF, {
  value: app,
  writable: false,
  configurable: false,
  enumerable: false,
});

app.use(createLoading());
// app.model(require('./models/global').default);
app.router(router);
app.start('#root');

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default app._store;
