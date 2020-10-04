const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validinfo")

//registering

router.post("/register", validInfo, async(req, res) => {
    try {
        //step 1 - destructure the req.body (name, email, password)
        
        const { name, email, password } = req.body;

        //step 2 - check if user exists - if use exists throw error

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", 
            [email]
            );
        
        if(user.rows.length !== 0) {
            return res.status(401).send("user already exists")
        }

        //step 3 - bcrypt the user password

        const saltRound = 10;

        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);



        //step 4 - enter the new user inside our database

        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) returning *", 
            [name,email,bcryptPassword])


        



        //step 5 - generating our jwt token

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({token})


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

//login rout
router.post("/login", validInfo, async (req, res) => {
    try {
    //1. desctructure the req.body

    const {email, password} = req.body;


    //2. check if the user doesn't exist

    const user = await pool.query("SELECT * FROM USERS WHERE user_email = $1", [email])

    if(user.rows.length === 0) {
        return res.status(401).json("Email or Password is incorrect")
    }

    //3. check if incoming password is same as db password

    const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
    
    if(!validPassword) {
        return res.status(401).json("Email or Password is incorrect")
    }


    //4. give them a jwt token

    const token = jwtGenerator(user.rows[0].user_id);

    res.json({token})

    } catch (err) {
        console.error(err.message)
    }
})


module.exports = router;