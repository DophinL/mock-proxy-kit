export interface SceneResponse {
  /**
   * 场景名称
   */
  name: string;
  /**
   * 场景数据
   */
  mockData: any;
  /**
   * 场景mock地址
   */
  mockUrl: string;
}

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH' | 'ALL';

export interface ApiResponse {
  /**
   * api id
   */
  id: number | string;
  /**
   * api path
   */
  path: string;
  /**
   * api method
   */
  method: ApiMethod;
  /**
   * api名称
   */
  name: string;
  /**
   * api描述
   */
  desc?: string;
  /**
   * api创建者
   */
  creator?: string;
  /**
   * 如果申明了，会以此为规则的regexFilter。一般用于restful接口
   * @see RE2 syntax
   */
  regexFilter?: string;
  /**
   * mock地址
   */
  mockUrl: string;
  /**
   * mock数据
   */
  mockData: any;
  /**
   * 原接口地址
   */
  sourceUrl?: string;
  /**
   * 多场景数据
   */
  scenes?: SceneResponse[];
}

export type OverviewApiResponse = {
  /**
   * api id
   */
   id: number | string;
   /**
    * api path
    */
   path: string;
   /**
    * api method
    */
   method: ApiMethod;
   /**
    * api名称
    */
   name: string;
   /**
    * api描述
    */
   desc?: string;
   /**
    * api创建者
    */
   creator?: string;
   /**
    * 如果申明了，会以此为规则的regexFilter。一般用于restful接口
    * @see RE2 syntax
    */
   regexFilter?: string;
   /**
    * mock地址
    */
   mockUrl: string;
   /**
    * 原接口地址
    */
   sourceUrl?: string;
}

export interface GroupResponse {
   /**
   * 分组id
   */
  id: number | string;
  /**
   * 分组名
   */
  name: string;
  /**
   * api返回
   */
  apis: OverviewApiResponse[];
}

export interface ProjectResponse {
  /**
   * 分组返回
   */
  groups: GroupResponse[];
}

export interface ApiConfig {
  [key: string]: any;
}

export interface ProjectConfig {
  /**
   * 项目名称
   */
  name: string;
  /**
   * 项目id
   */
  id: string | number;
  /**
   * TODO: api配置，可配置api的restful路径，最终在发送请求的时候，会以此配置为准来转发
   */
  apisConfig?: ApiConfig[];
  /**
   * 其他开发者所需字段
   */
  [key: string]: any;
}

export interface SiteConfig {
  /**
   * 站点名称，比如github
   */
  name: string;
  /**
   * 负责人
   */
  owners?: string[];
  /**
   * 描述
   */
  desc?: string;
  /**
   * 站点的域名
   */
  domains: string[];
  /**
   * 站点对应的项目配置。可能一个站点对应了多个项目（即oneapi、yapi的project）
   */
  projects: ProjectConfig[];
  /**
   * 跨站点配置：可能该站点需要调用其他site的接口
   */
  // crossSiteConfig: unknown;
}

/**
 * 团队配置
 */
export interface TeamConfig {
  // TODO: 未来支持url配置
  sites: SiteConfig[];
  /**
   * 获取project和detail的脚本地址
   */
  scriptUrl: string;
  corsConfig: {
    /**
     * 主要是用于篡改access-control-allow-headers，避免引发cors问题
     * 默认会支持
     */
    accessControlAllowHeaders?: string[];
    /**
     * 重定向的目标地址，比如oneapi.alibaba-inc.com
     */
    redirectTarget: string | string[];
  }
}

/**
 * 开发者自定义函数上下文。
 * 可通过fetchJson，拉取服务端json数据，不受同源限制，拥有高权限
 */
export interface Context {
  fetchJSON: (...args: Parameters<typeof fetch>) => Promise<any>;
}

/**
 * 获取project详情的请求，由开发者自定义
 */
export type GetProjectRequest = (project: ProjectConfig, context: Context) => Promise<ProjectResponse>;

/**
 * 获取api详情的请求，由开发者自定义
 */
export type GetApiRequest = (project: ProjectConfig, api: OverviewApiResponse, context: Context) => Promise<ApiResponse>;