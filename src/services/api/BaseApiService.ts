import axios, { AxiosInstance } from "axios";

export class BaseApiService {
  client: AxiosInstance;
  baseEndpoint: string;

  constructor(baseEndpoint = '', apiClient: AxiosInstance = axios) {
    this.client = apiClient;
    this.baseEndpoint = baseEndpoint;
  }
  // Generic GET request
  async get(endpoint = '', config = {}) {
    try {
      const response = await this.client.get(`${this.baseEndpoint}${endpoint}`, config);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic POST request
  async post(endpoint = '', data = {}, config = {}) {
    try {
      const response = await this.client.post(`${this.baseEndpoint}${endpoint}`, data, config);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic PUT request
  async put(endpoint = '', data = {}, config = {}) {
    try {
      const response = await this.client.put(`${this.baseEndpoint}${endpoint}`, data, config);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic PATCH request
  async patch(endpoint = '', data = {}, config = {}) {
    try {
      const response = await this.client.patch(`${this.baseEndpoint}${endpoint}`, data, config);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic DELETE request
  async delete(endpoint = '', config = {}) {
    try {
      const response = await this.client.delete(`${this.baseEndpoint}${endpoint}`, config);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Upload file
  async upload(endpoint = '', file, additionalData = {}, onProgress = null) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Add additional data to form
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: onProgress,
      };

      const response = await this.client.post(`${this.baseEndpoint}${endpoint}`, formData, config);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handle successful response
  handleResponse(response) {
    return {
      data: response.data,
      status: response.status,
      headers: response.headers,
      success: true,
    };
  }

  // Handle error response
  handleError(error) {
    const errorResponse = {
      success: false,
      message: 'An unexpected error occurred',
      status: null,
      data: null,
    };

    if (error.response) {
      // Server responded with error status
      errorResponse.status = error.response.status;
      errorResponse.data = error.response.data;
      errorResponse.message = error.response.data?.message || `HTTP Error ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      errorResponse.message = 'Network error - please check your connection';
    } else {
      // Something else happened
      errorResponse.message = error.message;
    }

    return errorResponse;
  }

  // Build query parameters
  buildQueryParams(params) {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        searchParams.append(key, params[key]);
      }
    });
    return searchParams.toString();
  }
}