import { Request, Response } from 'express';
import { PostModel, Post } from '../../model/post';
import connectDB from '../../utils/database';
import { sort } from '../../utils/sortPosts';
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

        const posts: Post[] = []; // `posts` 配列の初期化
        const user: User | null = await UserModel.findOne({ email: req.query.email });
        if (user) {
            const ids: string[] | null = user.favorite;
            if (ids) {
                for (let i = 0; i < ids.length; i++) {
                    const post: Post | null = await PostModel.findOne({ id: ids[i] }); // 変数 `post` の型を `Post | null` に設定
                    if (post) {
                        posts.push(post); // `post` が存在する場合のみ `push` を行う
                    }
                }
                const sorted = sort(posts);
                return res.status(200).json({ posts: sorted });
            } else {
                // `ids` が `null` の場合の処理
                return res.status(200).json({ posts: [] });
            }
        } else {
            // `user` が `null` の場合の処理
            return res.status(400).json({ message: 'ユーザが見つかりません' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: '投稿取得に失敗しました' });
    }
}