/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import Request, { extend } from 'umi-request';
import { notification } from 'antd';
import constant from 'config/constant.config';

const { NODE_ENV } = process.env;
// 根据实际情况来判断api的前缀
const PUBLIC_URL = NODE_ENV === 'development' ? '' : '';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    if (status === 401) {
      notification.error({
        message: '未登录或登录已过期，请重新登录。',
      });
      // @HACK
      /* eslint-disable no-underscore-dangle */
      constant.APP._store.dispatch({
        type: 'login/logout',
      });
      return;
    }
    if (status !== undefined && url !== undefined) {
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    }
    // environment should not be used
    /*   if (status === 403) {
        router.push('/exception/403');
        return;
      }
      if (status <= 504 && status >= 500) {
        router.push('/exception/500');
        return;
      }
      if (status >= 404 && status < 422) {
        router.push('/exception/404');
      } */
  } else {
    let defaultMsg = 'unknown error';
    /*     //排除手动中断的请求
    if (error instanceof Request.Cancel) {
      return null;
    } */
    notification.error({
      message: error ? error.toString() : defaultMsg,
    });
    return Promise.reject(error ? error.toString() : defaultMsg);
  }

  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// window.cancel = cancel;
// 设置baseUrl(development)
request.interceptors.request.use((url, options) => {
  const { token, cancel } = Request.CancelToken.source();
  options.callFunction && (options.callFunction.cancel = cancel);
  return {
    url: `${PUBLIC_URL}/${url}`,
    options: { ...options, cancelToken: token, cancel },
  };
});

// response拦截器, 处理response
request.interceptors.response.use(async (response, xhr) => {
  /*
    todo:和后端制定通用JSON格式 推荐：
    成功：{"success":true,"data":{}}
    失败：{"success":false,"message":"失败原因"}
   */
  const data = await response.json();
  if (data.success !== true) {
    // notification.error({message: data.msg || codeMessage[data.code] || '未知错误！'});
    return Promise.reject({
      message: data.msg || codeMessage[data.code] || '未知错误！',
    });
  }
  return data;
});

export default request;
