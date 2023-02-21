# react-jobly

Jobly: a basic job listing/application app with basic account integration. 

Deployed at:
https://crowded-patch.surge.sh/

Frontend deployed with Surge, backend is hosted on Heroku.

JS App using Express for the backend and React for the frontend. 

-Includes basic account integration (an account is required to view most pages. Passwords are hashed with a bcrypt work factor of 14.)

-Search for companies and jobs from the database. Each job entry has a button that applies your account to the job (there is no futher backend implementation for this, but this could be easily updated to send this info elsewhere as it is stored in the db)
