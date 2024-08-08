import { commonGender, commonStatus, roleGender } from "./constant";

export const statusDDL = [
    { value: commonStatus.COMPLETED, label: 'COMPLETED' },
    { value: commonStatus.PENDING, label: 'PENDING' },
];

export const genderDDL = [
    { value: commonGender.MALE, label: 'MALE' },
    { value: commonGender.FEMALE, label: 'FEMALE' },
];

export const roleDDL = [
    { value: roleGender.ADMIN, label: 'ADMIN' },
    { value: roleGender.USER, label: 'USER' },
];
