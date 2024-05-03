export interface LoginResponse {
    status: number;
    data: {
        success: boolean;
        message: string;
    };
}