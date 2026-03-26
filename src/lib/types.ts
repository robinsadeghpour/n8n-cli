export interface N8nConfig {
  baseUrl: string;
  apiKey: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor?: string | null;
}

export interface ListOptions {
  limit?: number;
  cursor?: string;
}

export interface Workflow {
  id: string;
  name: string;
  active: boolean;
  nodes: any[];
  connections: any;
  settings?: any;
  staticData?: any;
  createdAt: string;
  updatedAt: string;
  tags?: any[];
  versionId?: string;
}

export interface Execution {
  id: string;
  workflowId: string;
  mode: string;
  status: string;
  startedAt: string;
  stoppedAt?: string;
  finished?: boolean;
  data?: any;
  retryOf?: string;
  retrySuccessId?: string;
  customData?: any;
}

export interface Variable {
  id: string;
  key: string;
  value: string;
  type?: string;
}

export interface Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Credential {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isPending: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  type: string;
}
