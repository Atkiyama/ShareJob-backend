import { Request, Response } from 'express';
import { PostModel, Post } from '../../model/post';
import connectDB from '../../utils/database';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';
import { UserModel, User } from '../../model/user';

dotenv.config();

/**
 * お気に入り投稿のリストを返す
 * @param req emailとpasswordがbodyに格納される
 * @param res メッセージとユーザ情報を返す
 * @returns
 */
export default async function (req: Request, res: Response) {
    try {
        await connectDB();


        const user: User | null = await UserModel.findOne({ email: req.body.email });

        if (user) {
            let id = randomUUID();
            let existTest: Post | null = await PostModel.findOne({
                id:
                    id
            });

            //重複がなくなるまで続ける
            while (existTest) {
                id = randomUUID();
                existTest = await PostModel.findOne({
                    id:
                        id
                });
            }
            const post: Post = new PostModel({
                id: id,
                date: getCurrentTimestamp(),
                content: req.body.content,
                email: user.email
            })
            await post.save()
            //挙動が若干怪しい?
            return res.status(200).json({ message: '投稿が完了しました' });
        } else {
            // `user` が `null` の場合の処理
            return res.status(400).json({ message: 'ユーザが見つかりません' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: '投稿取得に失敗しました' });
    }
}

function getCurrentTimestamp(): string {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

