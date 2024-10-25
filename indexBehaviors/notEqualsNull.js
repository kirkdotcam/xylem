db.accounts.insertMany([
    { firstname: "John", lastname: "Doe", age: 28, accountId: "acc001" },
    { firstname: null, lastname: "Smith", age: 34, accountId: "acc002" },
    { firstname: "Alice", lastname: "Johnson", age: null, accountId: "acc003" },
    { firstname: null, lastname: "Brown", age: 45, accountId: "acc004" },
    { firstname: "Emily", lastname: "Davis", age: null, accountId: "acc005" },
    { firstname: "Michael", lastname: "Wilson", age: 29, accountId: "acc006" },
    { firstname: null, lastname: "Garcia", age: 40, accountId: "acc007" },
    { firstname: "Sarah", lastname: "Martinez", age: null, accountId: "acc008" },
    { firstname: "David", lastname: "Lopez", age: 33, accountId: "acc009" },
    { firstname: null, lastname: "Hernandez", age: 37, accountId: "acc010" },
    { lastname: "Branson", age: 88},
    { lastname: "Carinho", age: null},
    { lastname: "Darringer", age: 48},
    { firstname: "Ricky", age: 22}
]);

db.accounts.createIndex({firstname: 1, age: 1, accountId: 1 }, {name: "firstname"})
db.accounts.explain("executionStats").find({firstname: {$ne: null}, age: {$gt: 30} })

db.accounts.createIndex({lastname: 1, age: 1}, {name: "age-range"})
db.accounts.createIndex({age: 1, lastname: 1}, {name: "age-match"})

db.accounts.explain("executionStats").find({age: {$ne: null, $gt: 20}, lastname: {$gt: "Bailey"} })


