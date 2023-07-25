import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * ユーザ情報のモデル
 */
export interface User extends Document {
    name: string;
    email: string;
    abstract: string;
    birthday: string;
    password: string;
    follow: string[];
    follower: string[];
    favorite: string[];

}



const UserSchema: Schema<User> = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    abstract: {
        type: String,
        required: true,
    },

    birthday: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    follow: {
        type: [String],
        required: true,
    },

    follower: {
        type: [String],
        required: true,
    },

    favorite: {
        type: [String],
        required: true,
    },


}, {
    collection: 'user' // コレクション名を指定
});




export const UserModel: Model<User> = mongoose.model<User>('user', UserSchema);
