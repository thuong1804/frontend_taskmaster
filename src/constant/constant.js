export const passwordRegex =
    /^[-a-zA-Z0-9-~!@#$%^&*()+/?\\_`=;:"'><.,|{}[\]]+(\s+[-a-zA-Z0-9-~!@#$%^&*()+/?\\_`=;:"'><.,|{}[\]]+)*$/;
export const whiteSpaceRegex = /^[^\s]+(\s+[^\s]+)*$/g;
export const phoneRegExp = /^0([35789]([0-9]{8}))$/;


export const commonStatus = {
    PROGRESS: "PROGRESS",
    COMPLETED: "COMPLETED",
    PENDING: "PENDING",
};

export const TYPE = {
    TEXT: "TEXT",
    SELECT: "SELECT",
    DATETIME: "DATETIME",
};

export const DATETIME_FORMAT_DISPLAY = "DD/MM/YYYY HH:mm";
export const DATETIME_FORMAT_VALUE = "DD/MM/YYYY";

