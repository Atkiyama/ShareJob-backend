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
const crypto_1 = require("crypto");
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
            const user = yield user_1.UserModel.findOne({ email: req.body.email });
            if (user) {
                let id = (0, crypto_1.randomUUID)();
                let existTest = yield post_1.PostModel.findOne({
                    id: id
                });
                //重複がなくなるまで続ける
                while (existTest) {
                    id = (0, crypto_1.randomUUID)();
                    existTest = yield post_1.PostModel.findOne({
                        id: id
                    });
                }
                const post = new post_1.PostModel({
                    id: id,
                    date: getCurrentTimestamp(),
                    content: req.body.content,
                    email: user.email
                });
                yield post.save();
                const test = yield post_1.PostModel.findOne({ content: req.body.content });
                return res.status(200).json({ id: id, content: req.body.content, post: test });
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
function getCurrentTimestamp() {
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
