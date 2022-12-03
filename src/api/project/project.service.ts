import {Injectable} from "@nestjs/common";

@Injectable()
export class ProjectService {
    constructor() {
    }

    /** create new user in users collection
     * @Param data - object with new user data
     * */
    async createProject() {
        return true
    }
}
