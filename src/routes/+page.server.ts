import { fail, redirect } from '@sveltejs/kit';
import type { UploadFormData, ValidateRequest, UploadFailInfo, ValidateResponse, UploadRequest } from '$lib/types';


async function validateCaptcha(payload : ValidateRequest) : Promise<ValidateResponse> {

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

function validateFileHeaders(fileStr: string) {
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

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {

        console.log("Request received.");

        // Parse the form data
        let rawData = await request.formData();
        let formData: UploadFormData = {
            fileStr: rawData.get("fileStr") as string,
            filename: rawData.get("file")?.toString() as string,
            captchaResult: parseInt(rawData.get("captchaResult") as string),
            captchaId: rawData.get("captchaId") as string,
            fullname: rawData.get("fullname") as string,
            email: rawData.get("email") as string,
            organisation: rawData.get("organisation") as string,
            browserId: rawData.get("browserId") as string,
            ipAddress: rawData.get("ipAddress") as string,
        };

        // Validate the captcha
        let validateResponse: ValidateResponse;
        try {
            validateResponse = await validateCaptcha({
                browserFingerprintHash: formData.browserId,
                captchaResult: formData.captchaResult,
                captchaId: formData.captchaId,
            });
        } catch (error) {
            const failInfo: UploadFailInfo = {
                fullname: formData.fullname,
                email: formData.email,
                organisation: formData.organisation,
                captchaResult: "",
                filename: formData.filename,
                fieldWithError: "captchaResult",
                failReason: "Captcha validation failed"
            }
            return fail(422, failInfo);
        }
        console.log("Captcha validated successfully.");

        // Check that the file is not empty and has required headings at least
        try {
            validateFileHeaders(formData.fileStr);
        } catch (error) {
            const failInfo: UploadFailInfo = {
                fullname: formData.fullname,
                email: formData.email,
                organisation: formData.organisation,
                captchaResult: "",
                filename: formData.filename,
                fieldWithError: "fileStr",
                failReason: "File validation failed"
            }
            return fail(422, failInfo);
        }

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
        try {
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
            } else {
                throw new Error("Upload failed.");
            }
        } catch (error) {
            const failInfo: UploadFailInfo = {
                fullname: formData.fullname,
                email: formData.email,
                organisation: formData.organisation,
                captchaResult: "",
                filename: formData.filename,
                fieldWithError: "",
                failReason: "Analysis server failed to respond, try again later"
            }
            fail(500, failInfo);
        }

        console.log("Analysis request sent successfully.");
        throw redirect(303, analysisUrl);
    }
}
