export const getURL = (path: string, language: string): string => {  
    return path ? `/${language}${path}` : "/";
};