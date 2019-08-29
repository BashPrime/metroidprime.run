CREATE TABLE roles_permissions (
  roleid INTEGER NOT NULL REFERENCES roles(id),
  permissionid INTEGER NOT NULL REFERENCES permissions(id),
  PRIMARY KEY(roleid, permissionid)
);
