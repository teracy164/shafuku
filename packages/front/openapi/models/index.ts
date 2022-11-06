/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface CreateUserDto
 */
export interface CreateUserDto {
    /**
     * 
     * @type {User}
     * @memberof CreateUserDto
     */
    user: User;
    /**
     * 
     * @type {string}
     * @memberof CreateUserDto
     */
    password: string;
}
/**
 * 
 * @export
 * @interface LoginDto
 */
export interface LoginDto {
    /**
     * 
     * @type {string}
     * @memberof LoginDto
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof LoginDto
     */
    password: string;
}
/**
 * 
 * @export
 * @interface Task
 */
export interface Task {
    /**
     * 
     * @type {number}
     * @memberof Task
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    contents: string;
    /**
     * 
     * @type {number}
     * @memberof Task
     */
    rewards: number;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    orderer: string;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    startDate?: string;
    /**
     * 
     * @type {string}
     * @memberof Task
     */
    endDate: string;
    /**
     * 
     * @type {number}
     * @memberof Task
     */
    numOfRecruit: number;
    /**
     * 
     * @type {TaskStatus}
     * @memberof Task
     */
    lastStatus?: TaskStatus;
    /**
     * 
     * @type {Array<User>}
     * @memberof Task
     */
    assigners?: Array<User>;
}
/**
 * 
 * @export
 * @interface TaskAssign
 */
export interface TaskAssign {
    /**
     * 
     * @type {number}
     * @memberof TaskAssign
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof TaskAssign
     */
    taskId: number;
    /**
     * 
     * @type {number}
     * @memberof TaskAssign
     */
    userId: number;
    /**
     * 
     * @type {Task}
     * @memberof TaskAssign
     */
    task?: Task;
    /**
     * 
     * @type {User}
     * @memberof TaskAssign
     */
    user?: User;
}
/**
 * 
 * @export
 * @interface TaskStatus
 */
export interface TaskStatus {
    /**
     * 
     * @type {number}
     * @memberof TaskStatus
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof TaskStatus
     */
    taskId: number;
    /**
     * 
     * @type {number}
     * @memberof TaskStatus
     */
    status: number;
}
/**
 * 
 * @export
 * @interface UpdateTaskStatusDto
 */
export interface UpdateTaskStatusDto {
    /**
     * 
     * @type {number}
     * @memberof UpdateTaskStatusDto
     */
    status: number;
}
/**
 * 
 * @export
 * @interface UpdateUserDto
 */
export interface UpdateUserDto {
    /**
     * 
     * @type {User}
     * @memberof UpdateUserDto
     */
    user?: User;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserDto
     */
    password?: string;
}
/**
 * 
 * @export
 * @interface User
 */
export interface User {
    /**
     * 
     * @type {number}
     * @memberof User
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    username?: string;
    /**
     * 
     * @type {number}
     * @memberof User
     */
    authority: number;
}
