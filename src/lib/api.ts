import type { N8nConfig, PaginatedResponse, Workflow, Execution, Variable, Tag, Credential, User, Project } from './types.js';

function buildQuery(params: Record<string, string | number | boolean | undefined>): string {
  const entries = Object.entries(params).filter(([, v]) => v !== undefined);
  if (entries.length === 0) return '';
  return '?' + entries.map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join('&');
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
  async listWorkflows(opts?: { limit?: number; cursor?: string; active?: boolean; tags?: string; name?: string }): Promise<PaginatedResponse<Workflow>> {
    const q = buildQuery({ limit: opts?.limit, cursor: opts?.cursor, active: opts?.active, tags: opts?.tags, name: opts?.name });
    return this.request(`/workflows${q}`);
  }

  async getWorkflow(id: string): Promise<Workflow> {
    return this.request(`/workflows/${id}`);
  }

  async createWorkflow(workflow: Partial<Workflow>): Promise<Workflow> {
    return this.request('/workflows', { method: 'POST', body: JSON.stringify(workflow) });
  }

  async updateWorkflow(id: string, workflow: Partial<Workflow>): Promise<Workflow> {
    return this.request(`/workflows/${id}`, { method: 'PUT', body: JSON.stringify(workflow) });
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
  async listExecutions(opts?: { limit?: number; cursor?: string; status?: string; workflowId?: string; includeData?: boolean }): Promise<PaginatedResponse<Execution>> {
    const q = buildQuery({ limit: opts?.limit, cursor: opts?.cursor, status: opts?.status, workflowId: opts?.workflowId, includeData: opts?.includeData });
    return this.request(`/executions${q}`);
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
  async listVariables(opts?: { limit?: number; cursor?: string }): Promise<PaginatedResponse<Variable>> {
    const q = buildQuery({ limit: opts?.limit, cursor: opts?.cursor });
    return this.request(`/variables${q}`);
  }

  async getVariable(id: string): Promise<Variable> {
    return this.request(`/variables/${id}`);
  }

  async createVariable(key: string, value: string): Promise<Variable> {
    return this.request('/variables', { method: 'POST', body: JSON.stringify({ key, value }) });
  }

  async updateVariable(id: string, key: string, value: string): Promise<Variable> {
    return this.request(`/variables/${id}`, { method: 'PUT', body: JSON.stringify({ key, value }) });
  }

  async deleteVariable(id: string): Promise<void> {
    await this.request(`/variables/${id}`, { method: 'DELETE' });
  }

  // Tags
  async listTags(opts?: { limit?: number; cursor?: string }): Promise<PaginatedResponse<Tag>> {
    const q = buildQuery({ limit: opts?.limit, cursor: opts?.cursor });
    return this.request(`/tags${q}`);
  }

  async getTag(id: string): Promise<Tag> {
    return this.request(`/tags/${id}`);
  }

  async createTag(name: string): Promise<Tag> {
    return this.request('/tags', { method: 'POST', body: JSON.stringify({ name }) });
  }

  async updateTag(id: string, name: string): Promise<Tag> {
    return this.request(`/tags/${id}`, { method: 'PUT', body: JSON.stringify({ name }) });
  }

  async deleteTag(id: string): Promise<void> {
    await this.request(`/tags/${id}`, { method: 'DELETE' });
  }

  // Credentials
  async listCredentials(opts?: { limit?: number; cursor?: string }): Promise<PaginatedResponse<Credential>> {
    const q = buildQuery({ limit: opts?.limit, cursor: opts?.cursor });
    return this.request(`/credentials${q}`);
  }

  async getCredential(id: string): Promise<Credential> {
    return this.request(`/credentials/${id}`);
  }

  async createCredential(data: any): Promise<Credential> {
    return this.request('/credentials', { method: 'POST', body: JSON.stringify(data) });
  }

  async deleteCredential(id: string): Promise<void> {
    await this.request(`/credentials/${id}`, { method: 'DELETE' });
  }

  async getCredentialSchema(type: string): Promise<any> {
    return this.request(`/credentials/schema/${type}`);
  }

  // Users
  async listUsers(opts?: { limit?: number; cursor?: string; includeRole?: boolean }): Promise<PaginatedResponse<User>> {
    const q = buildQuery({ limit: opts?.limit, cursor: opts?.cursor, includeRole: opts?.includeRole });
    return this.request(`/users${q}`);
  }

  async getUser(id: string): Promise<User> {
    return this.request(`/users/${id}`);
  }

  // Projects
  async listProjects(opts?: { limit?: number; cursor?: string }): Promise<PaginatedResponse<Project>> {
    const q = buildQuery({ limit: opts?.limit, cursor: opts?.cursor });
    return this.request(`/projects${q}`);
  }

  async getProject(id: string): Promise<Project> {
    return this.request(`/projects/${id}`);
  }

  async createProject(data: any): Promise<Project> {
    return this.request('/projects', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateProject(id: string, data: any): Promise<Project> {
    return this.request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteProject(id: string): Promise<void> {
    await this.request(`/projects/${id}`, { method: 'DELETE' });
  }

  // Audit
  async generateAudit(categories?: string[]): Promise<any> {
    const body = categories ? { additionalOptions: { categories } } : {};
    return this.request('/audit', { method: 'POST', body: JSON.stringify(body) });
  }

  // Health
  async ping(): Promise<{ version: string }> {
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
