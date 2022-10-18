import u from 'updeep';
import { getUserList } from '../../services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    showAddModal: false,
  },

  effects: {
    fetchUserList: [
      function*(_, { call, put }) {
        const res = yield call(getUserList);
        yield put({
          type: 'saveList',
          payload: res.payload.list,
        });
      },
      { type: 'takeLatest' },
    ],
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
    clear(state) {
      getUserList.cancel && getUserList.cancel();
      return { ...state, list: [] };
    },
  },
};
