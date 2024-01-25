# Define variables for player's balance, bank, and farm
balance = 
    Name👤: {name}    
    Role🛡: {role}    
    Money💲: {money}

bank = 
    Name👤: {name}    
    Money💲: {money}    
    Level⏫: {level}    
    Security🔐: {secLevel}

farm = 
    Name👤: {name}    
    Bitcoin🪙: {bitcoin}    
    Graphics Cards⏫: {videocards}

# Define help menu options
help = 
    Top - See the top 10 players    
    B - View your account    
    Bank - View your bank    
    Farm - View your farm    
    Open Bank - Open a new bank    
    Open Farm - Open a new farm    
    Graphics Cards - View your graphics cards    
    Buy Graphics Card - Buy a new graphics card

# Define start message for the bot
start = Welcome to our bot! Type '/help' for a list of commands

# Define messages for various actions

videocards = 
    Your graphics cards:    
    {videocards}
    
money_give = Money transferred
videocard_shop = Graphics cards
new_videocard = Graphics card purchased
new_bank = Bank opened.
new_farm = Farm opened.
have_bank = You have a bank.
have_farm = You have a farm.
no_bank = You don't have a bank. To open a bank, say 'open bank'
no_farm = You don't have a farm. To open a farm, say 'open farm'
bank_take = Withdraw money
farm_take = Withdraw Bitcoin
bank_upgrade = Upgrade bank
bank_no_money = Insufficient funds in bank
bank_take_success = Money withdrawn from bank
bank_upgrade_success = Bank upgraded
bank_security_upgrade = Upgrade security
no_money = Insufficient funds
no_bitcoin = You don't have any Bitcoin
top10 = 
    Top 10 players:    
    {list}
no_access = You don't have access to this
error = An error occurred
admin_banned = {name} banned
admin_setrole = {name}'s role changed to {role}
admin_info = 
    ID🆔 : {ID}    
    Name👤: {name}    
    Money💲: {money}    
    Role🛡: {role}