import {Body, Controller, Post, Res} from "@nestjs/common";
import {ProjectService} from "./project.service";

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {
    }

    // creating new user in mongoDB
    @Post('/create')
    async createNew(@Res() res, @Body() body) {
        res.status(201).send({message: "SUCCESS"});
    }
}