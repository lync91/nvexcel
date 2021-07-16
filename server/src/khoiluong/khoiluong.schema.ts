import * as mongoose from 'mongoose';
const Schema = mongoose.Schema

export const mauKhoiLuongSchema = new Schema({
  loaiCongTrinh: String,
  tenBoPhan: String,
  data: String
});