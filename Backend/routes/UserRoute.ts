import express from "express";
const router = express.Router();
import { authencticate } from "../middlewares";
import {
  SignupLogic,
  LoginLogic,
  allUsers,
  follow,
  getspecificUserdata,
  Unfollow,
  deleteUser,
  bookmarkedPosts,
} from "../controllers/UserController";

router.route("/signup").post(SignupLogic);
router.route("/login").post(LoginLogic);
router.route("/alluser").get(allUsers);
router.route("/follow/:FollowingUserId").patch(authencticate, follow);
router.route("/getotheruserdata/:otherUserId").get(authencticate,getspecificUserdata);
router.route("/unfollow/:unfollowUserId").patch(authencticate, Unfollow);
router.route("/deleteUser").delete(authencticate, deleteUser);
router.route("/bookmarkedPosts").get(authencticate, bookmarkedPosts);
export default router;
