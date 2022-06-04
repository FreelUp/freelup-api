import main from "./main.js"
import test from "./test.js"

let db

if(process.env.NODE_ENV == "test" ) db = test
else db = main

export default db