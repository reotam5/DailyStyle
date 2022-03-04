export const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
export const baseUrl = isDevelopment ? process.env.REACT_APP_LOCAL_BASE_URL : process.env.REACT_APP_PRODUCTION_BASE_URL;
