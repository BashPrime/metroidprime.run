# User Permissions

metroidprime.run uses role-based access control (RBAC), but with some tweaks. Users can be assigned a role, and roles have a set of key-based permissions that correlate to what functions can be performed from the front-end.

Currently, two roles are implemented:

* Admins
* Moderators

Admins have permissions across the entire site, including all games.

Moderators are granted fewer permissions than admins, but more than a standard user (i.e. a user who does not have a role assigned). However, the role tweaks I mentioned apply to moderators - they only have game-related permissions, such as performing CRUD actions on game articles, for the games they are assigned to in the `moderators_games` table.