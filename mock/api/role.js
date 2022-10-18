module.exports = mockjs => {
  return {
    'GET /api/role/list': (req, res) => {
      if (res && res.json) {
        res.stateCode = 200;
        res.json(
          mockjs.mock({
            success: true,
            payload: {
              'list|10': [
                {
                  updateTime: '@natural',
                  lastVerify: '@cword(3,8)',
                  account: '@cword(1,2)',
                  type: '@cword(1,2)',
                  result: '@cword(1,2)',
                  create: '@cword(1,2)',
                },
              ],
            },
          })
        );
      }
    },
  };
};
