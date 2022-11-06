/* tslint:disable */
/* eslint-disable */
/**
 * ShafukuAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  CreateUserDto,
  LoginDto,
  Task,
  TaskAssign,
  TaskStatus,
  UpdateTaskStatusDto,
  UpdateUserDto,
  User,
} from '../models';

export interface AddTaskRequest {
    task: Task;
}

export interface AddTaskAssignerRequest {
    taskId: number;
    requestBody: Array<number>;
}

export interface AddUserRequest {
    createUserDto: CreateUserDto;
}

export interface DeleteTaskRequest {
    id: number;
}

export interface DeleteTaskAssignerRequest {
    taskId: number;
    assignUserId: number;
}

export interface GetTasksRequest {
    userId?: number;
}

export interface LoginRequest {
    loginDto: LoginDto;
}

export interface UpdateTaskRequest {
    id: number;
    task: Task;
}

export interface UpdateTaskStatusRequest {
    taskId: number;
    updateTaskStatusDto: UpdateTaskStatusDto;
}

export interface UpdateUserRequest {
    id: number;
    updateUserDto: UpdateUserDto;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * タスク追加
     */
    async addTaskRaw(requestParameters: AddTaskRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Task>> {
        if (requestParameters.task === null || requestParameters.task === undefined) {
            throw new runtime.RequiredError('task','Required parameter requestParameters.task was null or undefined when calling addTask.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/tasks`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.task,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * タスク追加
     */
    async addTask(requestParameters: AddTaskRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Task> {
        const response = await this.addTaskRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * タスク受領者追加
     */
    async addTaskAssignerRaw(requestParameters: AddTaskAssignerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<TaskAssign>>> {
        if (requestParameters.taskId === null || requestParameters.taskId === undefined) {
            throw new runtime.RequiredError('taskId','Required parameter requestParameters.taskId was null or undefined when calling addTaskAssigner.');
        }

        if (requestParameters.requestBody === null || requestParameters.requestBody === undefined) {
            throw new runtime.RequiredError('requestBody','Required parameter requestParameters.requestBody was null or undefined when calling addTaskAssigner.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/tasks/{taskId}/assigns`.replace(`{${"taskId"}}`, encodeURIComponent(String(requestParameters.taskId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.requestBody,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * タスク受領者追加
     */
    async addTaskAssigner(requestParameters: AddTaskAssignerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<TaskAssign>> {
        const response = await this.addTaskAssignerRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * ユーザー追加
     */
    async addUserRaw(requestParameters: AddUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.createUserDto === null || requestParameters.createUserDto === undefined) {
            throw new runtime.RequiredError('createUserDto','Required parameter requestParameters.createUserDto was null or undefined when calling addUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/users`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.createUserDto,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * ユーザー追加
     */
    async addUser(requestParameters: AddUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.addUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 認証
     */
    async authorizeRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/auth`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * 認証
     */
    async authorize(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.authorizeRaw(initOverrides);
        return await response.value();
    }

    /**
     * タスク削除
     */
    async deleteTaskRaw(requestParameters: DeleteTaskRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteTask.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/tasks/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * タスク削除
     */
    async deleteTask(requestParameters: DeleteTaskRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteTaskRaw(requestParameters, initOverrides);
    }

    /**
     * タスク受領者削除
     */
    async deleteTaskAssignerRaw(requestParameters: DeleteTaskAssignerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.taskId === null || requestParameters.taskId === undefined) {
            throw new runtime.RequiredError('taskId','Required parameter requestParameters.taskId was null or undefined when calling deleteTaskAssigner.');
        }

        if (requestParameters.assignUserId === null || requestParameters.assignUserId === undefined) {
            throw new runtime.RequiredError('assignUserId','Required parameter requestParameters.assignUserId was null or undefined when calling deleteTaskAssigner.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/tasks/{taskId}/assigners/{assignUserId}`.replace(`{${"taskId"}}`, encodeURIComponent(String(requestParameters.taskId))).replace(`{${"assignUserId"}}`, encodeURIComponent(String(requestParameters.assignUserId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * タスク受領者削除
     */
    async deleteTaskAssigner(requestParameters: DeleteTaskAssignerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteTaskAssignerRaw(requestParameters, initOverrides);
    }

    /**
     * タスク一覧取得
     */
    async getTasksRaw(requestParameters: GetTasksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Task>>> {
        const queryParameters: any = {};

        if (requestParameters.userId !== undefined) {
            queryParameters['userId'] = requestParameters.userId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/tasks`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * タスク一覧取得
     */
    async getTasks(requestParameters: GetTasksRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Task>> {
        const response = await this.getTasksRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 全ユーザー取得
     */
    async getUsersRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<User>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/users`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * 全ユーザー取得
     */
    async getUsers(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<User>> {
        const response = await this.getUsersRaw(initOverrides);
        return await response.value();
    }

    /**
     * ログイン
     */
    async loginRaw(requestParameters: LoginRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.loginDto === null || requestParameters.loginDto === undefined) {
            throw new runtime.RequiredError('loginDto','Required parameter requestParameters.loginDto was null or undefined when calling login.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/auth/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.loginDto,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * ログイン
     */
    async login(requestParameters: LoginRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.loginRaw(requestParameters, initOverrides);
    }

    /**
     * ログアウト
     */
    async logoutRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/auth/logout`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * ログアウト
     */
    async logout(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.logoutRaw(initOverrides);
    }

    /**
     * タスク修正
     */
    async updateTaskRaw(requestParameters: UpdateTaskRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Task>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateTask.');
        }

        if (requestParameters.task === null || requestParameters.task === undefined) {
            throw new runtime.RequiredError('task','Required parameter requestParameters.task was null or undefined when calling updateTask.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/tasks/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.task,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * タスク修正
     */
    async updateTask(requestParameters: UpdateTaskRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Task> {
        const response = await this.updateTaskRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * タスクステータス更新
     */
    async updateTaskStatusRaw(requestParameters: UpdateTaskStatusRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TaskStatus>> {
        if (requestParameters.taskId === null || requestParameters.taskId === undefined) {
            throw new runtime.RequiredError('taskId','Required parameter requestParameters.taskId was null or undefined when calling updateTaskStatus.');
        }

        if (requestParameters.updateTaskStatusDto === null || requestParameters.updateTaskStatusDto === undefined) {
            throw new runtime.RequiredError('updateTaskStatusDto','Required parameter requestParameters.updateTaskStatusDto was null or undefined when calling updateTaskStatus.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/tasks/{taskId}/status`.replace(`{${"taskId"}}`, encodeURIComponent(String(requestParameters.taskId))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.updateTaskStatusDto,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * タスクステータス更新
     */
    async updateTaskStatus(requestParameters: UpdateTaskStatusRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TaskStatus> {
        const response = await this.updateTaskStatusRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * ユーザー編集
     */
    async updateUserRaw(requestParameters: UpdateUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateUser.');
        }

        if (requestParameters.updateUserDto === null || requestParameters.updateUserDto === undefined) {
            throw new runtime.RequiredError('updateUserDto','Required parameter requestParameters.updateUserDto was null or undefined when calling updateUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.updateUserDto,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * ユーザー編集
     */
    async updateUser(requestParameters: UpdateUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.updateUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
