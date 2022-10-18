module.exports = mockjs => ({
  'GET /api/data/list': (req, res) => {
    if (res && res.json) {
      res.stateCode = 200;
      res.json(
        mockjs.mock({
          data: {
            'list|10-20': [{ id: '@natural', name: '@cword(3,8)' }],
          },
        })
      );
    }
  },
});
