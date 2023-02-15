
class RetarusResponse {
    error: boolean;
    message: string;
    data: any;
    
    constructor(error: boolean = false, message: string = "", data: any = undefined) {
        this.error = error;
        this.message = message;
        this.data = data;
    }
}

export default RetarusResponse;