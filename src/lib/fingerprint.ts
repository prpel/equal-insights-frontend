interface Fingerprint {
    userAgent: string;
    language: string;
    deviceMemory: number | undefined;
    hardwareConcurrency: number | undefined;
    screenResolution: string;
    timezoneOffset: number;
    sessionStorage: boolean;
    localStorage: boolean;
    indexedDb: boolean;
    platform: string | undefined;
    cpuClass: string | undefined;
    colorDepth: number;
    maxTouchPoints: number;
    vendor: string | undefined;
    product: string | undefined;
    cookieEnabled: boolean;
    appVersion: string | undefined;
    doNotTrack: string | null;
}

async function getBrowserFingerprint(): Promise<string> {
    const navigatorInfo = window.navigator;
    const screenInfo = window.screen;

    let fingerprint: Fingerprint = {
        userAgent: navigatorInfo.userAgent,
        language: navigatorInfo.language,
        deviceMemory: (navigatorInfo as any).deviceMemory,
        hardwareConcurrency: navigatorInfo.hardwareConcurrency,
        screenResolution: [screenInfo.height, screenInfo.width].toString(),
        timezoneOffset: new Date().getTimezoneOffset(),
        sessionStorage: !!window.sessionStorage,
        localStorage: !!window.localStorage,
        indexedDb: !!window.indexedDB,
        cpuClass: ('cpuClass' in navigatorInfo) ? (navigatorInfo as any).cpuClass : undefined,
        colorDepth: screenInfo.colorDepth,
        maxTouchPoints: navigator.maxTouchPoints,
        cookieEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack,
        platform: undefined,
        vendor: undefined,
        product: undefined,
        appVersion: undefined
    };

    // Check if userAgentData is available
    if ((navigator as any).userAgentData) {
        const platformInfo = await (navigator as any).userAgentData.getHighEntropyValues(
            ['platform','vendor','product','appVersion']
        );
        fingerprint.platform = platformInfo.platform;
        fingerprint.vendor = platformInfo.vendor;
        fingerprint.product = platformInfo.product;
        fingerprint.appVersion = platformInfo.appVersion;
    } else {
        fingerprint.platform = navigatorInfo.platform ?? "";
        fingerprint.vendor = navigatorInfo.vendor ?? "";
        fingerprint.product = navigatorInfo.product ?? "";
        fingerprint.appVersion = navigatorInfo.appVersion ?? "";
    }

    // Converting object to string
    let fingerprintString = JSON.stringify(fingerprint);

    let hash = await getHash(fingerprintString);
    return hash;
}

async function getHash(fingerprintString: string): Promise<string> {
    // Convert string to array buffer
    const encoder = new TextEncoder();
    const data = encoder.encode(fingerprintString);

    // Generate hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert hash to string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
}

export { getBrowserFingerprint };