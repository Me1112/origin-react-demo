import request from '../utils/request';
import api from '../config/api.config';

export async function getRoleList() {
  return request(api.role_list);
}
