import Configuration from './config';
import { RegionUri, resolveRegion } from './region';
import axios from 'axios';

import RetarusResponse from "./response";



class Transporter {
    serviceUriRegions: RegionUri[];

    constructor(uri: RegionUri[]) {
        this.serviceUriRegions = uri;
    }

    public async post(path: string, payload: Object, queryParms: Object): Promise<RetarusResponse> {
        // validate if the library is properly configured        
        let validation = this.validateConfig();
        if (validation.error) {
            return validation;
        }

        let response = new RetarusResponse();

        // check if region is available for this service
        let region = resolveRegion(Configuration.getInstance().region!, this.serviceUriRegions)

        if (region.error) {
            return region
        }
        let url = region.data.haUri + "/rest/v1" + path;
        let config: any = {
            method: "post",
            url: url,
            data: payload,
            headers: Configuration.getInstance().auth,
            params: queryParms
            };
        config["Content-Type"] = "application/json";
        await axios(config).then((result) => {
            if (result.status === 200 || result.status === 201) {
                response.error = false;
                response.data = result.data;
                return response;
            }
        }).catch((error) => {
            response.error = true;
            response.message = error.message;
        })
        return response;
    }


    public async get(path: string, queryParms: any) : Promise<RetarusResponse> {
        // validate if the library is properly configured        
        let validation = this.validateConfig();
        if (validation.error) {
            return validation;
        }

        // check if region is available for this service
        let region = resolveRegion(Configuration.getInstance().region!, this.serviceUriRegions)

        if (region.error) {
            return region
        }
        let config = {
        method: "get",
        url: "",
        headers: Configuration.getInstance().auth,
        params: queryParms
        };

        let res = await fetchDatacenter(region.data.urls, path, config)
        return res;
    }
    public async delete(path: string) : Promise<RetarusResponse> {
        // validate if the library is properly configured        
        let validation = this.validateConfig();
        if (validation.error) {
            return validation;
        }

        // check if region is available for this service
        let region = resolveRegion(Configuration.getInstance().region!, this.serviceUriRegions)

        if (region.error) {
            return region
        }
        
        let config = {
        method: "delete",
        url: "",
        headers: Configuration.getInstance().auth,
        };
        let res = await fetchDatacenter(region.data.urls, path, config)
        return res;
    }

    private validateConfig(): RetarusResponse {
        if (Configuration.getInstance().auth === undefined) {
            return new RetarusResponse(true, "You need to set the credentails using the set_auth() function in the Confugration class");
        }
        if (Configuration.getInstance().region === undefined) {
            return new RetarusResponse(true, "You need to set the region using the set_region() function in the Confugration class");
        }
        return new RetarusResponse(false);
    }
    // todo implement response matcher, to correctly handle issues or problems which can occur.
}

async function fetchDatacenter(urls: string[], path: string, config: any) : Promise<RetarusResponse> {
    let response = new RetarusResponse();

    for (var i = 0; i < urls.length; i++) {
        let url = urls[i] + "/rest/v1" + path;

        config.url = url;
        await axios(config).then((result) => {
            if (result.status === 200) {
                response.error = false;
                response.data = result.data;                
            }
            if (result.status === 404) {
                response.error = false;
                response.message = "404"
            }
        }).catch((error) => { 
            if (error.status === 404) {
                response.error = false;
                response.message = "404"
            }
            response.error = true;
            response.message = error.data; })
        if (response.message === "404" && urls.length != i + 1) {
            continue
        }
        if (response.message == "404") {
            return response;
        }
        if (!response.error){
            break
        }
    }
    if (!response.error) {
        return response;
    }
    response.message = "Ressource not found | 404"
    return response;
}

export default Transporter;