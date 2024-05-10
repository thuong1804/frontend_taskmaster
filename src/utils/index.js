import { passwordRegex, whiteSpaceRegex } from "@/constant/constant";

export const cleanObject = (obj, isNullish) => {
    let result = {};
    if (obj) {
        Object.keys(obj).forEach((key) => {
            if (
                (!Array.isArray(obj[key]) && (isNullish ? ![undefined, null, NaN].includes(obj[key]) : obj[key])) ||
                obj[key]?.length
            )
                result[key] = obj[key];
        });
    }
    return result;
};

 export const convertSearchParamsToObject =(searchParams) => {
    const params = {};
    searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}

export const camelCaseToTitleCase = (camelCase) => {
    if (camelCase === null || camelCase === "") {
        return camelCase;
    }
    camelCase = camelCase.trim();
    let newText = "";   
    for (let i = 0; i < camelCase.length; i++) {
        if (/[A-Z]/.test(camelCase[i]) && i !== 0 && /[a-z]/.test(camelCase[i - 1])) {
            newText += " ";
        }
        if (i === 0 && /[a-z]/.test(camelCase[i])) {
            newText += camelCase[i].toLowerCase();
        } else {
            newText += camelCase[i].toLowerCase();
        }
    }

    return newText;
};


export const mappingDropdownData = (options = []) =>{
    return options.map(item => ({label: item.name, value: item.id}))
}

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const validationPassword = (prefixMsg) => {
    return [
        {required: true, message: `Please input your email ${prefixMsg}!!`},
        {
            pattern: whiteSpaceRegex,
            message: `${prefixMsg} cannot begin and end with spaces!`
        },
        {
            pattern: passwordRegex,
            message: `${prefixMsg} only use letters, numbers and common special characters!`
        },
        {
            min: 8,
            message: `${prefixMsg} must have a minimum of 8 characters!`
        }
    ]
}

export const getLabel = (options) => value => options.find(el => el.value === value)?.label;
