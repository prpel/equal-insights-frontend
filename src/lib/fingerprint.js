/**
 * @typedef {Object} Fingerprint
 * @property {string} userAgent
 * @property {string} language
 * @property {number|undefined} deviceMemory
 * @property {number|undefined} hardwareConcurrency
 * @property {string} screenResolution
 * @property {number} timezoneOffset
 * @property {boolean} sessionStorage
 * @property {boolean} localStorage
 * @property {boolean} indexedDb
 * @property {string|undefined} platform
 * @property {string|undefined} cpuClass
 * @property {number} colorDepth
 * @property {number} maxTouchPoints
 * @property {string|undefined} vendor
 * @property {string|undefined} product
 * @property {boolean} cookieEnabled
 * @property {string|undefined} appVersion
 * @property {string|null} doNotTrack
 */

/**
 * Gets the browser fingerprint.
 * @returns {Promise<string>} - A promise that resolves with the browser's fingerprint hash.
 */
async function getBrowserFingerprint() {
    const navigatorInfo = window.navigator;
    const screenInfo = window.screen;

    let fingerprint = {
        userAgent: navigatorInfo.userAgent,
        language: navigatorInfo.language,
        deviceMemory: (await navigatorInfo.mediaDevices.enumerateDevices()).at(0)?.label.length ?? 0,
        hardwareConcurrency: navigatorInfo.hardwareConcurrency,
        screenResolution: [screenInfo.height, screenInfo.width].toString(),
        timezoneOffset: new Date().getTimezoneOffset(),
        sessionStorage: !!window.sessionStorage,
        localStorage: !!window.localStorage,
        indexedDb: !!window.indexedDB,
        colorDepth: screenInfo.colorDepth,
        maxTouchPoints: navigator.maxTouchPoints,
        cookieEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack,
        platform: navigatorInfo.platform,
        vendor: navigatorInfo.vendor,
        product: navigatorInfo.product,
        appVersion: navigatorInfo.appVersion
    };

    // Converting object to string
    let fingerprintString = JSON.stringify(fingerprint);

    let hash = await getHash(fingerprintString);
    return hash;
}

/**
 * Generates a hash for the given fingerprint string.
 * @param {string} fingerprintString - The fingerprint string to hash.
 * @returns {Promise<string>} - A promise that resolves with the hash of the fingerprint string.
 */
async function getHash(fingerprintString) {
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

// interface Fingerprint {
//     userAgent: string;
//     language: string;
//     deviceMemory: number | undefined;
//     hardwareConcurrency: number | undefined;
//     screenResolution: string;
//     timezoneOffset: number;
//     sessionStorage: boolean;
//     localStorage: boolean;
//     indexedDb: boolean;
//     platform: string | undefined;
//     cpuClass: string | undefined;
//     colorDepth: number;
//     maxTouchPoints: number;
//     vendor: string | undefined;
//     product: string | undefined;
//     cookieEnabled: boolean;
//     appVersion: string | undefined;
//     doNotTrack: string | null;
// }

// async function getBrowserFingerprint(): Promise<string> {
//     const navigatorInfo = window.navigator;
//     const screenInfo = window.screen;

//     let fingerprint: Fingerprint = {
//         userAgent: navigatorInfo.userAgent,
//         language: navigatorInfo.language,
//         deviceMemory: (navigatorInfo as any).deviceMemory,
//         hardwareConcurrency: navigatorInfo.hardwareConcurrency,
//         screenResolution: [screenInfo.height, screenInfo.width].toString(),
//         timezoneOffset: new Date().getTimezoneOffset(),
//         sessionStorage: !!window.sessionStorage,
//         localStorage: !!window.localStorage,
//         indexedDb: !!window.indexedDB,
//         cpuClass: ('cpuClass' in navigatorInfo) ? (navigatorInfo as any).cpuClass : undefined,
//         colorDepth: screenInfo.colorDepth,
//         maxTouchPoints: navigator.maxTouchPoints,
//         cookieEnabled: navigator.cookieEnabled,
//         doNotTrack: navigator.doNotTrack,
//         platform: undefined,
//         vendor: undefined,
//         product: undefined,
//         appVersion: undefined
//     };

//     // Check if userAgentData is available
//     if ((navigator as any).userAgentData) {
//         const platformInfo = await (navigator as any).userAgentData.getHighEntropyValues(
//             ['platform','vendor','product','appVersion']
//         );
//         fingerprint.platform = platformInfo.platform;
//         fingerprint.vendor = platformInfo.vendor;
//         fingerprint.product = platformInfo.product;
//         fingerprint.appVersion = platformInfo.appVersion;
//     } else {
//         fingerprint.platform = navigatorInfo.platform ?? "";
//         fingerprint.vendor = navigatorInfo.vendor ?? "";
//         fingerprint.product = navigatorInfo.product ?? "";
//         fingerprint.appVersion = navigatorInfo.appVersion ?? "";
//     }

//     // Converting object to string
//     let fingerprintString = JSON.stringify(fingerprint);

//     let hash = await getHash(fingerprintString);
//     return hash;
// }

// async function getHash(fingerprintString: string): Promise<string> {
//     // Convert string to array buffer
//     const encoder = new TextEncoder();
//     const data = encoder.encode(fingerprintString);

//     // Generate hash
//     const hashBuffer = await crypto.subtle.digest('SHA-256', data);

//     // Convert hash to string
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

//     return hashHex;
// }

// export { getBrowserFingerprint };