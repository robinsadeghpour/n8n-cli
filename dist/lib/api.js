export class N8nApi {
    baseUrl;
    apiKey;
    constructor(config) {
        this.baseUrl = config.baseUrl.replace(/\/$/, '');
        this.apiKey = config.apiKey;
    }
    async request(endpoint, options = {}) {
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
    async listWorkflows() {
        return this.request('/workflows');
    }
    async getWorkflow(id) {
        return this.request(`/workflows/${id}`);
    }
    async createWorkflow(workflow) {
        return this.request('/workflows', {
            method: 'POST',
            body: JSON.stringify(workflow),
        });
    }
    async updateWorkflow(id, workflow) {
        return this.request(`/workflows/${id}`, {
            method: 'PUT',
            body: JSON.stringify(workflow),
        });
    }
    async deleteWorkflow(id) {
        await this.request(`/workflows/${id}`, { method: 'DELETE' });
    }
    async activateWorkflow(id) {
        await this.request(`/workflows/${id}/activate`, { method: 'POST' });
    }
    async deactivateWorkflow(id) {
        await this.request(`/workflows/${id}/deactivate`, { method: 'POST' });
    }
    async runWorkflow(id) {
        return this.request(`/workflows/${id}/run`, { method: 'POST' });
    }
    // Executions
    async listExecutions(limit = 50, status) {
        let endpoint = `/executions?limit=${limit}`;
        if (status)
            endpoint += `&status=${status}`;
        return this.request(endpoint);
    }
    async getExecution(id) {
        return this.request(`/executions/${id}`);
    }
    async retryExecution(id) {
        await this.request(`/executions/${id}/retry`, { method: 'POST' });
    }
    async stopExecution(id) {
        await this.request(`/executions/${id}/stop`, { method: 'POST' });
    }
    async deleteExecution(id) {
        await this.request(`/executions/${id}`, { method: 'DELETE' });
    }
    // Variables
    async listVariables() {
        return this.request('/variables');
    }
    async getVariable(key) {
        return this.request(`/variables/${key}`);
    }
    async setVariable(key, value) {
        return this.request('/variables', {
            method: 'POST',
            body: JSON.stringify({ key, value }),
        });
    }
    async deleteVariable(key) {
        await this.request(`/variables/${key}`, { method: 'DELETE' });
    }
    // Tags
    async listTags() {
        return this.request('/tags');
    }
    async createTag(name) {
        return this.request('/tags', {
            method: 'POST',
            body: JSON.stringify({ name }),
        });
    }
    // Health
    async ping() {
        return this.request('/');
    }
}
export function getConfig() {
    const baseUrl = process.env.N8N_BASE_URL || process.env.N8N_URL;
    const apiKey = process.env.N8N_API_KEY;
    if (!baseUrl || !apiKey) {
        throw new Error('Missing N8N_BASE_URL or N8N_API_KEY');
    }
    return { baseUrl, apiKey };
}
