import request from '../utils/request';
import api from '../config/api.config';

export async function getCurrentUser() {
  return request(api.current_user);
}

export async function getPrivilege() {
  return request(api.common_privilege);
}

export async function login(params) {
  return request(api.user_login, {
    method: 'POST',
    data: params,
  });
}

export async function logout() {
  return request(api.user_logout);
}

export async function getUserList() {
  return request(api.user_list, { callFunction: getUserList });
}
