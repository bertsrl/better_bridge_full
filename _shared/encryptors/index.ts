import CryptoJS from "crypto-js";
import env from "../../env";

export function aes256GcmXorEncryptor(data: string) { 
    // aes256 encryption with encryption key and iv
    const aesEncryptedString = CryptoJS.AES.encrypt(
        data, env.ENCRYPTION_KEY,
        { iv: env.ENCRYPTION_IV }
    ).toString();
    
    // XOR phase
    const xorEncryptedString = CryptoJS.XOR.encrypt(aesEncryptedString, env.ENCRYPTION_KEY).toString();
    
    return xorEncryptedString;
}

export function aes256GcmXorDecryptor(data: string) {
    const xorDecryptedString = CryptoJS.XOR.decrypt(data, env.ENCRYPTION_KEY, { iv: "" }).toString();
    
    const aesDecryptedString = CryptoJS.AES.decrypt(
        xorDecryptedString, env.ENCRYPTION_KEY,
        { iv: env.ENCRYPTION_IV }
    ).toString(CryptoJS.enc.Utf8);
    
    return aesDecryptedString;
}