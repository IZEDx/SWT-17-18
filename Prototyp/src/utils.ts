
import { readFile as readFileCb } from "fs";
import { createConnection as createConnectionCb, IConnection, IConnectionConfig } from "mysql";
import { Request } from "express";
import { ISession } from "./interfaces";

/**
 * Promise wrapper for fs.readFile
 * @param {string | Buffer} path File to be read.
 */
export function readFile(path: string | Buffer): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        readFileCb(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

/**
 * Promise wrapper for mysql.createConnection
 * @param {IConnectionConfig} config Config to use
 */
export function createConnection(config: IConnectionConfig): Promise<IConnection> {
    return new Promise<IConnection>((resolve, reject) => {
        const conn = createConnectionCb(config);
        conn.connect(async err => {
            if (err) {
                reject(err);
            } else {
                resolve(conn);
            }
        });
    });
}


export function sessionExists(session: any): session is ISession {
    return (session as any).databaseID !== undefined;
}