const HOST = import.meta.env.VITE_SERVER_URL 

export default HOST

export const AUTH_ROUTES = "api/auth";

export const SIGINUP_ROUTE = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const GET_USER_INFO = `${AUTH_ROUTES}/userInfo`
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`
export const ADD_PROFILE_IMG_ROUTES = `${AUTH_ROUTES}/add-profile-image`
export const DELETE_FORFILE_IMAGE = `${AUTH_ROUTES}/remove-profile-image`
export const  LOGOUT = `${AUTH_ROUTES}/logout`

export const CONTACT_ROUTES = "api/contacts"
export const SEARCH_CONTACTS_ROUTES = `${CONTACT_ROUTES}/serach`;
export const GET_DM_CONTACTS_ROUTES = `${CONTACT_ROUTES}/get-conttacts-for-dm`
export const  GET_ALL_CONTACTS_ROUTES = `${CONTACT_ROUTES}/get-all-contacts`

export const MESSAGES_ROUTES = "api/messages";
export const GET_ALL_MESSAGES_ROUTE = `${MESSAGES_ROUTES}/get-messages`
export const UPLOAD_FILES_ROUTE = `${MESSAGES_ROUTES}/upload-file`


export const CHANNEL_ROUTES = 'api/channel'
export const CREATE_CHANNEL_ROUTE = `${CHANNEL_ROUTES}/create-channel`
export const GET_USER_CHANNELS_ROUTE = `${CHANNEL_ROUTES}/get-user-channels`