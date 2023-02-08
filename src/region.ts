import RetarusResponse from "./response";


export enum Region {
    Europe, 
    America,
    Switzerland,
    Singapore,
    Custom
}

export class RegionUri {
    region: Region;
    haUri: string;
    urls: string[]
    constructor(region: Region, haUri: string, urls: string[]) {
        this.region = region;
        this.haUri = haUri;
        this.urls = urls;
    }
}

export function resolveRegion(selectedRegion: Region, regionUris: [RegionUri]) : RetarusResponse {
    for (var i = 0; i < regionUris.length; i++) {
        if (regionUris[i].region === selectedRegion){
            return new RetarusResponse(false, "", regionUris[i]);
        }
    }
    return new RetarusResponse(true, "The current region is not available for that service");
}