//User controller
const { get } = require("mongoose");
const userModel = require("../models/userModel");
const friendRequestModel = require("../models/friendRequestModel");
const Message = require('../models/messageModel');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    console.log(req.body);
    try {
        const {username, email, password } = req.body;
        const user = new userModel({username, email, password });
        
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password }).exec();
        if (user) {
            const token = jwt.sign({ userId: user._id }, 'your_secret_key');
            res.json({ token });
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (error) {
        res.status(500).send("Error logging in");
    }
}

const allUsers = async (req, res) => {
    try {
        const users = await userModel.find().exec();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send("Error fetching users");
    }
}

const exploreFriends = async (req, res) => {
    try{
        const user = await userModel.findOne({ _id: req.userId }).exec();
        const friends = user.friends;
        const users = await userModel.find({ _id: { $nin: friends } }).exec();
        users.splice(users.findIndex((u) => u._id == req.userId), 1);
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send("Error fetching users");
    }
}

const sendFriendRequest = async (req, res) => {
    try {
        const { to } = req.body;
        const request = new friendRequestModel({ from: req.userId, to });
        await request.save();
        const user = await userModel.findOne({ _id: to }).exec();
        user.friendRequests.push(request._id);
        await user.save();
        res.status(200).send(request);
    } catch (error) {
        res.status(500).send(error);
    }
}

const acceptFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.body;
        const request = await friendRequestModel.findOne    
        ({ _id: requestId }).exec();
        const user = await userModel.findOne({ _id: req.userId }).exec();
        user.friends.push(request.from);
        await user.save();
        const fromUser = await userModel.findOne({ _id: request.from }).exec();
        fromUser.friends.push(req.userId);
        await fromUser.save(); 
        await friendRequestModel.deleteOne({ _id: requestId }).exec();
        res.status(200).send("Friend request accepted");
    }
    catch (error) {
        res.status(500).send("Error accepting friend request");
        console.log(error)
    }
}

const getFriendRequests = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.userId }).exec();
        const requests = await friendRequestModel.find({ to: req.userId }).exec();
        const friendRequests = [];
        for (let request of requests) {
            const fromUser = await userModel.findOne({ _id: request.from }).exec();
            friendRequests.push({ _id: request._id, from: fromUser});
        }
        res.status(200).send(friendRequests);
    } catch (error) {
        res.status(500).send("Error fetching friend requests");
    }
}

const getMyFriends = async (req, res) => {
    try{
        const user = await userModel.findOne({ _id: req.userId }).exec();
        const friends = user.friends;
        const users = await userModel.find({ _id: { $in: friends } }).exec();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send("Error fetching users");
    }
}

const sendMessage = async (req, res) => {
    try {
        const { recipientId, message } = req.body;
        const recipient = await getRecipient(recipientId);
        const sender = await userModel.findOne({ _id: req.userId }).exec();   
        const timestamp = new Date();
        const newMessage = new Message({
            sender: sender._id,
            recipient: recipient._id,
            message,
            timestamp
        });

        await newMessage.save();
        res.status(200).send(newMessage);
    } catch (error) {
        res.status(500).send('Error sending message');
        console.log(error)
    }
};

const getRecipient = async (recipientId) => {
    try{
        const recipient = await userModel.findOne({ _id: recipientId }).exec();
        return recipient;
    }
    catch (error) {
        console.log(error);
    }
}

const getMessages = async (req, res) => {
    try {
        const { recipientId } = req.params;
        const messages = await Message.find({
            $or: [
                { sender: req.userId, recipient: recipientId },
                { sender: recipientId, recipient: req.userId }
            ]
        }).exec();
        const recipient = await getRecipient(recipientId);
        res.status(200).send({ messages, recipient });
    } catch (error) {
        res.status(500).send('Error fetching messages');
        console.log(error)
    }
};

module.exports = { register, login, allUsers, exploreFriends, sendFriendRequest, acceptFriendRequest, getFriendRequests , getMyFriends,sendMessage, getMessages};