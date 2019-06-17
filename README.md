![Outlier.org](https://i.imgur.com/vJowpL1.png)

---

# Outlier Engineering Node.js JSON DB Challenge

Our apps need to query and store lots of information. We want to make sure that you have a good understanding of JavaScript and Node.js fundamentals. Can you build a simple API that can read data from and write data to JSON files with Node.js while following [Outlier's best practices](https://github.com/outlier-org/onboarding/blob/master/README.md#engineering-onboarding-guide)?

## The Challenge

Build an API with the following:

- Endpoints
  - PUT /:student-id/:propertyName(/:propertyName)
    - Stores data within `/data/${studentId}.json`.
    - If that file or property doesn't exist it is created.
    - Should also set nested properties: `curl -X PUT -d '{ "score": 98 }' http://localhost:1337/rn1abu8/courses/calculus/quizzes/ye0ab61` would mean that `require('./data/rn1abu8.json').courses.calculus.quizzes.ye0ab61.score === 98`
  - GET /:student-id/:propertyName(/:propertyName)
    - Retrieves data from `/data/${studentId}.json`. Returns 404 if that file or property doesn't exist.
    - Should also retrieve nested properties: `curl http://localhost:1337/rn1abu8/courses/calculus`
  - DELETE /:student-id/:propertyName(/:propertyName)
    - Removes data from `/data/${studentId}.json`. Returns 404 if that file or 
    property doesn't exist.
    - Should also remove nested properties.
- Tests
  - Each endpoint should have its own test

## Instructions

How to attempt this challenge:

1) Create a new repo in your account and note the git url
2) Clone this repo
3) Solve the challenge
4) Set your new repo as the origin: `git remote set-url origin ${your repo url}`
5) Push your solution to your repo

You must follow these steps for your solution to be accepted -- forks or other methods will not be considered.
