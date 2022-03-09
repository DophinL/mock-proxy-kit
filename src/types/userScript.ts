import { ApiResponse, OverviewApiResponse, ProjectConfig, ProjectResponse } from "./common";

/**
 * 开发者自定义函数上下文。
 * 可通过fetchJson，拉取服务端json数据，不受同源限制，拥有高权限
 */
export interface Context {
  fetchJSON: <Response>(...args: Parameters<typeof fetch>) => Promise<Response>;
}

/**
 * 获取project详情的请求，由开发者自定义
 */
export type GetProjectRequest = (project: ProjectConfig, context: Context) => Promise<ProjectResponse>;

/**
 * 获取api详情的请求，由开发者自定义
 */
export type GetApiRequest = (project: ProjectConfig, api: OverviewApiResponse, context: Context) => Promise<ApiResponse>;

/**
 * 更改api场景数据，由开发者自定义
 */
export type UpdateApiSceneRequest<Response> = (project: ProjectConfig, api: ApiResponse, context: Context) => Promise<Response>;

export interface UserScript {
  getProject: GetProjectRequest;
  getApi: GetApiRequest;
  updateApiScene?: UpdateApiSceneRequest<any>;
}