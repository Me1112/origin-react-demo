// 接口的配置
const pathMatch = window.location.pathname.match(
  /^(\/[^\/\.]+)\/?$|^(\/[^\/]+)(\/[^\/]+)+/
) || ['', '', ''];
const CTX = '';
const HOST = '';
const rootPath = `${HOST}${CTX}api/`;

export default {
  // 菜单
  common_menu: `${rootPath}menu`,
  common_privilege: `${rootPath}privilege`,
  current_user: `${rootPath}currentUser`,
  user_login: `${rootPath}login`,
  user_logout: `${rootPath}logout`,
  user_list: `${rootPath}user/list`,
  role_list: `${rootPath}role/list`,
  settings_user_list:`${ rootPath}/settings/userList`,
  settings_city_list:`${ rootPath}/settings/cityList`,
  settings_role_list:`${ rootPath}/settings/roleList`,
  settings_module_list:`${ rootPath}/settings/moduleList`,
  settings_modify_user:`${ rootPath}/settings/modifyUser`,
  settings_add_user:`${ rootPath}/settings/addUser`,
  settings_delete_user:`${ rootPath}/settings/deleteUser`,
  settings_add_role:`${ rootPath}/settings/addRoLe`,
  settings_modify_module:`${ rootPath}/settings/modifyModule`,
};
