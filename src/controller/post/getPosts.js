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
dotenv_1.default.config();
/**
 * フォローしているユーザの投稿を取得する
 * @param req emailとpasswordがbodyに格納される
 * @param res メッセージとユーザ情報を返す
 * @returns
 */
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.default)();
            const posts = yield post_1.PostModel.find({ email: req.query.email });
            if (posts) {
                const sorted = (0, sortPosts_1.sort)(posts);
                return res.status(200).json({ posts: sorted });
            }
            else {
                return res.status(200).json({ posts: [] });
            }
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({ message: '投稿取得に失敗しました' });
        }
    });
}
exports.default = default_1;
