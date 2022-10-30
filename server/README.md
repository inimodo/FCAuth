# Server (Backend)
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
| check.php | Checks if a user with his public token has access to perms x. | ($mail,$public_token,$perms) |

# File by file
## access.php
Creates a new user or uses a existing one to send a auth mail.
Creating a new token and checks if a users has all required perms.
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
+---------+--------+ 1)      +--------------+
|IF(L. MAIl > 2MIN)+--FALSE--+    THROW     |
+---------+--------+         +--------------+
          |
        TRUE
          |
+---------+--------+ 2)
| CREATE NEW TOKEN |
+---------+--------+
          |
+---------+--------+
|    Send Mail     |
+------------------+
</pre>
1) Only one token at a time is allowed! If there is a token that's not yet expired(Does not matter if active or inactive),
and the user resends a mail, the old token must be deleted. In short: The user_id should only be found zero or one time in 'token'

2) A token pair is generated: One token gets send to the mail(Private Token) and the other is returned to the browser(Public Token).
The one sent by mail is just a activation token which activates the other token sent to the browser.
This browser token is therefore only useful if the person opens the link in the mail, and calls validate.php with it.

## check.php
Given a public token, a mail address and a permission it will return true if both the token
is active and not expired and the mail has the required permission.

### Flowchart
<pre>
+---------------+  +---------------+   +---------------+                                             
|  Mail Address |  |  Permission   |   | Public Token  |                                             
+-------+-------+  +-------+-------+   +-------+-------+                                             
        |                  |                   |                                                     
+-------+-------+          |           +-------+-------+                                             
| LOOKUP GROUP  |          P           | PVT LOOKUP    |                                             
+-------+-------+          |           +-------+-------+                                             
        |                  |                   |                                                     
        |          +-------+-------+   +-------+-------+        +---------------+                    
        +-- GP-----+ if(GP.CNT(P)) |   |IF(IS EXPIRED) +--TRUE--+    THROW      |                    
                   +-------+-------+   +-------+-------+        +---------------+                    
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
                   | Return OKAY   |         -                                                       
                   +---------------+    
</pre>

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
Given a public token it returns a okay message if this token is active and not expired.

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
