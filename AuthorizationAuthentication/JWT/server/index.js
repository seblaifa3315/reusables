const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json()); //This is to be able to send something in the body

// dummy database instead of creating a database
const users = [
    {
        id: "1",
        username: "john",
        password: "John0908",
        isAdmin: true,
    },
    {
        id: "2",
        username: "jane",
        password: "Jane0908",
        isAdmin: false,
    },
];




let refreshTokens = [];




app.post("/api/refresh", (req, res) => {
    //take the refresh token from the user
    const refreshToken = req.body.token;

    //send error ifthere is no token or it's invalid
    if (!refreshToken) return res.status(401).json("You are not authenticated!!!");
    if(!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid!!!");
    }
    jwt.verify(refreshToken, "myRefreshSecretKey", (error, user) => {
        error && console.log(err);
        refreshTokens = refreshTokens.filter(token => token !== refreshToken);

        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)

        refreshTokens.push(newRefreshToken);

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    });

    //if everything is ok, create new access token, refresh token and send to user
});




//Create functions to generate AccessToken and refreshToken
const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", { expiresIn: "30m" });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};




//login
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const theUser = users.find((user) => {
        return user.username === username && user.password === password;
    });
    if (theUser) {
        //Generate an access token
        const accessToken = generateAccessToken(theUser);
        const refreshToken = generateRefreshToken(theUser);
        refreshTokens.push(refreshToken);
        res.json({
            username: theUser.username,
            isAdmin: theUser.isAdmin,
            accessToken,
            refreshToken,
        });
    } else {
        res.status(400).json("Username or password incorrect!");
    }
});


// Create a verify middleware
const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, "mySecretKey", (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid!!!");
            }
            req.user = user;

            next();
        });
    } else {
        res.status(401).json("You are not authenticated!!!");
    }
};





//delete user
app.delete("/api/users/:userId", verify, (req, res) => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
        res.status(200).json("User has been deleted.");
    } else {
        res.status(403).json("You are not allowed to delete this user!!!");
    }
});


//logout
app.post("/api/logout", verify, (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
    res.status(200).json("You logged out successfully!!!");
})

app.listen(3001, () => {
    console.log("Backend server is running");
});
