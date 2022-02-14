import { CreateScheduleDto } from 'src/dtos/create-schedule.dto';
export declare class ScheduleService {
    getAll(): {
        ok: string;
    };
    createOne(dto: CreateScheduleDto): {
        ok: string;
    };
}
