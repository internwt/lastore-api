const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const User = require('../../model/user')
const empty = require('is-empty')

const checkUserExistsByEmail = async (email) => {
    return await User.findOne({ email })
}

const registerUser = async (req, res) => {
    let { name, email, password } = req.body;
    email = email.toLowerCase();
    let checkUser = await checkUserExistsByEmail(email)
    if (checkUser) {
        return res.status(404).send(`user already created exists with this ${email} address`)
    }
    password = bcrypt.hashSync(password, 8)
    const user = new User({ name, email, password })
    const newUser = await user.save()
    if (newUser) {
        return res.status(200).send({
            message: 'user created successfully',
            isError: false
        })
    }
    // error case  when newUser not created
}

const loginUser = async (req, res) => {
    let { email, password } = req.body
    let checkUser = await checkUserExistsByEmail(email)
    email = email.toLowerCase();
    if (empty(checkUser)) {
        return res.status(404).send('user not found.')
    }
    if (!await bcrypt.compare(password, checkUser.password)) {
        return res.status(400).send('password wrong please try again later.')
    }
    jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: checkUser.password
    }, '1daysofcoding', (err, token) => {
        console.log(`checkUsercheckUser`, process.env.ACCESS_TOKEN_SECRET, err)
        if (err) {
            return res.status(400).send('something went wrong')
        }
        return res.status(201).send({ token, user: checkUser })
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