import request from "../utils/request";
import api from "../config/api.config";

export async function getSettingsUserList() {
  return request(api.settings_user_list);
}
export async function getSettingsCityList() {
  return request(api.settings_city_list);
}

export async function getSettingsRoleList() {
  return request(api.settings_role_list);
}

export async function getSettingsModuleList() {
  return request(api.settings_module_list);
}
export async function addSettingsUser(params) {
  return request(api.settings_add_user, {
    method: "POST",
    data: params,
  });
}

export async function addSettingsRole(params) {
  return request(api.settings_add_role, {
    method: "POST",
    data: params,
  });
}

export async function modifySettingsUser(params) {
  return request(api.settings_modify_user, {
    method: "PUT",
    data: params,
  });
}
export async function deleteSettingsuser(params) {
  return request(api.settings_add_role, {
    method: "DELETE",
    params,
  });
}
export async function modifySettingsModule(params) {
  return request(api.settings_modify_module, {
    method: "PUT",
    data: params,
  });
}
