import { getCurrentUser, getPrivilege } from '../services/user';
import u from 'updeep';
export default {
  namespace: 'exportm',

  state: {
    step: 1,
    startTime: '',
    endTime: '',
    startDate: '',
    endDate: '',
  },

  effects: {},

  reducers: {
    update: (state, action) => {
      return u(action.payload, state);
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {});
    },
  },
};
