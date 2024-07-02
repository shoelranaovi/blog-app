import express from "express";
import getalluser from "../controller/getalluser.js";

import signUp from "../controller/singnUp.js";
import signin from "../controller/signin.js";
import { google } from "../controller/Oauth.js";
import { updateuser } from "../controller/updateuser.js";
import { verifyToken } from "../middleware/verifyuser.js";
import { deleteUser } from "../controller/deleteuser.js";
import { signout } from "../controller/signout.js";
import { createpost } from "../controller/createpost.js";
import { getposts } from "../controller/getpost.js";
import { deletepost } from "../controller/deletepost.js";
import { updatepost } from "../controller/updatePost.js";

const router = express.Router();

router.get("/user", getalluser);
router.post("/signUp", signUp);
router.post("/signin", signin);
router.post("/google", google);
router.put("/update/:userId", verifyToken, updateuser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
router.post("/createpost", verifyToken, createpost);
router.get("/getposts", getposts);
router.delete("/deletePost/:postId/:userId", verifyToken, deletepost);
router.delete("/deletePost/:postId/:userId", verifyToken, deletepost);
router.put("/updatepost/:postId/:userId", verifyToken, updatepost);

export default router;
