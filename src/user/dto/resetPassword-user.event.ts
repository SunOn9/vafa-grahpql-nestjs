export class ResetPasswordEvent {
    constructor(
        public readonly data : {
            email: string,
            token: string
        }
    ) {}
}