import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateScheduleDto } from 'src/dtos/create-schedule.dto';
import { EditScheduleDto } from 'src/dtos/edit-schedule.dto';
import { ScheduleService } from './schedule.service';


@Controller('schedule')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService){}

    @Get()
    async getAll(){
        const data = await this.scheduleService.getAll();
        return {
            message: 'successful',
            data
        }
    }

    @Post('createOne')
    async createOne(@Body() dto: CreateScheduleDto){
        const data = await this.scheduleService.createOne(dto);
        return { message: 'succesful', data}
    }
    
    @Put(':id')
    async editOne(
        @Param('id') id: number,
        @Body() dto: EditScheduleDto
    ){
        const data = await this.scheduleService.editOne(id, dto);
        return {message: 'succesful', data}
    }
}
