import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";

const bucketName = process.env.BUCKET_NAME!;

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    endpoint: process.env.S3_ENDPOINT!,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true,
});

export async function createBucket() {
    await s3.send(new CreateBucketCommand({Bucket: bucketName}));
    console.log("Bucket");
}
