import type { UploadFormData, ValidateRequest, ValidateResponse, UploadRequest } from '$lib/types';


export async function validateCaptcha(payload : ValidateRequest) : Promise<ValidateResponse> {

    // TODO: need to use an environment variable for the api url
    const response = await fetch(`http://localhost:7071/api/validate`, {
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

export function validateFileHeaders(fileStr: string) {
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

export async function handleUpload(formData: UploadFormData, validateResponse: ValidateResponse) : Promise<string> {

    // Finally we can make the api call to the analysis function
    const payload: UploadRequest = {
        emailAddress: formData.email,
        organisation: formData.organisation,
        fullName: formData.fullname,
        ipAddress: formData.ipAddress,
        browserFingerprintHash: formData.browserId,
        rawCsvData: formData.fileStr
    };
    
    let analysisUrl = "/analysis/";

    // TODO: need to use an environment variable for the api url
    const response = await fetch(`http://localhost:7072/api/upload`, {
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