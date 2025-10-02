const User = require("../models/user");

async function handleGetAllUsers(Req ,res){
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res){
    const user = await User.findById(req.params.id);
    if(! user) return res.status(404).json({error: "User not found"});
    return res.json(user);
}

async function handleUpdateUserById(req, res){
    await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    return res.json({message: "User updated successfully"});
}

async function handleDeleteUserById(req, res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({message: "User deleted successfully"});
}  

async function handleCreateUser(req, res) {
    const body = req.body; 
    const result = await User.create(body);
    return result.json({status: "success", id: res._id});
}


module.exports = {handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById,
handleCreateUser
};