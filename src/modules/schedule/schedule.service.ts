import { Injectable,  NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateScheduleDto } from 'src/dtos/create-schedule.dto';
import { EditScheduleDto} from 'src/dtos/edit-schedule.dto';
import { Repository } from 'typeorm';
import { Schedule } from '../entities/schedule.entity';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(Schedule)
        private readonly scheduleRepository: Repository<Schedule>) { }

    async getAll(): Promise<Schedule[]> {
        return await this.scheduleRepository.find()
    }

    async createOne(dto: CreateScheduleDto) {
        const data = this.scheduleRepository.create(dto)
        data.approved = 0;
        return await this.scheduleRepository.save(data)
    }

    async getById(id: number) {
        const post = await this.scheduleRepository.findOne(id);
        if (!post)
          throw new NotFoundException('Post does not exist or unauthorized');
        return post;
      }

    async editOne(id: number, dto: EditScheduleDto) {
        const schedule = await this.getById(id);
        const editedPost = Object.assign(schedule, dto);
        return await this.scheduleRepository.save(editedPost);
    }

}
