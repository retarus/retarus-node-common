import { Region } from "./region";



class Configuration {
    static instance: Configuration
    
    region: Region | undefined;
    auth: any | undefined;
    customerNumber: string | undefined;

    private constructor(region: any = undefined, auth: any = undefined) {
        this.region = region;
        this.auth = auth;
    }

    public static getInstance() : Configuration {
        if (Configuration.instance === undefined)  {
            Configuration.instance = new Configuration();
        }
        return Configuration.instance;
    }

    public setRegion(region: Region): void {
        this.region = region;
    }
    public setAuth(username: string, password: string): void {
        let concatenating = username + ':' + password;
        let encodedToken = btoa(concatenating)

        this.auth = {"Authorization": "Basic " + encodedToken.toString(), "Content-Type": "application/json"}
    }
}

export default Configuration;