# full+CTRL Authenticator

FCAuth is a simple access controller for small-scale web projects that need a way of controlling who has access to a private site. This works by the same principle that a mail 2-Factor-Authenticator uses, but with a twist. What if you leave out the part where the user actually log’s in? Why do you, a small-scale developer, need to worry about password encryption and safety when big corporations already spent a lot of time and money on this problem? Let's be honest, what's more secure, your self-made login system or a mail provider's login, for example, Google? Of course, it’s possible to create a safe login if you know what you are doing, but is it worth it for a small project or a demo?

### What does the full+CTRL Authenticator provide?
 * Access Control
 * White Listing
 * Simple Permission Checking
 * Basic Permission Groups

 ... but most importantly absolute privacy, no tracking, and user security!
 No personal data is stored except the user's mail therefore the end user does not need to worry about how safe the website is because no critical data is stored.

 **A important thing to remember when implementing FCAuth anywhere is: It is JUST designed for private use and should be used for low-priority web applications where the interest of access is low! Security issues are not evadable meaning, for a large audience, someone will find some way of evading this access control!**

# Frontend
The client, or frontend, is a react app that interacts via a REST API with the PHP backend. The client only serves the purpose of displaying and retrieving the data from the user and does no real "work".
To build run:

 `npm run build`

... then copy the "build" folders content onto your webserver where your domains has their root. eg.:

`https://[FCA_FORK_DOMAIN]/index.html`

**PLEASE NOTE: Do not use fcAuth without SSL certificate because of the major security risk. USE AT YOUR OWN RISK!**

## URI Prams
fcAuth gets the redirection URL via the 'url' get parameter and returns the token via the 'token' get parameter. eg.:

`https://[FCA_FORK_DOMAIN]?url=[REDIRECT URL]`

[REDIRECT URL] must follow this pattern:

`https://[ADDRESS]/[FILENAME].php`

because fcAuth will append the returning token like this:

`[REDIRECT URL]?token=[TOKEN]`


# Backend
This is the PHP backend that manages the MySQL connection and STMP Mail sending via [PHPMailer](https://github.com/PHPMailer).

## General
### Token
 * Public Token (PBT):  Used for authentication and is given to the browser.
 * Private Token (PVT): Only used to activate the Public token.

### Simplified
| File | Description | Parameter |
| ----------- | ----------- | ----------- |
|access.php | Manages mail sending and tokens | ($mail) |
| validate.php | Activates public token by the private token | ($private_token)  |
| ask.php | Checks if a public token can be used. | ($public_token) |
| check.php | Checks if a user with his public token has access to perms x. | ($public_token,$perms) |

# File by file
## access.php
Creates a new user or uses a existing one to send a auth mail.
Creating a new token and checks if a users has all required perms.

__NOTE: This only serves the client react app.__
### Flowchart
<pre>
+------------------+  
| E-Mail Address   |  
+---------+--------+
          |
+---------+--------+          +--------------+
|  if(EMAIL VALID) +--FALSE---+    THROW     |
+---------+--------+          +--------------+
          |
        TRUE
          |
+---------+--------+         +--------------+
|  IF(MAIL KNOWN)  +--FALSE--+  ADD TO DB   |
+---------+--------+         +-------+------+
          |                          |
        TRUE                         |
          |                          |
          +--------------------------+
+---------+--------+          +--------------+
|  if(IS ON W.L.)  +--FALSE---+    THROW     |
+---------+--------+          +--------------+
          |
        TRUE
          |
+---------+--------+ 1)
|  REM. OLD TOKEN  |
+---------+--------+
          |
+---------+--------+ 2)
| CREATE NEW TOKEN |
+---------+--------+
          |
+---------+--------+
|    Send Mail     |
+------------------+
</pre>
1) Only one token at any time is allowed! If there is a token that's not yet expired(Does not matter if active or inactive),
and the user resends a mail, the old token must be deleted. In short: The user_id should only be found zero or one time in 'token'.

2) A token pair is generated: One token is sent to the mail(private token) and the other is returned to the browser(public token).
The one sent by mail is just an activation token that activates the public token sent to the browser.
This browser token is therefore only useful if a person opens the link in the mail, and calls validate.php with it.


## check.php
Given a public token and a permission key, it will return true if both the token
is active and not expired and the mail has the required permission.
This is, therefore, the external validation site for any third-party services using fcAuth meaning if a site wants to validate an action it needs to call this site.


### Flowchart
<pre>
+---------------+   +---------------+                                             
|  Permission   |   | Public Token  |                                             
+-------+-------+   +-------+-------+                                             
        P                   |                                                     
+-------+-------+   +-------+-------+ 1)                                            
| if(G .CNT(P)) |-G-| PVT LOOKUP    |                                             
+-------+-------+   +-------+-------+                                             
        |                   |                                                     
        |           +-------+-------+        +---------------+                    
        |           |IF(IS EXPIRED) +--TRUE--+    THROW      |                    
        |           +-------+-------+        +---------------+                    
        |                   |                                                     
        |                 FALSE                                                   
        |                   |                                                     
+-------+-------+   +-------+-------+        +---------------+                    
|      AND      +---+IF(IS ACTIVE)  +--FALSE-+    THROW      |                    
+-------+-------+   +---------------+        +---------------+                    
        |                                                                         
      TRUE                                                                        
        |                                                                         
+-------+-------+                                                                 
| Return OKAY   |                                                                
+---------------+    
</pre>
1) PVT LOOKUP takes the public token and looks up its owner, meaning the email it was registered for.
With the now-known email, the user's permission group will be read and compared to the given permission key.
If the permission key is contained in the permission key list of the group the user is assigned to the OKAY will be returned.

## validate.php
Given a Private token it will activate its counterpart Public token,
if the token pair is not expired.

### Flowchart
<pre>
+---------------+                                            
| Private Token |                                            
+-------+-------+                                            
        |                                                    
+-------+-------+                                            
| PVT LOOKUP    |                                            
+-------+-------+                                            
        |                                                    
+-------+-------+        +---------------+                   
|IF(IS EXPIRED) +--TRUE--+    THROW      |                   
+-------+-------+        +---------------+                   
        |                                                    
      FALSE                                                  
        |                                                    
+-------+-------+                                            
| Activate PBT  |                                            
+---------------+   
</pre>

## ask.php
Given a public token, it returns an okay message if this token is active and not expired.

__NOTE: This only serves the client react app.__

### Flowchart
<pre>
+---------------+                                             
| Public Token  |                                             
+-------+-------+                                             
        |                                                     
+-------+-------+                                             
| PVT LOOKUP    |                                             
+-------+-------+                                             
        |                                                     
+-------+-------+        +---------------+                    
|IF(IS EXPIRED) +--TRUE--+    THROW      |                    
+-------+-------+        +---------------+                    
        |                                                     
      FALSE                                                   
        |                                                     
+-------+-------+        +---------------+                    
|IF(IS ACTIVE)  +--FALSE-+    THROW      |                    
+-------+-------+        +---------------+                    
        |                                                     
      TRUE                                                    
        |                                                     
+-------+-------+                                             
| Return OKAY   |                                             
+---------------+  
</pre>
