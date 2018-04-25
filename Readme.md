
# API
1. account-api clone `man-master` branch
2. hr-api clone `man-master-v2` branch

# Install Packages
1. `rm -rf node_modules/*` to remove all packages
2. `npm install`


# Setup Database
## Create Database
```
create database "account";
create database "app";
create database "accounttest";
create database "apptest";
```

## Create Schema
create schema "hr" inside App and Apptest
```
create schema "hr";
```

## Reset Database
1. inside account-api folder, run `node bin/migrate reset`
2. inside hr-api folder, run `node bin/migrate reset`

## Update Database
run `node bin/migrate update` or just `node bin/migrate`
