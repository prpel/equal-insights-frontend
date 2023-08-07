export function readAsText(file: Blob) {
    return new Promise<string>((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsText(file);

        reader.onload = () => {
            resolve(reader.result?.toString() ?? "");
        };

        reader.onerror = () => {
            reject(reader.error);
        };
    });
};

export async function getClientIpAddress(): Promise<string> {
    const response = await fetch('https://api.ipify.org');
    if (response.ok) {
        const ipAddress = await response.text();
        return ipAddress;
    } else {
        throw new Error('Failed to get client IP address.');
    }
}