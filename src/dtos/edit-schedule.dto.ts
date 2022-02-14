import { CreateScheduleDto } from "./create-schedule.dto";
import {PartialType} from '@nestjs/mapped-types';

export class EditScheduleDto extends PartialType(CreateScheduleDto) {}