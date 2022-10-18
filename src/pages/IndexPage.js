import { connect } from 'dva';
import React from 'react';

const IndexApp = props => {
  return (
    <>
      <hr />
      <div>Index-page {JSON.stringify(Object.keys(props), null, 2)}</div>
    </>
  );
};

export default connect(({ global }) => ({
  global,
}))(IndexApp);
