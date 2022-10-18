import {
  getSettingsUserList,
  getSettingsCityList,
  getSettingsRoleList,
  addSettingsUser,
  modifySettingsUser,
  deleteSettingsuser,
} from "services/settings";

import { actionMakerBySubKey } from "../../_utils";
const saveSettingsUserManage = actionMakerBySubKey("save", "userSettignsState");
export const initState = {
  userList: [],
  roleList: [],
  cityList: [],
  
};

export default {
  *getSettingsUserList({ payload }, { call, put }) {
    const res = yield call(getSettingsUserList, payload);
    yield put(
      saveSettingsUserManage({
        userList: res || [],
      })
    );
    return res;
  },
  *deleteSettingsuser({ payload }, { call, put }) {
    const res = yield call(deleteSettingsuser, payload);
    yield put(saveSettingsUserManage({res }));
  },
  *addSettingsUser({ payload }, { call, put }) {
    const res = yield call(addSettingsUser, payload);
    yield put(saveSettingsUserManage({res }));
  },
  *modifySettingsUser({ payload }, { call, put }) {
    const res = yield call(modifySettingsUser, payload);
    yield put(saveSettingsUserManage({res }));
  },
  *getSettingsCityList({ payload }, { call, put }) {
    const res = yield call(getSettingsCityList, payload);
    // return Promise.resolve(res);
    yield put(
      saveSettingsUserManage({
        cityList: res || [],
      })
    );
  },
  *getSettingsRoleList({ payload }, { call, put }) {
    const res = yield call(getSettingsRoleList, payload);
    // return Promise.resolve(res);
    yield put(
      saveSettingsUserManage({
        roleList: res || [],
      })
    );
  },
};
