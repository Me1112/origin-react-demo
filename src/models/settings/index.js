/*
 * 用户管理员
 */
import cloneDeep from 'lodash/cloneDeep';
import commonReduces from '../_commonReducer';


import userSettingsEffect, { initState as userSettingsState } from './effects/userManage';

const initState = {
    userSettingsState,
};

export default {
  namespace: 'settings',

  state: cloneDeep(initState),

  effects: {
    ...userSettingsEffect,
  },
  reducers: {
    ...commonReduces,
    clear() {
      return cloneDeep(initState);
    },
    move() {
      return;
    },
  },
};
