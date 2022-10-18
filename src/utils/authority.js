// use localStorage to store the authority info, which might be sent from server in actual project.
import constant from 'config/constant.config';
let { AUTHORITY_STORE_KEY } = constant;
export function getAuthority() {
  return localStorage.getItem(AUTHORITY_STORE_KEY)
    ? localStorage.getItem(AUTHORITY_STORE_KEY)
    : 'NULL';
}

export function setAuthority(authority) {
  return localStorage.setItem(AUTHORITY_STORE_KEY, authority);
}
