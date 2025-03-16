import {UserRepository} from "~/Repository/UserRepository";

export class Repository {
    public readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }
}
