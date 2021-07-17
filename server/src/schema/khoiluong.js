import { MauKhoiLuong, MauKhoiLuongTC } from "../models/khoiluong";
import { schemaComposer } from "graphql-compose";

const LoaiCongTrinhTC = schemaComposer.createObjectTC({
  name: "LoaiCongTrinh",
  fields: {
    value: "String",
    _id: "String",
    name: "String",
  },
});

const getLoaiCongTrinh = schemaComposer.createResolver({
  name: "getLoaiCongTrinh",
  type: () => [LoaiCongTrinhTC],
  resolve: async ({ source, args, context, info }) => {
    const data = await MauKhoiLuong.aggregate()
      .group({ _id: "$loaiCongTrinh" })
      .project({ value: "$_id" });
    console.log(data);
    if (!data) return null;
    return data;
  },
});
const MauKhoiLuongQuery = {
  mauKhoiLuong: MauKhoiLuongTC.getResolver("findMany"),
  lstLoaicongtrinh: getLoaiCongTrinh,
  // userByIds: MauKhoiLuongTC.getResolver('findByIds'),
  // userOne: MauKhoiLuongTC.getResolver('findOne'),
  mauKhoiLuongfindMany: MauKhoiLuongTC.getResolver("findMany"),
  // userCount: MauKhoiLuongTC.getResolver('count'),
  // userConnection: MauKhoiLuongTC.getResolver('connection'),
  // userPagination: MauKhoiLuongTC.getResolver('pagination'),
};

const MauKhoiLiongMutation = {
  createMauKhoiLuong: MauKhoiLuongTC.getResolver("createOne"),
  // userCreateOne: MauKhoiLuongTC.getResolver('createOne'),
  // userCreateMany: MauKhoiLuongTC.getResolver('createMany'),
  // userUpdateById: MauKhoiLuongTC.getResolver('updateById'),
  // userUpdateOne: MauKhoiLuongTC.getResolver('updateOne'),
  // userUpdateMany: MauKhoiLuongTC.getResolver('updateMany'),
  // userRemoveById: MauKhoiLuongTC.getResolver('removeById'),
  // userRemoveOne: MauKhoiLuongTC.getResolver('removeOne'),
  // userRemoveMany: MauKhoiLuongTC.getResolver('removeMany'),
};

export { MauKhoiLuongQuery, MauKhoiLiongMutation };
