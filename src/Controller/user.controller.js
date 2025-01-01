import asyncHandler from "../utils/asyncHandler.js";

import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const generateAccess=async(user)=>
{
    // here we generate json-web token and add to the user
    try{
        const accesstoken=await user.generateAccessToken();
        console.log(accesstoken);
        user.accesstoken=accesstoken;
        await user.save({validateBeforeSave:false});
        return {accesstoken}
    }
    catch(error)
    {
        console.log("error occurs while generating refresh and access tokens",error)
        throw new ApiError(501,"something went wrong while generating jwt token");
    }
}

// for register user 
const registerUser = asyncHandler(async (req, res) => {
    // we take username, fullname, email,password
    const { username, fullname, email, password } = req.body;
    if ([username, fullname, email, password].some(field => field?.trim()==="")) {
        throw new ApiError(400, "All fields are required");
    }
    // if user exist then show that user already exists
    if (await User.findOne({ $or: [{ username }, { email }] })) {
        throw new ApiError(409, "Username or email already exists");
    }
   //  here we create the user
    const newUser = await User.create({
        fullname,
        email,
        password,
        username:username.toLowerCase(),
    });
    if (!newUser) {
        throw new ApiError(500, "Error creating user");
    }

    const createdUser = await User.findById(newUser._id).select("-password -refreshtoken");

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});
// for login user
const loginUser=asyncHandler(async(req,res)=>{
    const { username, email, password } = req.body;
   // console.log(username,password);
   
    if(!(username||email))
    {
         // if users did not enter username and email .
     throw new ApiError(400,"username and password is required");
    }
    // find user based on email or username
    const isUser=await User.findOne({$or:[{username},{email}]});
  
    if(!isUser)
    {
          // if user does not exist show this message
        throw new ApiError(400,"user does not exist");
    }
    // check password is correct or not is Password is return true or false value
    const isPasswordvalid=await isUser.isPasswordCorrect(password);
    
    if(!isPasswordvalid)
    {
        // if password is not correct then show this message
        throw new ApiError(401,"Password is not correct");
    }
    //generate json web token add to cookie and headers
    const {accesstoken}=await generateAccess(isUser);
    const loginUser=await User.findById(isUser._id).select("-password -accesstoken");
    const options={
        httpOnly:true,
        secure:true
    }
    return res.status(201).cookie("accesstoken",accesstoken,options).json(new ApiResponse(201,{loginUser,accesstoken}
        ,"User loggedin Successfully"));
})
// for logout 
const logoutUser = asyncHandler(async (req, res) => {
    const loggedUser = await User.findByIdAndUpdate(
        // to do logout set json web token null
        req.user._id,
        { $unset: {accesstoken: 1 } },
    );

    // Now you can perform any operation with the updated user data
    // For example, sending a response back to the client
    const option={
      httpOnly:true,
      secure:true
    }
    return res
    .status(200)
    .clearCookie("accesstoken", option)
    .json(new ApiResponse(200, {}, "User logged Out"))
});
const changeCurrentPassword=asyncHandler(async(req,res)=>{
      const {newPassword,confirmPassword,oldPassword}=req.body;
      if(newPassword!==confirmPassword)
      {
        // check newPasswork and confirmPassword is same or not
        return new ApiError(201,"newPassword and confirmPassword is not same");
      }
      // find the user by req.user._id which is which is store in json web token and add to do user with middleware
      const user=await User.findById(req.user._id);
      // validate password
      const verifypassword=await user.isPasswordCorrect(oldPassword);
      if(!verifypassword)
      {
        throw new ApiError(400,"invalid Password");
      }
      //change password
      user.password=newPassword;
      await user.save({validateBeforeSave:false});
      return res.status(200).json(new ApiResponse(200,"password change successfully")); 
})
export  
{
    registerUser,
    loginUser,
    logoutUser,
    changeCurrentPassword,
};