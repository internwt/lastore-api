const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const User = require('../../model/user')
const LetterSubscription = require('../../model/newslettersubscription')
const mailer = require('../../config/mailer')
const empty = require('is-empty')
var btoa = require("btoa");
var atob = require("atob");

const checkUserExistsByEmail = async (email) => {
    try {
        return await User.findOne({ email })
    } catch (error) {
        return error
    }
}
const getUserDetailsById = async (id) => {
    try {
        return await User.findOne({ _id: id })
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
    }, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
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
    const userDetails = await checkUserExistsByEmail(email)
    const { _id, name } = userDetails;
    const base64Encoded = btoa(_id)
    const link = `https://lastore.netlify.app/`
    const dbUrl = `${link}/reset/` + base64Encoded

    await res.render(
        "forgotpassword",
        {
            full_name: name,
            baseurl: link,
            link: dbUrl,
            frontend: link,
            login_link: `${link}/signin`
        },
        async (err, html) => {
            if (err) {
                console.log("errrrrr", err);
                //return res.status(500).json({ error: err });
            }
            let mailOptions = {
                from: "no-reply@staging-host.com", // sender address
                to: 'singhetoos65@gmail.com', // list of receivers
                subject: "Forgotten Password On Peakio", // Subject line
                html: html // html body
            };
            await mailer.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("errorrrr", error);
                } else {
                    console.log("infoffff", info);
                }
            });
            const expiryDate = new Date().toISOString()
            const updateUserDetails = await User.updateOne({ _id }, { "reset_active": true, "expiration_time": expiryDate })
            res.send({ isError: false, message: 'Check your email to reset your password', data: [] })
        }
    );
}

const resetPassword = async (req, res) => {
    let { user_id, password } = req.body;
    user_id = atob(user_id)
    const userDetails = await getUserDetailsById(user_id);
    if (empty(userDetails)) {
        return res.status(404).send({ message: 'user not found.', isError: true, data: {} })
    }
    const { _id, expiration_time, reset_active } = userDetails
    const fromDate = new Date(new Date().setHours(new Date().getHours() - 2));
    const comparetime = fromDate.getTime();
    var toDate = new Date(expiration_time);
    var link_expiration_time = toDate.getTime();
    if (link_expiration_time > comparetime) {
        if (reset_active) {
            password = bcrypt.hashSync(password, 8)
            const updateUserDetails = await User.updateOne({ _id }, { "reset_active": false, "password": password })
            return res.status(200).send({ message: 'password reset successfully', isError: false, data: [] })
        } else {
            return res.status(404).send({ message: "you already reset password", isError: true, data: [] });
        }
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


const newsLetterSubscription = async (req, res) => {
    let { email } = req.body;

    let token = await bcrypt.hash(`${email}${Date.now()}`, 8);
    const checkSubscribe = await LetterSubscription.find({ email })
    console.log(checkSubscribe)
    if (!empty(checkSubscribe)) {
        return res.status(404).send({
            isError: true,
            message: 'Email was already subscribed'
        })
    } else {

        const letter = new LetterSubscription({ email, token })
        const newLetter = await letter.save()

        return res.status(200).send({
            message: "You are now subscribed",
            isError: false,
            data: newLetter
        })
    }

}

module.exports = {
    registerUser,
    loginUser,
    resetPassword,
    forgotPassword,
    newsLetterSubscription
}