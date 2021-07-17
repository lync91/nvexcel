import { SchemaComposer } from 'graphql-compose';

import db from '../utils/db'; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user';
import { TaskQuery, TaskMutation } from './task';
import { MauKhoiLuongQuery, MauKhoiLiongMutation } from './khoiluong';

schemaComposer.Query.addFields({
    ...UserQuery,
    ...TaskQuery,
    ...MauKhoiLuongQuery
});

schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...TaskMutation,
    ...MauKhoiLiongMutation
});

export default schemaComposer.buildSchema();