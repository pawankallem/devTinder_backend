 
 ### Express 
 - Create a Repository
 - Initialise the Repository
 - Install express
 - create a server
 - listen to port 5005
 - Install nodemon and update the script inside package.json
 - write request handlers for [ "/", "/test", "/hello" ]

 - Learn about ( node_modules, package.json, package-lock.json )
 - why there is ['.bin'] file in node_modules
 - what is the use of ['-g'] in npm install
 - What are dependencies ['Ans':]
 - explain this version structure ["express": "^4.21.2"]?
 - Difference between caret and tilde ['(^)vs(~)']
 - purpose of ['.gitignore'] file

 ### Routing & Routes Extensions
 - Explore routing and use of ``` ?, +, (), *  ``` in routes endpoint.
 - use of regex in routes ``` /a/ and /.*fly$/ ```
 - Reading the Query and Params in routes.
 - Reading the dynamic routes.

 ### Middleware & error Handling
 - Multiple Route Handlers - Play with the code
 - next()
 - Next function and errors along with res.send()
 - app.use("/route", rH, rH2, rH3, rh$);
 - What is a Middleware? Why do we need it?
 - How express Js basically handles requests behind the scenes?
 - Difference between app.use and app.all
 - Write a dummy auth middleware for admin
 - write a summy auth middleware for all users, except /user/login
 - Wildcard error handling with (throw new error())


 ### Database, Schema & Models | Mongoose
 - Create a free cluster on MongoDB official website ( Mongo Atlas)
 - Install mongoose library
 - Connect your application to the Databse "Connection-url"/devTinder
 - Call the connectDb function and connect to database before starting application on node or express.
 - Create userSchema and User Model
 - Create Post /signup API to add data to database
 - Push some documents using API calls from postman
 - Error Handling using try, catch


 - ### Diving into the APIs
 - Javascript (vs) JSON ( difference )
 - Add the express.json() middleware to your app
 - Make your signup API dynamic to recive data from the end user.
 - API- Get user by email
 - API - Get user by ID
 - API - Feed API - GET /feed - get all the users from the database
 - User .findOne with duplicate email ids, which object returned.
 - Create a delete user API
 - explore the mongose Documentation for Model section
 - Whare are options in a model.findOneAndUpdate method.
 - API - update a user by ID
 - API - update the user with email ID

 - ### Data Saitization & Schema Validations
 - Explore schematype options from the documentation
 - add required, unique, lowercase, min, minlength, trim
 - add default
 - Create a custom validate function for gender
 - Improve the DB schema - Put all appropiate validations on each field in schema
 - Add timestamps to the userSchema
 - Add API level validation on Patch request and signup post api
 - Data Sanitizing Add API validation for each field
 - Install validator
 - Explore validator library function and Use validator funcs for password, email, photo URL.
 - NEVER TRUST req.body

 - ### Encypting Passwords
 - Validate data in Signup API 
 - Install bcrypt package
 - Create PasswordHash using bcrypt.hash & save the user is encrypted password
 - Create login API
 - Compare passwords and throw errors if email or password is invalid


 - ### Authentication, JWT & Cookies
 - install cookie-parser
 - just send a dummy cookie to user
 - create GET /profile API and check if you get the cookie back
 - install jsonwebtoken
 - In login API, after email and password validation, create a JWT token and send it to user Cookie.
 - read the cookies inside your profile API and find the logged in user
 <!-- ******************************************** -->
 - userAuth Middleware 
 - Add the userAuth middleware in profile API and a new send ConnectionRequest API
 - Set the expiry of JWT token and cookieds to 7 days
 - Crate userSchema method to getJWT()
 - Create userSchema method to comparepassword(passwordInputByUser)

 












