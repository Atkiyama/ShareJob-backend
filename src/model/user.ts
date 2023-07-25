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
        required: false,
    },

    birthday: {
        type: String,
        required: false,
    },

    password: {
        type: String,
        required: true,
    },
    follow: {
        type: [String],
        required: false,
    },

    follower: {
        type: [String],
        required: false,
    },

    favorite: {
        type: [String],
        required: false,
    },


}, {
    collection: 'user' // コレクション名を指定
});




export const UserModel: Model<User> = mongoose.model<User>('user', UserSchema);
