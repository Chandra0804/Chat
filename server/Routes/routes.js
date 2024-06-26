const { Router } = require("express");
const userController = require("../controllers/userController");
const jwt = require('jsonwebtoken');
const axios = require('axios');


const router = Router();

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send("Token is required!");

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) return res.status(401).send("Invalid token!");

        req.userId = decoded.userId;
        next();
    });
}

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get('/dashboard', verifyToken, (req, res) => {
    res.status(200).send("Welcome to dashboard");
});
router.get("/allUsers", userController.allUsers);
router.get("/exploreFriends", verifyToken, userController.exploreFriends);
router.post("/sendFriendRequest", verifyToken, userController.sendFriendRequest);
router.get("/requests", verifyToken, userController.getFriendRequests);
router.post("/acceptRequest", verifyToken, userController.acceptFriendRequest);
router.get("/friends", verifyToken, userController.getMyFriends);
router.post('/send-message',verifyToken, userController.sendMessage);
router.get('/messages/:recipientId',verifyToken, userController.getMessages);

router.post('/chat', async (req, res) => {
    try {
        const response = await axios.post('http://127.0.0.1:5001/chat', { message: req.body.message });
        res.send({ reply: response.data.reply });
    } catch (error) {
        console.error('Error communicating with the Python server:', error);
        res.status(500).send('Error communicating with the chatbot service.');
    }
});

module.exports = router;