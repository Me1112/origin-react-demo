import React, { useEffect, useRef } from 'react';
import { connect } from 'dva';
import debounce from 'lodash/debounce';
import { jsonEqual } from 'utils/utils';
import { withRouter } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false, minimum: 0.1 });

const progressDoneFn = debounce(
  loading => loading === false && NProgress.done(),
  200,
  {
    leading: false,
    trailing: true,
  }
);
// let preLocation = null;

const NProgressBar = ({ loading, location }) => {
  const prevLocationRef = useRef();
  // 重置NProgress
  useEffect(() => {
    return () => {
      NProgress.done();
    };
  }, []);
  // 监听loading的glocal的状态 更新NProgress
  useEffect(() => {
    loading.global && NProgress.start();
    progressDoneFn(loading.global);
  }, [loading.global]);

  useEffect(() => {
    if (!jsonEqual(prevLocationRef.current, location)) {
      NProgress.start();
    }
    prevLocationRef.current = location;
    return () => {
      progressDoneFn(false);
    };
  }, [location]);
  return null;
};

export default connect(({ loading }) => ({
  loading,
}))(withRouter(NProgressBar));
