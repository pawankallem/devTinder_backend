
 # authRouter
 - POST /signup
 - POST /login
 - POST /logout

 # profileRouter
 - GET /profile/view
 - PATCH /profile/edit
 - PATCH /profile/password

 # requestRouter
 - POST /request/send/interested/:userId
 - POST /request/send/ignore/:userId

 - above 1 we can make to /request/send/:status/:userId


 - POST /request/review/accepted/:requestId
 - POST /request/review/rejected/:requestId

 - above 1 we can make to /request/review/:status/:requestId

 # userRouter
 - GET /user/requests/received
 - GET /user/connections
 - GET /feed 


 - Status :- [ignore,interested,accepted,rejected]
 - 