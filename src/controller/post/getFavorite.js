"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = require("../../model/post");
const database_1 = __importDefault(require("../../utils/database"));
const sortPosts_1 = require("../../utils/sortPosts");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../../model/user");
dotenv_1.default.config();
/**
 * お気に入り投稿のリストを返す
 * @param req emailとpasswordがbodyに格納される
 * @param res メッセージとユーザ情報を返す
 * @returns
 */
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.default)();
            const posts = []; // `posts` 配列の初期化
            const user = yield user_1.UserModel.findOne({ email: req.query.email });
            if (user) {
                const ids = user.favorite;
                if (ids) {
                    for (let i = 0; i < ids.length; i++) {
                        const post = yield post_1.PostModel.findOne({ id: ids[i] }); // 変数 `post` の型を `Post | null` に設定
                        if (post) {
                            posts.push(post); // `post` が存在する場合のみ `push` を行う
                        }
                    }
                    const sorted = (0, sortPosts_1.sort)(posts);
                    return res.status(200).json({ posts: sorted });
                }
                else {
                    // `ids` が `null` の場合の処理
                    return res.status(200).json({ posts: [] });
                }
            }
            else {
                // `user` が `null` の場合の処理
                return res.status(400).json({ message: 'ユーザが見つかりません' });
            }
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: '投稿取得に失敗しました' });
        }
    });
}
exports.default = default_1;
