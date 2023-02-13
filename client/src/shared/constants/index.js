"use strict";
exports.__esModule = true;
exports.ApiResponseCode = exports.ApiMethod = exports.LocalStorageKey = exports.ErrorType = exports.ErrorName = exports.UserType = exports.CURRENT_USER_API_ENDPOINT = exports.ROOT_PAGE_PATH = exports.AUTHORIZATION_HEADER = exports.QUERY_URL_SEPARATOR = exports.PAGE_TITLE_DIVIDER = exports.EMPTY_STRING = exports.ZERO = exports.APP_NAME = void 0;
exports.APP_NAME = 'POS`Coffee';
exports.ZERO = 0;
exports.EMPTY_STRING = '';
exports.PAGE_TITLE_DIVIDER = ' | ';
exports.QUERY_URL_SEPARATOR = '?';
exports.AUTHORIZATION_HEADER = 'Authorization';
exports.ROOT_PAGE_PATH = '/';
exports.CURRENT_USER_API_ENDPOINT = '/api/users';
var UserType;
(function (UserType) {
    UserType["ADMIN"] = "ADMIN";
    UserType["MANAGER"] = "MANAGER";
    UserType["WAITER"] = "WAITER";
})(UserType = exports.UserType || (exports.UserType = {}));
var ErrorName;
(function (ErrorName) {
    ErrorName["AUTH_ERROR"] = "AuthError";
    ErrorName["API_ERROR"] = "ApiError";
    ErrorName["VALIDATION_ERROR"] = "ValidationError";
    ErrorName["PROGER_ERROR"] = "ProgerError";
})(ErrorName = exports.ErrorName || (exports.ErrorName = {}));
var ErrorType;
(function (ErrorType) {
    ErrorType["AUTH"] = "AUTH";
    ErrorType["SERVER"] = "SERVER";
    ErrorType["CLIENT"] = "CLIENT";
    ErrorType["VALIDATION"] = "VALIDATION";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
var LocalStorageKey;
(function (LocalStorageKey) {
    LocalStorageKey["USER_TOKEN"] = "USER_TOKEN";
    LocalStorageKey["LAST_URL"] = "LAST_URL";
})(LocalStorageKey = exports.LocalStorageKey || (exports.LocalStorageKey = {}));
var ApiMethod;
(function (ApiMethod) {
    ApiMethod["GET"] = "GET";
    ApiMethod["POST"] = "POST";
    ApiMethod["PUT"] = "PUT";
    ApiMethod["DELETE"] = "DELETE";
})(ApiMethod = exports.ApiMethod || (exports.ApiMethod = {}));
var ApiResponseCode;
(function (ApiResponseCode) {
    ApiResponseCode[ApiResponseCode["SUCCESS"] = 200] = "SUCCESS";
    ApiResponseCode[ApiResponseCode["CREATED"] = 201] = "CREATED";
    ApiResponseCode[ApiResponseCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    ApiResponseCode[ApiResponseCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ApiResponseCode[ApiResponseCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
})(ApiResponseCode = exports.ApiResponseCode || (exports.ApiResponseCode = {}));
