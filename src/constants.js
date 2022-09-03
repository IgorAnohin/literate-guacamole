export const ADMIN_ROLE = "admin";
export const OWNER_ROLE = "owner";
export const BUILDER_ROLE = "builder";
export const WARRIOR_ROLE = "warrior";
export const WIZARD_ROLE = "wizard";

export const ROLES = [
    ADMIN_ROLE, OWNER_ROLE, BUILDER_ROLE, WARRIOR_ROLE, WIZARD_ROLE
];

export const roleToReadable = {
    [ADMIN_ROLE]: "Администратор",
    [OWNER_ROLE]: "Владелец замка",
    [BUILDER_ROLE]: "Строитель",
    [WARRIOR_ROLE]: "Генерал казарм",
    [WIZARD_ROLE]: "Волшебник",
}


export const ADMIN_HOME_ROUTE = "/home";
export const USERS_ROUTE = `${ADMIN_HOME_ROUTE}/users`;
export const NEW_USER_ROUTE = `${ADMIN_HOME_ROUTE}/users/new`;
export const AUDIT_ROUTE = `${ADMIN_HOME_ROUTE}/audit`;
export const RESOURCES_ROUTE = `${ADMIN_HOME_ROUTE}/resources`;
