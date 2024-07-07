import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto-js';

@Injectable()
export class WalletService {
    async hashPrivateKey(privateKey: string): Promise<any> {
        try {
            const salt = process.env.MASTER_KEY;
            return crypto.AES.encrypt(privateKey, salt).toString();
        } catch (error) {
            return null;
        }     
    }

    async recoverPrivateKey(masterKey: string, encryptedKey: string): Promise<boolean> {
        try {
            const bytes = crypto.AES.decrypt(encryptedKey, masterKey);
            const privateKey = bytes.toString(crypto.enc.Utf8);
            return privateKey;
        } catch (error) {
            return null;
        }
    }
}