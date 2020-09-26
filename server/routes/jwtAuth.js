const router = require("express").Router()

//registering

router.post("/", async(req, res) => {
    try {
        //step 1 - destructure the req.body (name, email, password)
        

        //step 2 - check if user exists - if use exists throw error
        //step 3 - bcrypt the user password
        //step 4 - enter the new user inside our database
        //step 5 - generating our jwt token


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router;