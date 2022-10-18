export default Object.freeze({
  // 全局app的引用名称
  GLOBAL_REF: 'G_APP',
  API_TOKEN_KEY: 'GWT_TOKEN',
  AUTHORITY_STORE_KEY: 'G_ROLE',
  paginationConfig: {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共${total}条`,
    defaultCurrent: 1,
    defaultPageSize: 10,
  },
  get APP() {
    return window[this.GLOBAL_REF];
  },
});
