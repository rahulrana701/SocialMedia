"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Phonenumber: {
        type: Number,
        required: true,
        unique: true,
    },
    Country: {
        type: String,
        required: true,
    },
    ProfilePicture: {
        type: String,
        required: true,
    },
    Followers: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    Following: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    Posts: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    Bookmarks: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});
const PostSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    Tweet: {
        type: String,
    },
    TweetImage: [
        {
            type: String,
        },
    ],
    Likes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    Comments: [
        {
            User: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "User",
            },
            comment: {
                type: String,
            },
        },
    ],
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});
exports.User = mongoose_1.default.model("UserSocialMediaData", UserSchema);
exports.Post = mongoose_1.default.model("PostSocialMediaData", PostSchema);
