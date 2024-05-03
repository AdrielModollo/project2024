import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

// Certifique-se de que o URI está definido
const uri = process.env.MONGODB_URI ?? '';
if (!uri) {
    throw new Error('A variável de ambiente MONGODB_URI não está definida.');
}

let client: MongoClient | null = null;

export async function getMongoClient(): Promise<MongoClient> {
    if (client === null) {
        client = new MongoClient(uri);
        await client.connect();
    } else {
        try {
            await client.db("admin").command({ ping: 1 });
        } catch (err) {
            await client.connect();
        }
    }
    return client;
}

export async function getDatabase(dbName: string) {
    const client = await getMongoClient();
    return client.db(dbName);
}

export async function closeConnection() {
    if (client !== null) {
        await client.close();
        client = null;
    }
}
