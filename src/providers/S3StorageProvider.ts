import {IStorageProvider} from "./IStorageProvider";
import {S3} from "aws-sdk";
import {resolve} from "path";
import upload from "../util/Upload";
import fs from "fs";
import mime from "mime";

export class S3StorageProvider implements IStorageProvider{
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_REGION
        })
    }
    async delete(file: string, folder: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: `${process.env.AWS_S3_BUCKET}/${folder}`,
            Key: file,
        }).promise()

    }

    async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file);
        const fileContent = await fs.promises.readFile(originalName);
        const ContentType = mime.getType(originalName)

        await this.client.putObject({
            Bucket: `${process.env.AWS_S3_BUCKET}/${folder}`,
            Key: file,
            ACL: "public-read",
            Body: fileContent
        }).promise()

        await fs.promises.unlink(originalName);
        return file;
    }

}