const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const User = require('../../model/user')
const empty = require('is-empty')

const checkUserExistsByEmail = async (email) => {
    try {
        return await User.findOne({ email })
    } catch (error) {
        return error
    }
}

const registerUser = async (req, res) => {
    let { name, email, password } = req.body;
    email = email.toLowerCase();
    let checkUser = await checkUserExistsByEmail(email)
    if (checkUser) {
        return res.status(404).json({
            status: false,
            statusCode: 404,
            message: "User with this email address already exists",
        })
    }
    password = bcrypt.hashSync(password, 8)
    const user = new User({ name, email, password })
    const newUser = await user.save()
    if (newUser) {
        let returnOp = {
            status: true,
            statusCode: 200,
            message: "User has been signin successfully."
        };
        return res.status(200).json(returnOp);
    } else {
        return res.status(404).json({
            status: false,
            statusCode: 500,
            message: "Something went wrong. Please try again",
        })
    }
    // error case  when newUser not created
}

const loginUser = async (req, res) => {
    let { email, password } = req.body
    let checkUser = await checkUserExistsByEmail(email)
    email = email.toLowerCase();
    if (empty(checkUser)) {
        return res.status(404).send({
            status: false,
            statusCode: 404,
            message: 'user not found.'
        })
    }
    if (!await bcrypt.compare(password, checkUser.password)) {
        return res.status(400).send({
            status: false,
            statusCode: 400,
            message: 'password wrong please try again later.'
        })
    }
    jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: checkUser.password
    }, '1daysofcoding', (err, token) => {
        if (err) {
            return res.status(400).send({
                status: false,
                statusCode: 400,
                message: 'Something went wrong please try again later.'
            })
        }
        let userDetails = checkUser
        userDetails['password'] = ''
        console.log(userDetails, token)
        return res.status(201).json({
            status: false,
            statusCode: 201,
            message: 'User login successfully',
            data: { userDetails, token },
        })
    })

}

const forgotPassword = async (req, res) => {
    let { email } = req.body;
    email = email.toLowerCase();
    // send link to email and expires after 24 hrs and once user will update link must be expires
}

const resetPassword = async (req, res) => {
    let { email } = req.body;
    email = email.toLowerCase();
    if (empty(checkUser)) {
        return res.status(404).send('user not found.')
    }
}


const googleLogin = async (req, res) => {
    const { token } = req.body

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        const { name, email, picture } = ticket.getPayload();

    } catch (error) {

    }
}
module.exports = {
    registerUser,
    loginUser,
    resetPassword,
    forgotPassword
}