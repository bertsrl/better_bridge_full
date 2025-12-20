export class GoogleOAuthStore {
    private static instance: GoogleOAuthStore;
    private access_token: string = '';
    private refresh_token: string = '';

    private constructor() {
        this.access_token = '';
        this.refresh_token = '';
    }

    public static getInstance(): GoogleOAuthStore {
        if (!GoogleOAuthStore.instance) {
            GoogleOAuthStore.instance = new GoogleOAuthStore();
        }
        return GoogleOAuthStore.instance;
    }

    public setAccessToken(access_token: string) {
        this.access_token = access_token;
    }

    public setRefreshToken(refresh_token: string) {
        this.refresh_token = refresh_token;
    }

    public getAccessToken(): string {
        return this.access_token;
    }

    public getRefreshToken(): string {
        return this.refresh_token;
    }
}