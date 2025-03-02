export class AppError {
    constructor(public message: string, public statuscode: number) {
        this.statuscode = statuscode;
        this.message = message
            ;
    }
}