import { Document } from 'mongoose';

export interface Cat extends Document {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
export interface mauKhoiLuong extends Document {
  readonly loaiCongTrinh: String,
  readonly tenBoPhan: String,
  readonly data: String
}
export interface loaiCongTrinh extends Document {
  readonly value: String,
}
