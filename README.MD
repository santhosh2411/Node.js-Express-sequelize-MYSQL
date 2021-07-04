# Interview Task API


## Getting started

```
$ git clone git@github.com:santhosh2411/Node.js-Express-sequelize-MYSQL.git

```

## Installations
```
$ cd Node.js-Express-sequelize-MYSQL
$ npm install

```

## Running the application server

```
$ npm start
```

## Test

The application is running on
```
http://localhost:5151/

```


### HTTP method and URI list

| HTTP method | URI path | Description | Request Sample
| --- | --- | --- | --- |
| POST | /candidate | To create new Candidate | payload : ```{ name : "sandy", emailId: "sandy@gmail.com"}```|
| GET | /candidate | To Get all Candidates | Nil |
| GET | /candidate/{id} | To Get Candidate by Id | params : ```{ id : 1}``` |
| POST | /candidate/score/{id} | Add score by candidate Id | params : ```{ id : 1}```</br> payload : ```{ "firstRound": 9,"secondRound": 8, "thirdRound": 10 }``` |
| GET | /test/details | To return the test details of all candidated  | Nil |
