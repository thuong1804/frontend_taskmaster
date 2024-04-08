export const mappingDropdownData = (options = []) =>{
    return options.map(item => ({label: item.name, value: item.id}))
}

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const getLabel = (options) => value => options.find(el => el.value === value)?.label;
