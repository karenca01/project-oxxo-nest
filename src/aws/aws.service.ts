import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { ListBucketsCommand } from '@aws-sdk/client-s3';


@Injectable()
export class AwsService {
    private s3 = new S3Client({
        region: process.env.AWS_REGION,
    })
    
    async listBuckets() {
    try {
        const command = new ListBucketsCommand({});
        const response = await this.s3.send(command);
        console.log("Buckets:", response.Buckets);
    } catch (error) {
        console.error("Error:", error);
    }
    }

    async uploadFile(file: Express.Multer.File) {
        const key = file.originalname;
        const bucket = "nest-oxxo-testt"
        try{
            const command = new PutObjectCommand({
            Key: key,
            Body: file.buffer,
            Bucket: bucket
        })
        const response = await this.s3.send(command);
        
        return response;
        } catch (error) {
            console.error("Error:", error);
        }
    }
}