from typing import List, Optional
from uuid import UUID

from config.database import db_dependency
from fastapi import APIRouter, Depends, Query
from fastapi_pagination import Page
from models.task_model import (
    CreateTaskRequestModel,
    TaskRequestModel,
    TaskResponseModel,
)
from schemas.task_schema import Priority, Status
from services import task_service as TaskService
from sqlalchemy.orm import Session
from starlette import status

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.get("", status_code=status.HTTP_200_OK, response_model=Page[TaskResponseModel])
async def get_all_tasks(
    task_request: TaskRequestModel = Depends(),
    junction_type: str = Query(default="AND"),
    status: Optional[List[Status]] = Query(None),
    priority: Optional[List[Priority]] = Query(None),
    db: Session = db_dependency,
):
    print(task_request)
    tasks = TaskService.get_all_tasks(db, task_request, junction_type, status, priority)
    return tasks


@router.get(
    "/{task_id}", status_code=status.HTTP_200_OK, response_model=TaskResponseModel
)
async def get_one_task(task_id: UUID, db: Session = db_dependency):
    return TaskService.get_one_task(db, task_id)


@router.post("", status_code=status.HTTP_201_CREATED, response_model=TaskResponseModel)
async def create_task(
    task_request: CreateTaskRequestModel, db: Session = db_dependency
):
    print(0, task_request)
    return TaskService.create_task(db, task_request)


@router.put(
    "/{task_id}", status_code=status.HTTP_200_OK, response_model=TaskResponseModel
)
async def update_task(
    task_id: UUID,
    task_request: CreateTaskRequestModel,
    r: bool = False,
    db: Session = db_dependency,
):
    return TaskService.update_task(db, task_id, task_request, remove_user=r)


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(task_id: UUID, db: Session = db_dependency):
    return TaskService.delete_task(db, task_id)
