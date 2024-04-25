import mongoose from "mongoose";
export declare const User: mongoose.Model<{
    Username: string;
    Email: string;
    Password: string;
    Phonenumber: number;
    Country: string;
    ProfilePicture: string;
    Followers: mongoose.Types.ObjectId[];
    Following: mongoose.Types.ObjectId[];
    Posts: mongoose.Types.ObjectId[];
    Bookmarks: mongoose.Types.ObjectId[];
    CreatedAt: Date;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    Username: string;
    Email: string;
    Password: string;
    Phonenumber: number;
    Country: string;
    ProfilePicture: string;
    Followers: mongoose.Types.ObjectId[];
    Following: mongoose.Types.ObjectId[];
    Posts: mongoose.Types.ObjectId[];
    Bookmarks: mongoose.Types.ObjectId[];
    CreatedAt: Date;
}> & {
    Username: string;
    Email: string;
    Password: string;
    Phonenumber: number;
    Country: string;
    ProfilePicture: string;
    Followers: mongoose.Types.ObjectId[];
    Following: mongoose.Types.ObjectId[];
    Posts: mongoose.Types.ObjectId[];
    Bookmarks: mongoose.Types.ObjectId[];
    CreatedAt: Date;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    Username: string;
    Email: string;
    Password: string;
    Phonenumber: number;
    Country: string;
    ProfilePicture: string;
    Followers: mongoose.Types.ObjectId[];
    Following: mongoose.Types.ObjectId[];
    Posts: mongoose.Types.ObjectId[];
    Bookmarks: mongoose.Types.ObjectId[];
    CreatedAt: Date;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    Username: string;
    Email: string;
    Password: string;
    Phonenumber: number;
    Country: string;
    ProfilePicture: string;
    Followers: mongoose.Types.ObjectId[];
    Following: mongoose.Types.ObjectId[];
    Posts: mongoose.Types.ObjectId[];
    Bookmarks: mongoose.Types.ObjectId[];
    CreatedAt: Date;
}>> & mongoose.FlatRecord<{
    Username: string;
    Email: string;
    Password: string;
    Phonenumber: number;
    Country: string;
    ProfilePicture: string;
    Followers: mongoose.Types.ObjectId[];
    Following: mongoose.Types.ObjectId[];
    Posts: mongoose.Types.ObjectId[];
    Bookmarks: mongoose.Types.ObjectId[];
    CreatedAt: Date;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export declare const Post: mongoose.Model<{
    CreatedAt: Date;
    TweetImage: string[];
    Likes: mongoose.Types.ObjectId[];
    Comments: mongoose.Types.DocumentArray<{
        User?: mongoose.Types.ObjectId | null | undefined;
        comment?: string | null | undefined;
    }>;
    owner?: mongoose.Types.ObjectId | null | undefined;
    Tweet?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    CreatedAt: Date;
    TweetImage: string[];
    Likes: mongoose.Types.ObjectId[];
    Comments: mongoose.Types.DocumentArray<{
        User?: mongoose.Types.ObjectId | null | undefined;
        comment?: string | null | undefined;
    }>;
    owner?: mongoose.Types.ObjectId | null | undefined;
    Tweet?: string | null | undefined;
}> & {
    CreatedAt: Date;
    TweetImage: string[];
    Likes: mongoose.Types.ObjectId[];
    Comments: mongoose.Types.DocumentArray<{
        User?: mongoose.Types.ObjectId | null | undefined;
        comment?: string | null | undefined;
    }>;
    owner?: mongoose.Types.ObjectId | null | undefined;
    Tweet?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    CreatedAt: Date;
    TweetImage: string[];
    Likes: mongoose.Types.ObjectId[];
    Comments: mongoose.Types.DocumentArray<{
        User?: mongoose.Types.ObjectId | null | undefined;
        comment?: string | null | undefined;
    }>;
    owner?: mongoose.Types.ObjectId | null | undefined;
    Tweet?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    CreatedAt: Date;
    TweetImage: string[];
    Likes: mongoose.Types.ObjectId[];
    Comments: mongoose.Types.DocumentArray<{
        User?: mongoose.Types.ObjectId | null | undefined;
        comment?: string | null | undefined;
    }>;
    owner?: mongoose.Types.ObjectId | null | undefined;
    Tweet?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    CreatedAt: Date;
    TweetImage: string[];
    Likes: mongoose.Types.ObjectId[];
    Comments: mongoose.Types.DocumentArray<{
        User?: mongoose.Types.ObjectId | null | undefined;
        comment?: string | null | undefined;
    }>;
    owner?: mongoose.Types.ObjectId | null | undefined;
    Tweet?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=index.d.ts.map