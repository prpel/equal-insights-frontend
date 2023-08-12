/**
 * @typedef {Object} ValidateRequest
 * @property {string} browserFingerprintHash
 * @property {number} captchaResult
 * @property {string} captchaId
 */

/**
 * @typedef {Object} UploadFormData
 * @property {string} fileStr
 * @property {string} filename
 * @property {number} captchaResult
 * @property {string} captchaId
 * @property {string} fullname
 * @property {string} email
 * @property {string} browserId
 * @property {string} organisation
 * @property {string} ipAddress
 */

/**
 * @typedef {Object} UploadFailInfo
 * @property {string} fieldWithError
 * @property {string} failReason
 */

/**
 * @typedef {Object} ValidateResponse
 * @property {string} accessToken
 * @property {string} tokenType
 * @property {number} expiresIn
 */

/**
 * @typedef {Object} UploadRequest
 * @property {string} emailAddress
 * @property {string} organisation
 * @property {string} fullName
 * @property {string} ipAddress
 * @property {string} browserFingerprintHash
 * @property {string} rawCsvData
 */
