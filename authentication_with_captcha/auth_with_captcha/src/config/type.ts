export type Configuration = {
    port: number;
    postgres: {
        host: string;
        port: number;
        username: string;
        password: string;
        name: string
    };
}