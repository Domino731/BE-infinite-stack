import {Body, Controller, Get, Param, Post, Res} from "@nestjs/common";
import {ProjectService} from "./project.service";

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {
    }

    // creating new user in mongoDB
    @Post('/create')
    async createNew(@Res() res, @Body() body) {
        const req = await this.projectService.createProject({id: 123, name: 'TEST#1'});
        console.log('createNew', req);
        res.status(201).send({message: "SUCCESS"});
    }

    @Get('/:id')
    async getProject(@Param('id') id: string, @Res() res,) {
        const req = await this.projectService.findProjectById(id);
        res.status(200).send({data: req});
    }
}