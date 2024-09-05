import { UserModel } from "./UserModel";

export enum Priority {
    HIGHEST = "HIGHEST",
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW",
    LOWEST = "LOWEST"
}

export enum PriorityColor {
    HIGHEST = "red",
    HIGH = "orange",
    MEDIUM = "yellow",
    LOW = "light-green",
    LOWEST = "green"
}

export enum Status {
    OPEN = "OPEN",
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    IN_REVIEW = "IN_REVIEW",
    APPROVED = "APPROVED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
    ON_HOLD = "ON HOLD",
    PENDING_REVIEW = "PENDING REVIEW",
    DEFERRED = "DEFERRED",
    BLOCKED = "BLOCKED",
    READY_FOR_TESTING = "READY_FOR_TESTING",
    IN_TESTING = "IN_TESTING",
    FAILED_TESTING = "FAILED_TESTING",
    READY_FOR_DEPLOYMENT = "READY_FOR_DEPLOYMENT",
    DEPLOYED = "DEPLOYED",
    ARCHIVED = "ARCHIVED",
    WAITING_FOR_INPUT = "WAITING_FOR_INPUT"
}

export const StatusMap: { [key in Status]: string } = {
    [Status.OPEN]: "gray",
    [Status.TO_DO]: "yellow",
    [Status.IN_PROGRESS]: "green",
    [Status.IN_REVIEW]: "blue",
    [Status.APPROVED]: "green",
    [Status.CANCELLED]: "red",
    [Status.COMPLETED]: "green",
    [Status.ON_HOLD]: "yellow",
    [Status.PENDING_REVIEW]: "yellow",
    [Status.DEFERRED]: "yellow",
    [Status.BLOCKED]: "red",
    [Status.READY_FOR_TESTING]: "blue",
    [Status.IN_TESTING]: "blue",
    [Status.FAILED_TESTING]: "red",
    [Status.READY_FOR_DEPLOYMENT]: "green",
    [Status.DEPLOYED]: "green",
    [Status.ARCHIVED]: "gray",
    [Status.WAITING_FOR_INPUT]: "yellow"
};

export interface TaskResponseModel {
    [key: string]: string | boolean | UserModel; // Add an index signature to support dynamic property access
    id: string,
    summary: string,
    description: string,
    status: Status,
    priority: Priority,
    created_at: string,
    user: UserModel
}

export interface TaskModel {
    [key: string]: string | boolean; // Add an index signature to support dynamic property access
    id: string,
    summary: string,
    description: string,
    status: Status,
    priority: Priority,
    created_at: string,
    user_id: string
}

export interface TaskParamModel {
    id: string | undefined,
    user_id: string | undefined,
    summary: string | undefined,
    description: string | undefined,
    created_from: string,
    created_to: string,
    all: boolean,
    page: number,
    size: number
}