import { IsString, IsDateString, IsInt } from 'class-validator';

export class CreateScheduleDto{
    @IsDateString()
    readonly startDate: string;
    @IsDateString()
    readonly endDate: string;
    @IsString()
    readonly reason: string;
    @IsInt()
    readonly approved: number = 0;
}