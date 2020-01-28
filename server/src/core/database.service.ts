import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { Entity } from './entity.class';

@Injectable()
export class DatabaseService {
    private db: admin.firestore.Firestore;

    constructor(private configService: ConfigService) {
        if (!this.db) {
            this.initializeDatabase();
        }
    }

    private initializeDatabase(): void {
        const cert = JSON.parse(this.configService.get('DATABASE_CERT'));

        admin.initializeApp({
            credential: admin.credential.cert(cert),
        });

        this.db = admin.firestore();
    }

    public getBy<T>(
        collectionName: string,
        documentKey: string,
    ): Promise<T | null> {
        return this.db
            .collection(collectionName)
            .doc(documentKey)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    return null;
                } else {
                    return doc.data() as T;
                }
            });
    }

    public save<T>(
        collectionName: string,
        documentKey: string,
        data: Entity,
    ): Promise<any> {
        return this.db
            .collection(collectionName)
            .doc(documentKey)
            .set(data.toDocument());
    }
}
