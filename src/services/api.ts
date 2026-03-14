import axios from 'axios';

// API基础配置
const API_BASE_URL = 'http://localhost:5000/api'; // 开发环境
// const API_BASE_URL = 'https://api.yourdomain.com/api'; // 生产环境

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 从存储中获取token（这里需要根据实际存储方式调整）
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 统一错误处理
    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // 未授权，跳转到登录页面
          console.error('未授权，请重新登录');
          // 这里可以触发登出逻辑
          break;
        case 403:
          console.error('权限不足');
          break;
        case 404:
          console.error('资源不存在');
          break;
        case 500:
          console.error('服务器内部错误');
          break;
        default:
          console.error(`请求错误: ${status}`);
      }
      
      return Promise.reject(data || error);
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('网络错误，请检查网络连接');
      return Promise.reject(new Error('网络错误，请检查网络连接'));
    } else {
      // 请求配置出错
      console.error('请求配置错误:', error.message);
      return Promise.reject(error);
    }
  }
);

// API接口定义
const apiService = {
  // 健康检查
  health: {
    check: () => api.get('/health'),
  },

  // 项目管理
  projects: {
    // 获取项目列表
    getList: (params = {}) => api.get('/projects', { params }),
    
    // 获取单个项目
    getById: (id) => api.get(`/projects/${id}`),
    
    // 创建项目
    create: (data) => api.post('/projects', data),
    
    // 更新项目
    update: (id, data) => api.put(`/projects/${id}`, data),
    
    // 删除项目
    delete: (id) => api.delete(`/projects/${id}`),
    
    // 获取项目统计
    getStats: () => api.get('/projects/stats'),
  },

  // 任务管理
  tasks: {
    // 获取任务列表
    getList: (projectId, params = {}) => 
      api.get(`/projects/${projectId}/tasks`, { params }),
    
    // 获取单个任务
    getById: (projectId, taskId) => 
      api.get(`/projects/${projectId}/tasks/${taskId}`),
    
    // 创建任务
    create: (projectId, data) => 
      api.post(`/projects/${projectId}/tasks`, data),
    
    // 更新任务
    update: (projectId, taskId, data) => 
      api.put(`/projects/${projectId}/tasks/${taskId}`, data),
    
    // 删除任务
    delete: (projectId, taskId) => 
      api.delete(`/projects/${projectId}/tasks/${taskId}`),
    
    // 更新任务状态
    updateStatus: (projectId, taskId, status) => 
      api.patch(`/projects/${projectId}/tasks/${taskId}/status`, { status }),
  },

  // 用户管理
  users: {
    // 获取用户列表
    getList: (params = {}) => api.get('/users', { params }),
    
    // 获取单个用户
    getById: (id) => api.get(`/users/${id}`),
    
    // 创建用户
    create: (data) => api.post('/users', data),
    
    // 更新用户
    update: (id, data) => api.put(`/users/${id}`, data),
    
    // 删除用户
    delete: (id) => api.delete(`/users/${id}`),
    
    // 获取用户统计
    getStats: () => api.get('/users/stats'),
  },

  // 认证相关
  auth: {
    // 登录
    login: (credentials) => api.post('/auth/login', credentials),
    
    // 注册
    register: (data) => api.post('/auth/register', data),
    
    // 登出
    logout: () => api.post('/auth/logout'),
    
    // 刷新token
    refreshToken: () => api.post('/auth/refresh'),
    
    // 获取当前用户信息
    getCurrentUser: () => api.get('/auth/me'),
    
    // 修改密码
    changePassword: (data) => api.post('/auth/change-password', data),
  },

  // 文件上传
  upload: {
    // 上传文件
    file: (file, onProgress) => {
      const formData = new FormData();
      formData.append('file', file);
      
      return api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: onProgress,
      });
    },
    
    // 获取上传列表
    getList: () => api.get('/upload'),
    
    // 删除文件
    delete: (id) => api.delete(`/upload/${id}`),
  },

  // 通知相关
  notifications: {
    // 获取通知列表
    getList: (params = {}) => api.get('/notifications', { params }),
    
    // 标记为已读
    markAsRead: (id) => api.patch(`/notifications/${id}/read`),
    
    // 标记全部为已读
    markAllAsRead: () => api.patch('/notifications/read-all'),
    
    // 获取未读数量
    getUnreadCount: () => api.get('/notifications/unread-count'),
  },

  // 工具函数
  utils: {
    // 模拟延迟（用于开发测试）
    delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    
    // 模拟API响应（用于开发测试）
    mockResponse: (data, success = true, delay = 500) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (success) {
            resolve({ data, success: true });
          } else {
            reject({ message: '模拟错误', success: false });
          }
        }, delay);
      });
    },
  },
};

export default apiService;