import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function uploadToR2(key: string, body: ReadableStream | ArrayBuffer | string, contentType: string) {
  const context = await getCloudflareContext();
  const bucket = context.env.R2 as R2Bucket;

  if (!bucket) {
    throw new Error("R2 Bucket binding 'R2' not found.");
  }

  await bucket.put(key, body, {
    httpMetadata: { contentType },
  });

  const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;
  return publicUrl;
}

export async function deleteFromR2(key: string) {
  const context = await getCloudflareContext();
  const bucket = context.env.R2 as R2Bucket;

  if (!bucket) {
    throw new Error("R2 Bucket binding 'R2' not found.");
  }

  await bucket.delete(key);
}
