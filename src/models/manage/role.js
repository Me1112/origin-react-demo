import u from 'updeep';
import { getRoleList } from '../../services/role';

export default {
  namespace: 'role',

  state: {
    list: [],
    showAddModal: false,
  },

  effects: {
    *fetchRoleList(_, { call, put }) {
      const res = yield call(getRoleList);
      yield put({
        type: 'update',
        payload: {
          list: res.payload.list,
        },
      });
    },
  },

  reducers: {
    update(state, action) {
      return u(action.payload, state);
    },
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
