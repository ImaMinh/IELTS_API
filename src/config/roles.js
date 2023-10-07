const ROLE = {
  ADMIN: 'admin', // System admin
  USER: 'user', // User
};

const roles = Object.values(ROLE);

const roleRights = new Map();

const userRights = [
  // Update user info.
  'user.updateUser',
  'user.getTask',
];

const adminRights = [
  'admin.login',
  'admin.getUsers',
];


roleRights.set(ROLE.USER, userRights);

// Admin rights.
roleRights.set(ROLE.ADMIN, adminRights);

module.exports = {
  ROLE,
  roles,
  roleRights,
};
