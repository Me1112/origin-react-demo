import { getCurrentUser, getPrivilege } from '../services/user';
export default {
  namespace: 'global',

  state: {
    collapsed: false,
    fixSiderbar: true,
    currentUser: {},
    privilegeList: [],
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const res = yield call(getCurrentUser);
      yield put({
        type: 'saveCurrentUser',
        payload: res.payload,
      });

      return res.payload;
    },
    *fetchPrivilege(_, { call, put }) {
      const res = yield call(getPrivilege);
      yield put({
        type: 'savePrivilegeList',
        payload: res.payload,
      });

      return res.payload;
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    savePrivilegeList(state, action) {
      return {
        ...state,
        privilegeList: action.payload,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {});
    },
  },
};
