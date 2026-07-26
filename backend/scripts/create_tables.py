"""Create all database tables from models."""
import asyncio
from app.db.base import Base
from app.models import *  # noqa
from sqlalchemy.ext.asyncio import create_async_engine
from app.core.config import get_settings

async def main():
    settings = get_settings()
    engine = create_async_engine(settings.DATABASE_URL)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await engine.dispose()
    print("[SUCCESS] All tables created.")

if __name__ == "__main__":
    asyncio.run(main())
