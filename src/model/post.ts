import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * ユーザ情報のモデル
 */
export interface Post extends Document {
    id: string;
    date: string;
    content: string;
    email: string;
}



const PostSchema: Schema<Post> = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: String,
        required: true,

    },
    content: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },


}, {
    collection: 'post' // コレクション名を指定
});




export const PostModel: Model<Post> = mongoose.model<Post>('post', PostSchema);
