// Assuming you have the JSDoc types for UploadFormData, ValidateRequest, ValidateResponse, and UploadRequest defined elsewhere, as they were in the previous conversion.

/**
 * Validates the captcha.
 * @param {ValidateRequest} payload - The payload for captcha validation.
 * @returns {Promise<ValidateResponse>} - The response from captcha validation.
 */
export async function validateCaptcha(payload) {
    // TODO: need to use an environment variable for the api url
    const response = await fetch(`${import.meta.env.VITE_PRPEL_GUARD_URL}/api/validate`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        let data = await response.json();
        return data;
    } else {
        throw new Error("Captcha validation failed.");
    }
}

/**
 * Validates the headers of a file.
 * @param {string} fileStr - The file content as a string.
 * @throws Will throw an error if the file does not contain the required headers.
 */
export function validateFileHeaders(fileStr) {
    const requiredHeaders = [
        'firstname',
        'surname',
        'age',
        'gender',
        'pay grade',
        'job title',
        'academic',
        'full time',
        'ethnicity',
        'disability',
        'sexual orientation',
    ];

    const lines = fileStr.trim().split('\n');
    const headers = lines[0].trim().split(',');

    if(!requiredHeaders.every((header) => headers.includes(header))) {
        throw new Error('File does not contain the required headers.');
    }
}

/**
 * Handles the upload of form data.
 * @param {UploadFormData} formData - The form data to upload.
 * @param {ValidateResponse} validateResponse - The response from captcha validation.
 * @returns {Promise<string>} - The URL for analysis.
 */
export async function handleUpload(formData, validateResponse) {
    // Constructing the payload for the upload request
    const payload = {
        emailAddress: formData.email,
        organisation: formData.organisation,
        fullName: formData.fullname,
        ipAddress: formData.ipAddress,
        browserFingerprintHash: formData.browserId,
        rawCsvData: formData.fileStr
    };
    
    let analysisUrl = "/analysis/";

    // TODO: need to use an environment variable for the api url
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: "POST",
        headers: {
            "Authorization": `${validateResponse.tokenType} ${validateResponse.accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        let data = await response.json();
        analysisUrl += data.requestId;
        return analysisUrl;
    } else {
        throw new Error("Upload failed.");
    }
}
