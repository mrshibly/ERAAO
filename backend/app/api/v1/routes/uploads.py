"""File upload route : validates MIME type and size, uploads to S3."""
from __future__ import annotations
from fastapi import APIRouter, Depends, UploadFile, File, Request
from app.core.dependencies import get_current_active_user
from app.models.user import User
from app.services.upload_service import UploadService
from app.core.rate_limit import limiter

router = APIRouter()

@router.post("", status_code=201)
@limiter.limit("10/minute")
async def upload_file(request: Request, file: UploadFile = File(...), user: User = Depends(get_current_active_user)):
    """Upload a file to object storage. Returns the file URL."""
    contents = await file.read()
    svc = UploadService()
    return await svc.upload_file(user_id=user.id, filename=file.filename or "file", content_type=file.content_type or "application/octet-stream", contents=contents)
