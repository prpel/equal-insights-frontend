/**
 * Reads a Blob as text.
 * @param {Blob} file - The Blob to read.
 * @returns {Promise<string>} - A promise that resolves with the Blob's content as a string.
 */
export function readAsText(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsText(file);

        reader.onload = () => {
            resolve(reader.result?.toString() ?? "");
        };

        reader.onerror = () => {
            reject(reader.error);
        };
    });
}

/**
 * Gets the client's IP address.
 * @returns {Promise<string>} - A promise that resolves with the client's IP address.
 */
export async function getClientIpAddress() {
    const response = await fetch('https://api.ipify.org');
    if (response.ok) {
        const ipAddress = await response.text();
        return ipAddress;
    } else {
        throw new Error('Failed to get client IP address.');
    }
}
