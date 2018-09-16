# NOTE (9/16/18) This is old, but it still (somehow) works.
This is all the code for the ImgurScan2 back-end.


Build on Node, this (actually sorta complex) REST API gets the job done, and dose it good.
---
Example config:

```
module.exports = {
    'secret': 'CHANGEME',
    'database': 'mongodb://localhost:27017/imgurscan',
    'databasePurgeMinutes': '11',
    'maxNumberOfQueries': '20'
};
```

API Calls:
POST-> <base>/api/private/populateQuery (x-www-form-urlencoded -- Params: numOfImages -- Requires Auth Token in header)

GET-> <base>/api/results/<queryID> (No Auth is required)

POST-> <base>/api/auth (x-www-form-urlencoded -- Params: name, apiToken -- No Auth is required, will supply a token in JSON response)

GET-> <base>/api/private/findQueries (No Auth is required, will supply a data in JSON response)

POST-> <base>/api/private/createUser (x-www-form-urlencoded -- Params: name, password, isAdmin -- Requires Auth Token in header, requires user to be admin)



You also have the homepage, but that really isn't an API call.

If you see other routes, those are debug routes, soon to be removed.
