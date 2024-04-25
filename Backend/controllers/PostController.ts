import { Post, User } from "../../packages/db/src/models";
import { Request, Response } from "express";
import mongoose from "mongoose";
// ---------------------------- CREATE POST -------------------------------------------------

export const createPost = async (req: Request, res: Response) => {
  const UserId = req.headers["UserId"];
  const data = req.body;
  const { Tweet, TweetImage } = data;

  const createdPost = await Post.create({
    owner: UserId,
    Tweet,
    $push: { TweetImage: TweetImage },
  });
  if (!createdPost) {
    res
      .status(403)
      .json({ success: "false", message: "post could not be created" });
    return;
  }
  res.status(200).json({
    success: "true",
    message: "post created successfully ",
    createdPost,
  });
};

// ------------------------ ALL POSTS -------------------------------------------------------

export const getallposts = async (req: Request, res: Response) => {
  const posts = await Post.find();
  if (!posts) {
    res.status(403).json({ success: "false", message: "no posts to be found" });
    return;
  }
  res
    .status(200)
    .json({ success: "true", message: "Post Found Successfully", posts });
};

// -------------------- USER POSTS-------------------------------------------------

export const UserPosts = async (req: Request, res: Response) => {
  const UserId = req.headers["UserId"];
  const Userposts = await Post.find({ owner: UserId });

  if (!Userposts) {
    res.status(403).json({
      success: "false",
      message: " There are no posts associated with the user",
    });
    return;
  }

  res
    .status(200)
    .json({ success: "true", message: "Post Found Successfully", Userposts });
};

// ------------------------EDIT POST----------------------------------------------------------

export const editPost = async (req: Request, res: Response) => {
  const UserId = req.headers["UserId"];
  const { PostId } = req.params;
  const data = req.body;
  const { Tweet, TweetImage } = data;

  const EditPost = await Post.findByIdAndUpdate(
    { _id: PostId, owner: UserId },
    { Tweet, TweetImage },
    { new: true }
  );
  if (!EditPost) {
    res.status(403).json({
      success: "false",
      message: "Post Couldn't Be Edited",
    });
    return;
  }

  res
    .status(200)
    .json({ success: "true", message: "Post Edited Successfully", EditPost });
};

// -------------------------------------DELETE POST------------------------------------------

export const deletePost = async (req: Request, res: Response) => {
  const UserId = req.headers["UserId"];
  const { PostId } = req.params;

  const DeletedPost = await Post.findByIdAndDelete({
    _id: PostId,
    owner: UserId,
  });

  if (!DeletedPost) {
    res.status(403).json({
      success: "false",
      message: "Post Couldn't be deleted",
    });
    return;
  }
  res
    .status(200)
    .json({ success: "true", message: "Post Deleted Successfully" });
};

// --------------------------------- LIKE POST ----------------------------------------------

export const likePost = async (req: Request, res: Response) => {
  const { PostId } = req.params;
  const UserId = req.headers["UserId"] as string;

  try {
    // Unlike post logic
    let likedpost = await Post.findById({ _id: PostId });

    if (!likedpost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const likes = likedpost.Likes;
    const userId = new mongoose.Types.ObjectId(UserId);
    if (likes.includes(userId)) {
      likedpost = await Post.findByIdAndUpdate(
        { _id: PostId },
        { $pull: { Likes: UserId } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Post unliked successfully",
        likedpost,
      });
    }

    // Like post logic
    likedpost = await Post.findByIdAndUpdate(
      { _id: PostId },
      { $push: { Likes: UserId } },
      { new: true }
    );

    if (!likedpost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post liked successfully",
      likedpost,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurred",
    });
  }
};

// ---------------------------------- COMMENTS----------------------------------------------

// MongoDB automatically generates _id fields for each subdocument in
// an array when you don't explicitly disable this behavior. This is a
// default behavior of MongoDB to ensure each document and subdocument has a unique identifier.

export const commentPost = async (req: Request, res: Response) => {
  const { PostId } = req.params;
  const UserId = req.headers["UserId"];
  const commentText = req.body.Comments[0].comment;
  const commentonPost = await Post.findByIdAndUpdate(
    { _id: PostId },
    { $push: { Comments: { User: UserId, comment: commentText } } },
    { new: true }
  );
  if (!commentonPost) {
    res
      .status(403)
      .json({ success: "false", message: 'Post Couldn"t be found' });
    return;
  }
  res.status(200).json({
    success: "true",
    message: "commented successfully",
    commentonPost,
  });
};

// -------------------------------  FOLLOWING POST -----------------------------------------
// SYNTAX TO USE $IN
// db.collection.find({
//   field: { $in: [value1, value2, ...] }
// })

export const followingPost = async (req: Request, res: Response) => {
  const UserId = req.headers["UserId"];
  const currentuser = await User.findOne({ _id: UserId });
  if (!currentuser) {
    res.status(403).json({ success: false, message: "No User Found" });
    return;
  }
  const followingData = currentuser.Following;
  const followingId = followingData.map((user) => user._id);
  const followingPosts = await Post.find({ owner: { $in: followingId } });
  if (!followingPosts) {
    res
      .status(403)
      .json({ success: false, message: "Following have no Posts" });
    return;
  }

  res.status(200).json({ success: "true", followingPosts });
};

// ------------------------------ SPECIFIC USER POSTS --------------------------------------

export const specificUserPosts = async (req: Request, res: Response) => {
  const { UserpostId } = req.params;
  const specificUserPost = await Post.find({ owner: UserpostId });
  if (!specificUserPost) {
    res.status(403).json({ success: false, message: "No Post To Be Found" });
    return;
  }
  res.status(200).json({ success: true, specificUserPost });
};

//------------------------------ BOOKMARKS --------------------------------------------------

export const bookmarks = async (req: Request, res: Response) => {
  const { PostId } = req.params;
  const UserId = req.headers["UserId"] as string;

  const PostbyId = await Post.findById({ _id: PostId });
  if (!PostbyId) {
    res.status(403).json({ success: false, message: "No Post To Be Found" });
    return;
  }
  let usertobookmark = await User.findById({ _id: UserId });
  if (!usertobookmark) {
    return res
      .status(403)
      .json({ success: "false", message: "User cannot bookmark this post" });
  }

  const book = usertobookmark.Bookmarks;
  const postId = new mongoose.Types.ObjectId(PostId);
  if (book.includes(postId)) {
    usertobookmark = await User.findByIdAndUpdate(
      { _id: UserId },
      { $pull: { Bookmarks: PostId } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Post removed from bookmarks successfully",
      usertobookmark,
    });
    return;
  }

  usertobookmark = await User.findByIdAndUpdate(
    { _id: UserId },
    { $push: { Bookmarks: PostId } },
    { new: true }
  );
  res.status(200).json({
    success: true,
    message: "Post Bookmarked Successfully",
    usertobookmark,
  });
};

// -------------------------------------------------------------------------------------------
