import React from 'react';
import { Link } from 'react-router-dom';
import { Exception } from 'components';

const Exception500 = () => (
  <Exception type="500" desc="抱歉，服务器出错了！" linkElement={Link} />
);

export default Exception500;
