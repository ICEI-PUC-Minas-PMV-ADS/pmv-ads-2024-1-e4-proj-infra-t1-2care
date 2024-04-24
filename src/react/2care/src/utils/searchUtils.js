

export const searchCaregivers = (searchText, caregivers) => {
    
    if (!searchText.trim()) {
        return caregivers; 
    }

    const searchTextLowerCase = searchText.toLowerCase();

    return caregivers.filter(caregiver => {
        
        return Object.values(caregiver).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(searchTextLowerCase)
        );
    });
};
