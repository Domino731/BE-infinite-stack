import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {ProjectEntity} from "./project.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ProjectInterface} from "./project.interface";

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity)
        private readonly projectPostRepository: Repository<ProjectEntity>) {

    }

    /** create new user in users collection
     * @Param data - object with new user data
     * */
    async createProject(project: ProjectInterface) {
        const req = await this.projectPostRepository.save(project);
        return req;
    }
}
