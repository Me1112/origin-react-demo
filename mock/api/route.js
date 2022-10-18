module.exports = mockjs => ({
  '/api/auth_routes': {
    '/user/admin': { authority: ['admin', 'user'] },
  },
});
