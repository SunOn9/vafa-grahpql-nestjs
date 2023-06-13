export class CreateUserEvent {
    constructor(
        public readonly data : {
            email: string,
            token: string
        }
    ) {}
}