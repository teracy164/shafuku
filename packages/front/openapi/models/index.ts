/* tslint:disable */
/* eslint-disable */
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
}
