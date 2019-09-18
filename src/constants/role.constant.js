const userRoles = {
  guest: 1,
  user: 2,
  admin: 4
};

const accessLevel = {
  guest: userRoles.guest | userRoles.user | userRoles.admin,
  user: userRoles.user | userRoles.admin,
  admin: userRoles.admin
};

module.exports = {
  userRoles,
  accessLevel
};
