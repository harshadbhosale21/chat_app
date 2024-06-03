import User from "../Model/userModel.js";


export const getUserForSideBar = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        // const allUsers = await User.find() - will show all users in side bar including the logged in one

        res.status(200).json(filteredUsers);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server error"
        })
    }
}