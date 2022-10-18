import React from 'react';
import { Link } from 'react-router-dom';
import { Exception } from 'components';

const Exception404 = () => (
  <Exception type="404" desc="抱歉，您访问的页面飘远了！" linkElement={Link} />
);

export default Exception404;
