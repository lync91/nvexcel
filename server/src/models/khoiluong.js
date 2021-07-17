import mongoose, { Schema } from 'mongoose';
// import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const MauKhoiLuongSchema = new Schema(
    {
        tenBoPhan: String,
        loaiCongTrinh: String,
        data: String
    },
    {
        collection: 'maukhoiluongs',
    }
);

// UserSchema.plugin(timestamps);

// UserSchema.index({ createdAt: 1, updatedAt: 1 });

export const MauKhoiLuong = mongoose.model('MauKhoiLuong', MauKhoiLuongSchema);
export const MauKhoiLuongTC = composeWithMongoose(MauKhoiLuong);