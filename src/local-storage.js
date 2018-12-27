export const loadCredentials = () => {
    return JSON.parse(localStorage.getItem('credentials'));
};

export const saveCredentials = credentials => {
    try {
        localStorage.setItem('credentials', JSON.stringify(credentials));
    } catch (e) {}
};

export const clearCredentials = () => {
    try {
        localStorage.removeItem('credentials');
    } catch (e) {}
};