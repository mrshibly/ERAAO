"""Upload service — handles file validation and storage."""
from __future__ import annotations
import uuid
import boto3
from fastapi import HTTPException
from app.core.config import get_settings

ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf", "video/mp4"}
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50 MB

# Magic byte signatures for MIME validation
_MAGIC_BYTES: dict[str, list[bytes]] = {
    "image/jpeg": [b"\xff\xd8\xff"],
    "image/png": [b"\x89PNG\r\n\x1a\n"],
    "image/gif": [b"GIF87a", b"GIF89a"],
    "image/webp": [b"RIFF"],         # RIFF....WEBP
    "application/pdf": [b"%PDF"],
    "video/mp4": [b"\x00\x00\x00\x18ftypmp4", b"\x00\x00\x00\x1cftypisom", b"\x00\x00\x00\x20ftypisom", b"ftyp"],
}


def _verify_magic_bytes(contents: bytes, claimed_mime: str) -> bool:
    """Check that file contents start with expected magic bytes for the claimed MIME type."""
    signatures = _MAGIC_BYTES.get(claimed_mime)
    if not signatures:
        return False  # unknown MIME → reject
    # Special case for WebP: RIFF + 4 size bytes + WEBP
    if claimed_mime == "image/webp":
        return contents[:4] == b"RIFF" and contents[8:12] == b"WEBP"
    # Special case for MP4: ftyp marker can be at different offsets
    if claimed_mime == "video/mp4":
        return b"ftyp" in contents[:32]
    return any(contents[:len(sig)] == sig for sig in signatures)


class UploadService:
    async def upload_file(self, user_id: uuid.UUID, filename: str, content_type: str, contents: bytes) -> dict:
        """Validate size/MIME (via magic bytes) and upload to S3."""
        if content_type not in ALLOWED_MIME_TYPES:
            raise HTTPException(status_code=422, detail=f"Unsupported file type: {content_type}")

        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(status_code=422, detail="File exceeds maximum size of 50MB.")

        # S7: Verify magic bytes match claimed Content-Type to prevent MIME spoofing
        if not _verify_magic_bytes(contents, content_type):
            raise HTTPException(
                status_code=422,
                detail="File content does not match the declared file type. Upload rejected."
            )

        # Upload to S3
        settings = get_settings()
        s3_client = boto3.client(
            "s3",
            region_name=settings.S3_REGION,
            endpoint_url=settings.S3_ENDPOINT_URL,
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
        )
        file_key = f"uploads/{user_id}/{uuid.uuid4()}/{filename}"
        s3_client.put_object(Bucket=settings.S3_BUCKET_NAME, Key=file_key, Body=contents, ContentType=content_type)

        file_url = (
            f"{settings.S3_ENDPOINT_URL}/{settings.S3_BUCKET_NAME}/{file_key}"
            if settings.S3_ENDPOINT_URL
            else f"https://{settings.S3_BUCKET_NAME}.s3.{settings.S3_REGION}.amazonaws.com/{file_key}"
        )

        return {"url": file_url, "filename": filename, "size": len(contents)}

