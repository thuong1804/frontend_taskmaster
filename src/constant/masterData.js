export const mappingDropdownData = (options = []) =>{
    return options.map(item => ({label: item.name, value: item.id}))
}

export const getLabel = (options) => value => options.find(el => el.value === value)?.label;
