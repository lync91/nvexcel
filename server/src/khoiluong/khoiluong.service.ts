import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { mauKhoiLuong } from './interfaces/khoiluong.interface';

@Injectable()
export class KhoiLuongService {
  constructor(@InjectModel('mauKhoiLuong') private readonly catModel: Model<mauKhoiLuong>) {}

  async findAll(): Promise<mauKhoiLuong[]> {
    return await this.catModel.find().exec();
  }
}
