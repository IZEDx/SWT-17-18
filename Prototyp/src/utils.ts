
import {readFile as readFileCallback} from "fs";

/**
 * Promise wrapper for fs.readFile
 * @param path File to be read.
 */
export function readFile(path: string | Buffer): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        readFileCallback(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
