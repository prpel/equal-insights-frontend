export type ValidateRequest = {
    browserFingerprintHash: string;
    captchaResult: number;
    captchaId: string;
};

export type UploadFormData = {
    fileStr: string;
    filename: string;
    captchaResult: number;
    captchaId: string;
    fullname: string;
    email: string;
    browserId: string;
    organisation: string;
    ipAddress: string;
}

export type UploadFailInfo = {
    fieldWithError: string;
    failReason: string;
}

export type ValidateResponse = {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
};

export type UploadRequest = {
    emailAddress: string;
    organisation: string;
    fullName: string;
    ipAddress: string;
    browserFingerprintHash: string;
	rawCsvData: string;
}