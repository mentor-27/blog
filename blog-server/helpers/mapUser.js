module.exports = function (user) {
  return {
    id: user?.id,
    login: user?.login,
    roleId: user?.roleId,
    registeredAt: user?.createdAt,
  };
};
