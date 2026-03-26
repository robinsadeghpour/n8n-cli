export interface N8nConfig {
  baseUrl: string;
  apiKey: string;
}

export interface Workflow {
  id: string;
  name: string;
  active: boolean;
  nodes: any[];
  connections: any;
  settings?: any;
  createdAt: string;
  updatedAt: string;
}

export interface Execution {
  id: string;
  workflowId: string;
  mode: string;
  status: string;
  startedAt: string;
  finishedAt?: string;
  data?: any;
  error?: string;
}

export interface Variable {
  key: string;
  value: string;
}

export interface Tag {
  id: string;
  name: string;
  createdAt: string;
}

export class N8nApi {
  private baseUrl: string;
  private apiKey: string;

  constructor(config: N8nConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.apiKey = config.apiKey;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'X-N8N-API-KEY': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text().catch(() => 'Unknown error');
      throw new Error(`API Error ${response.status}: ${error}`);
    }

    return response.json();
  }

  // Workflows
  async listWorkflows(): Promise<{ workflows: Workflow[] }> {
    return this.request('/workflows');
  }

  async getWorkflow(id: string): Promise<Workflow> {
    return this.request(`/workflows/${id}`);
  }

  async createWorkflow(workflow: Partial<Workflow>): Promise<Workflow> {
    return this.request('/workflows', {
      method: 'POST',
      body: JSON.stringify(workflow),
    });
  }

  async updateWorkflow(id: string, workflow: Partial<Workflow>): Promise<Workflow> {
    return this.request(`/workflows/${id}`, {
      method: 'PUT',
      body: JSON.stringify(workflow),
    });
  }

  async deleteWorkflow(id: string): Promise<void> {
    await this.request(`/workflows/${id}`, { method: 'DELETE' });
  }

  async activateWorkflow(id: string): Promise<void> {
    await this.request(`/workflows/${id}/activate`, { method: 'POST' });
  }

  async deactivateWorkflow(id: string): Promise<void> {
    await this.request(`/workflows/${id}/deactivate`, { method: 'POST' });
  }

  async runWorkflow(id: string): Promise<{ executionId: string }> {
    return this.request(`/workflows/${id}/run`, { method: 'POST' });
  }

  // Executions
  async listExecutions(limit = 50, status?: string): Promise<{ data: Execution[] }> {
    let endpoint = `/executions?limit=${limit}`;
    if (status) endpoint += `&status=${status}`;
    return this.request(endpoint);
  }

  async getExecution(id: string): Promise<Execution> {
    return this.request(`/executions/${id}`);
  }

  async retryExecution(id: string): Promise<void> {
    await this.request(`/executions/${id}/retry`, { method: 'POST' });
  }

  async stopExecution(id: string): Promise<void> {
    await this.request(`/executions/${id}/stop`, { method: 'POST' });
  }

  async deleteExecution(id: string): Promise<void> {
    await this.request(`/executions/${id}`, { method: 'DELETE' });
  }

  // Variables
  async listVariables(): Promise<{ variables: Variable[] }> {
    return this.request('/variables');
  }

  async getVariable(key: string): Promise<Variable> {
    return this.request(`/variables/${key}`);
  }

  async setVariable(key: string, value: string): Promise<Variable> {
    return this.request('/variables', {
      method: 'POST',
      body: JSON.stringify({ key, value }),
    });
  }

  async deleteVariable(key: string): Promise<void> {
    await this.request(`/variables/${key}`, { method: 'DELETE' });
  }

  // Tags
  async listTags(): Promise<{ tags: Tag[] }> {
    return this.request('/tags');
  }

  async createTag(name: string): Promise<Tag> {
    return this.request('/tags', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  // Health
  async ping(): Promise<{ version: string }> {
    // n8n cloud has no root endpoint; use /workflows as health check
    await this.request<any>('/workflows?limit=1');
    return { version: 'connected' };
  }
}

export function getConfig(): N8nConfig {
  const baseUrl = process.env.N8N_BASE_URL || process.env.N8N_URL;
  const apiKey = process.env.N8N_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error('Missing N8N_BASE_URL or N8N_API_KEY');
  }

  return { baseUrl, apiKey };
}