import { CreateScheduleDto } from 'src/dtos/create-schedule.dto';
import { ScheduleService } from './schedule.service';
export declare class ScheduleController {
    private readonly scheduleService;
    constructor(scheduleService: ScheduleService);
    getAll(): {
        ok: string;
    };
    createOne(dto: CreateScheduleDto): {
        ok: string;
    };
}
