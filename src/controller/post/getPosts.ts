import { Request, Response } from 'express';
import { PostModel, Post } from '../../model/post';
import connectDB from '../../utils/database';
import { sort } from '../../utils/sortPosts'
import dotenv from 'dotenv';

dotenv.config();

/**
 * フォローしているユーザの投稿を取得する
 * @param req emailとpasswordがbodyに格納される
 * @param res メッセージとユーザ情報を返す
 * @returns 
 */
export default async function (req: Request, res: Response) {
    try {
        await connectDB();
        const posts: Post[] | null = await PostModel.find({ email: req.query.email });
        if (posts) {
            const sorted = sort(posts)
            return res.status(200).json({ posts: sorted });
        } else {
            return res.status(200).json({ posts: [] });
        }

    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: '投稿取得に失敗しました' });
    }
}
