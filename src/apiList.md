# DevTinder Apis
---------------
## Auth Router
-post auth/signup
-post auth/login
-post auth/logout

## Profile Router
-get profile/view
-Patch profile/edit
-patch profile/password

## ConnectionRequest Router
-post request/send/intrested/:userId
-post request/send/ignored/:userId
-post request/review/accept/:requestId
-post request/review/reject/:requestId

## userConnection Router
-get user/connection
-get user/request
-get user/feed (gets you the profiles of other users in your Platform)
