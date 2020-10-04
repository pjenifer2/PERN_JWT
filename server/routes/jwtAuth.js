const router = require("express").Router();
const pool = require("../db");

//registering

router.post("/register", async(req, res) => {
    try {
        //step 1 - destructure the req.body (name, email, password)
        
        const { name, email, password } = req.body;

        //step 2 - check if user exists - if use exists throw error

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", 
            [email]
            );
        
        res.json(user.rows)

        //step 3 - bcrypt the user password



        //step 4 - enter the new user inside our database
        //step 5 - generating our jwt token


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router;