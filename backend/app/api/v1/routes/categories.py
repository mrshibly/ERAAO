"""Category routes — public listing + admin CRUD."""
from __future__ import annotations
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.core.dependencies import require_role
from app.schemas.category import CategoryCreate, CategoryRead, TagCreate, TagRead
from app.services.category_service import CategoryService

router = APIRouter()

@router.get("", response_model=list[CategoryRead], status_code=200)
async def list_categories(db: AsyncSession = Depends(get_db)):
    from app.core.redis_cache import cache_get, cache_set
    cache_key = "categories:all"
    cached = await cache_get(cache_key)
    if cached:
        return cached

    svc = CategoryService(db)
    cats = await svc.list_categories()
    result = [CategoryRead.model_validate(c).model_dump() for c in cats]
    await cache_set(cache_key, result, ttl=3600)
    return result

@router.post("", response_model=CategoryRead, status_code=201, dependencies=[Depends(require_role("admin"))])
async def create_category(data: CategoryCreate, db: AsyncSession = Depends(get_db)):
    from app.core.redis_cache import cache_invalidate
    svc = CategoryService(db)
    cat = await svc.create_category(**data.model_dump())
    await cache_invalidate("categories:*")
    return CategoryRead.model_validate(cat)

@router.get("/tags", response_model=list[TagRead], status_code=200)
async def list_tags(db: AsyncSession = Depends(get_db)):
    from app.core.redis_cache import cache_get, cache_set
    cache_key = "tags:all"
    cached = await cache_get(cache_key)
    if cached:
        return cached

    svc = CategoryService(db)
    tags = await svc.list_tags()
    result = [TagRead.model_validate(t).model_dump() for t in tags]
    await cache_set(cache_key, result, ttl=3600)
    return result

@router.post("/tags", response_model=TagRead, status_code=201, dependencies=[Depends(require_role("admin"))])
async def create_tag(data: TagCreate, db: AsyncSession = Depends(get_db)):
    from app.core.redis_cache import cache_invalidate
    svc = CategoryService(db)
    tag = await svc.create_tag(**data.model_dump())
    await cache_invalidate("tags:*")
    return TagRead.model_validate(tag)
