export const DEBUG = true;

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

export const ASSET_BUILDING = "Здание";

export const ASSET_BUILDING_EN = "BUILDING";

export const BUILDING_STATUS_IN_CREATED = "CREATED";
export const BUILDING_STATUS_IN_REJECTED = "REJECTED";
export const BUILDING_STATUS_IN_PROGRESS = "IN_PROGRESS";
export const BUILDING_STATUS_IN_FINISHED = "FINISHED";

export const buildingStatusToReadable = {
    [BUILDING_STATUS_IN_CREATED]: "Создан",
    [BUILDING_STATUS_IN_REJECTED]: "Отклонён",
    [BUILDING_STATUS_IN_PROGRESS]: "В процессе",
    [BUILDING_STATUS_IN_FINISHED]: "Завершён",
}


// Common routes
export const HOME_ROUTE = "/home";

// Admin routes
export const USERS_ROUTE = `${HOME_ROUTE}/users`;
export const NEW_USER_ROUTE = `${HOME_ROUTE}/users/new`;
export const AUDIT_ROUTE = `${HOME_ROUTE}/audit`;
export const RESOURCES_ROUTE = `${HOME_ROUTE}/resources`;

// Owner routes
export const OWNER_BUILDING_ROUTE = `${HOME_ROUTE}/building`;
export const OWNER_NEW_BUILDING_ORDER_ROUTE = `${OWNER_BUILDING_ROUTE}/new`;
export const OWNER_RECRUITMENT_ROUTE = `${HOME_ROUTE}/recruitment`;
export const OWNER_RESOURCES_ROUTE = RESOURCES_ROUTE;

// Builder routes
export const BUILDER_BUILDING_ROUTE = `${HOME_ROUTE}/buildings`;
export const BUILDER_NEW_BUILDING_ROUTE = `${BUILDER_BUILDING_ROUTE}/new`;
export const BUILDER_TAKE_ORDER_ROUTE = `${HOME_ROUTE}/order`;
