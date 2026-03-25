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
export declare class N8nApi {
    private baseUrl;
    private apiKey;
    constructor(config: N8nConfig);
    private request;
    listWorkflows(): Promise<{
        workflows: Workflow[];
    }>;
    getWorkflow(id: string): Promise<Workflow>;
    createWorkflow(workflow: Partial<Workflow>): Promise<Workflow>;
    updateWorkflow(id: string, workflow: Partial<Workflow>): Promise<Workflow>;
    deleteWorkflow(id: string): Promise<void>;
    activateWorkflow(id: string): Promise<void>;
    deactivateWorkflow(id: string): Promise<void>;
    runWorkflow(id: string): Promise<{
        executionId: string;
    }>;
    listExecutions(limit?: number, status?: string): Promise<{
        data: Execution[];
    }>;
    getExecution(id: string): Promise<Execution>;
    retryExecution(id: string): Promise<void>;
    stopExecution(id: string): Promise<void>;
    deleteExecution(id: string): Promise<void>;
    listVariables(): Promise<{
        variables: Variable[];
    }>;
    getVariable(key: string): Promise<Variable>;
    setVariable(key: string, value: string): Promise<Variable>;
    deleteVariable(key: string): Promise<void>;
    listTags(): Promise<{
        tags: Tag[];
    }>;
    createTag(name: string): Promise<Tag>;
    ping(): Promise<{
        version: string;
    }>;
}
export declare function getConfig(): N8nConfig;
