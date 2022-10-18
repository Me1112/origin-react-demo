import request from '../utils/request';
import api from '../config/api.config';

export async function getMenu() {
  return request(api.common_menu);
}
