module.exports = mockjs => {
  return {
    'GET /api/user': mockjs.mock({ id: 1, username: '@name', sex: 6 }),
    'GET /api/user/list': (req, res) => {
      if (res && res.json) {
        res.stateCode = 200;
        res.json(
          mockjs.mock({
            success: true,
            payload: {
              'list|5-20': [
                {
                  appId: '@natural',
                  name: '@cword(3,8)',
                  role: '@cword(1,2)',
                },
              ],
            },
          })
        );
      }
    },
    'POST /api/login': (req, res) => {
      const { password, userName, type } = req.body;
      if (password === '123456' && userName === 'admin') {
        res.send({
          success: true,
          payload: {
            type,
            currentAuthority: 'admin',
          },
        });
        return;
      }
      if (password === '123456' && userName === 'user') {
        res.send({
          success: true,
          payload: {
            type,
            currentAuthority: 'user',
          },
        });
        return;
      }
      res.send({
        success: false,
        payload: {
          type,
          currentAuthority: 'admin',
        },
      });
    },
    'GET /api/logout': (req, res) => {
      res.send({ success: true, payload: { currentAuthority: 'user' } });
    },
    'POST /api/register': (req, res) => {
      res.send({ success: true, payload: { currentAuthority: 'user' } });
    },
  };
};
