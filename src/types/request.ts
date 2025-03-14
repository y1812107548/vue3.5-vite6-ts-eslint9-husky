// 请求响应的通用格式
export interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
}

// 请求配置的扩展接口
export interface RequestOptions {
  // 是否显示加载中
  loading?: boolean;
  // 是否显示错误信息
  showError?: boolean;
  // 其他自定义配置...
} 