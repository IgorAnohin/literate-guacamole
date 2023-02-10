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

export const BUILDING_ASSET = "BUILDING";
export const SPELL_ASSET = "SPELL";
export const RESOURCE_ASSET = "RESOURCE";
export const RECRUIT_ASSET = "RECRUIT";

export const ASSETS = [
    BUILDING_ASSET, SPELL_ASSET, RESOURCE_ASSET, RECRUIT_ASSET
];

export const ASSETS_FOR_CREATION = [
    BUILDING_ASSET, SPELL_ASSET, RECRUIT_ASSET
];

export const assetTypeToReadable = {
    [BUILDING_ASSET]: "Здание",
    [SPELL_ASSET]: "Заклинание",
    [RESOURCE_ASSET]: "Ресурс",
    [RECRUIT_ASSET]: "Рекрут",
}


export const STONE_RESOURCE = "STONE";
export const WOOD_RESOURCE = "WOOD";
export const GOLD_RESOURCE = "GOLD";
export const GEM_RESOURCE = "GEM";
export const CRYSTAL_RESOURCE = "CRYSTAL";
export const MERCURY_RESOURCE = "MERCURY";

export const ALL_RESOURCES = [
    STONE_RESOURCE, WOOD_RESOURCE, GOLD_RESOURCE, GEM_RESOURCE, CRYSTAL_RESOURCE, MERCURY_RESOURCE
];
export const BUILDING_ASSET_RESOURCES = [
    STONE_RESOURCE, WOOD_RESOURCE, GOLD_RESOURCE, GEM_RESOURCE, CRYSTAL_RESOURCE, MERCURY_RESOURCE
];
export const SPELL_ASSET_RESOURCES = [];
export const RECRUIT_ASSET_RESOURCES = [GOLD_RESOURCE];

export const BUILDING_STATUS_IN_CREATED = "CREATED";
export const BUILDING_STATUS_IN_REFUSED = "REFUSED";
export const BUILDING_STATUS_IN_PROGRESS = "IN_PROGRESS";
export const BUILDING_STATUS_IN_FINISHED = "FINISHED";

export const buildingStatusToReadable = {
    [BUILDING_STATUS_IN_CREATED]: "Создан",
    [BUILDING_STATUS_IN_REFUSED]: "Отклонён",
    [BUILDING_STATUS_IN_PROGRESS]: "В процессе",
    [BUILDING_STATUS_IN_FINISHED]: "Завершён",
}


// Common routes
export const HOME_ROUTE = "/home";

// Admin routes
export const USERS_ROUTE = `${HOME_ROUTE}/users`;
export const NEW_USER_ROUTE = `${HOME_ROUTE}/users/new`;
export const EDIT_USER_ROUTE = (userId) => `${HOME_ROUTE}/users/info/${userId}`;
export const AUDIT_ROUTE = `${HOME_ROUTE}/audit`;
export const ASSETS_ROUTE = `${HOME_ROUTE}/assets`;
export const ASSET_DEFINITIONS_ROUTE = `${HOME_ROUTE}/asset_definitions`;
export const NEW_ASSET_DEFINITIONS_ROUTE = `${HOME_ROUTE}/asset_definitions/new`;
export const EDIT_ASSET_DEFINITIONS_ROUTE = (assetDefId) => `${HOME_ROUTE}/asset_definitions/info/${assetDefId}`;

// Owner routes
export const OWNER_BUILDING_ROUTE = `${HOME_ROUTE}/building`;
export const OWNER_NEW_BUILDING_ORDER_ROUTE = `${OWNER_BUILDING_ROUTE}/new`;
export const OWNER_RECRUITMENT_ROUTE = `${HOME_ROUTE}/recruitment`;
export const OWNER_ASSETS_ROUTE = ASSETS_ROUTE;

// Builder routes
export const BUILDER_BUILDING_ROUTE = `${HOME_ROUTE}/buildings`;
export const BUILDER_NEW_BUILDING_ROUTE = `${BUILDER_BUILDING_ROUTE}/new`;
export const BUILDER_TAKE_ORDER_ROUTE = `${HOME_ROUTE}/order`;
