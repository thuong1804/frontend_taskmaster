export const passwordRegex =
    /^[-a-zA-Z0-9-~!@#$%^&*()+/?\\_`=;:"'><.,|{}[\]]+(\s+[-a-zA-Z0-9-~!@#$%^&*()+/?\\_`=;:"'><.,|{}[\]]+)*$/;
export const whiteSpaceRegex = /^[^\s]+(\s+[^\s]+)*$/g;
export const phoneRegExp = /^0([35789]([0-9]{8}))$/;


export const commonStatus = {
    PROGRESS: "PROGRESS",
    COMPLETED: "COMPLETED",
    PENDING: "PENDING",
};

export const commonGender = {
    MALE: 1,
    FEMALE: 2,
};

export const roleGender = {
    ADMIN: 1,
    USER: 2,
};

export const TYPE = {
    TEXT: "TEXT",
    SELECT: "SELECT",
    DATETIME: "DATETIME",
};

export const DATETIME_FORMAT_DISPLAY = "HH:mm DD/MM/YYYY";
export const DATETIME_FORMAT_VALUE = "DD/MM/YYYY";

