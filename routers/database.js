const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')

router.use(cors())


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


const url = "mongodb+srv://twright:tamas0306@tamas-db.ompqhag.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);

router.get('/test', (req, res) => {
  res.send('hello world')
})


// Create Data 
router.post('/add-data-sessions', (req, res) => {
  console.log("Adding Data\n");

  console.log(req.body)

  const databaseName = "Nadmin"
  let data = req.body;

  MongoClient.connect(url, function(err, db) {
    collectionName = "sessionsData"

    let connection = db.db(databaseName);

    connection.collection(collectionName).insertOne(data, (err, res) => {
      if (err) throw err;
      console.log("inserted")
      db.close();
    });
  });
})

router.post('/add-data-discount', (req, res) => {
  console.log("Adding Data\n");

  console.log(req.body)

  const databaseName = "Nadmin"
  let data = req.body;

  MongoClient.connect(url, function(err, db) {
    collectionName = "discountData"

    let connection = db.db(databaseName);

    connection.collection(collectionName).insertOne(data, (err, res) => {
      if (err) throw err;
      console.log("inserted")
      db.close();
    });
  });
})

router.post('/add-data-settings', (req, res) => {
  console.log("Adding Year Group\n");
  console.log(req.body)

  const databaseName = "Nadmin"
  let data = req.body;

  MongoClient.connect(url, function(err, db) {
    collectionName = "settingsArray"
    let connection = db.db(databaseName);
    connection.collection(collectionName).insertOne(data, (err, res) => {
      if (err) throw err;
      console.log("inserted")
      db.close();
    });
  });
})


//Template to send data to database

router.post('/add-data-studentdata', (req, res) => {
  console.log("Adding Student Data\n");

  const databaseName = "Nadmin"
  let data = req.body;
  MongoClient.connect(url, function(err, db) {
    collectionName = "studentdata"
    let connection = db.db(databaseName);
    connection.collection(collectionName).insertOne(data, (err, res) => {
      if (err) throw err;
      console.log("inserted")
      db.close();
    });
  });
})

router.post('/add-data-parentdata', (req, res) => {
  console.log("Adding Parent Data\n");

  const databaseName = "Nadmin"
  let data = req.body;
  MongoClient.connect(url, function(err, db) {
    collectionName = "parentdata"
    let connection = db.db(databaseName);
    connection.collection(collectionName).insertOne(data, (err, res) => {
      if (err) throw err;
      console.log("inserted")
      db.close();
    });
  });
})

router.post('/add-data-tutordata', (req, res) => {
  console.log("Adding Tutor Data\n");

  const databaseName = "Nadmin"
  let data = req.body;
  MongoClient.connect(url, function(err, db) {
    collectionName = "tutordata"
    let connection = db.db(databaseName);
    connection.collection(collectionName).insertOne(data, (err, res) => {
      if (err) throw err;
      console.log("inserted")
      db.close();
    });
  });
})

router.post('/add-data-notificationdata', (req, res) => {
  console.log("Adding Notification Data\n");

  const databaseName = "Nadmin"
  let data = req.body;
  MongoClient.connect(url, function(err, db) {
    collectionName = "notificationdata"
    let connection = db.db(databaseName);
    connection.collection(collectionName).insertOne(data, (err, res) => {
      if (err) throw err;
      console.log("inserted")
      db.close();
    });
  });
})

router.post('/add-data-logindata', (req, res) => {
  console.log("Adding Login Data\n");

  const databaseName = "Nadmin"
  let data = req.body;
  var password = data.loginRecord.password  
  var username = data.loginRecord.username
  
  const chars = username + username.split('').reverse().join('')
  for (let i = 0; i < chars.length - 1; i += 2) {
    let temp = chars[i];
    chars[i] = chars[i + 1];
    chars[i + 1] = temp;
  }
  
  let cipheredString = '';
  for (let i = 0; i < chars.length; i++) {
    let code = chars.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      code = (code - 65 + 7) % 26 + 65;
    } else if (code >= 97 && code <= 122) {
      code = (code - 97 + 7) % 26 + 97;
    }
    cipheredString += String.fromCharCode(code);
  }
  
  const crypto = require('crypto');
  let hash = cipheredString + password;
  for (let i = 0; i < 1000; i++) {
    hash = crypto.createHash('sha256').update(hash).digest('hex');
  }

  data.loginRecord.password = hash

  console.log(hash)
  
  MongoClient.connect(url, function(err, db) {
    collectionName = "logindata"
    let connection = db.db(databaseName);
    connection.collection(collectionName).insertOne(data, (err, res) => {
      if (err) throw err;
      console.log("inserted")
      db.close();
    });
  });
})

router.post('/authenticate', (req, res) => {
  let details = req.body

  console.log(details)
  
  var password = details.password  
  var username = details.username
  
  const chars = username + username.split('').reverse().join('')
  for (let i = 0; i < chars.length - 1; i += 2) {
    let temp = chars[i];
    chars[i] = chars[i + 1];
    chars[i + 1] = temp;
  }
  
  let cipheredString = '';
  for (let i = 0; i < chars.length; i++) {
    let code = chars.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      code = (code - 65 + 7) % 26 + 65;
    } else if (code >= 97 && code <= 122) {
      code = (code - 97 + 7) % 26 + 97;
    }
    cipheredString += String.fromCharCode(code);
  }
  
  const crypto = require('crypto');
  let hash = cipheredString + password;
  for (let i = 0; i < 1000; i++) {
    hash = crypto.createHash('sha256').update(hash).digest('hex');
  }

  if (details.reload){
    hash = details.password
  }

  console.log(details)

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "logindata"
    let connection = db.db(databaseName);
    connection.collection(collectionName).find({}).toArray((err, data) => {
      if (err) throw err;      
      sessionData = {
        accessURL : "",
        userID : "",
        password : "",
        script : "",
        userName: ""
      }
      
      for (let i = 0; i < data.length; i++){  
        console.log("username check:" + details.username , data[i].loginRecord.username)

        if (details.username == data[i].loginRecord.username){          

          console.log(hash , data[i].loginRecord.password)
          sessionData.userName = data[i].loginRecord.username
                  
          if (hash == data[i].loginRecord.password){
            sessionData.password = hash
            sessionData.userID = data[i].loginRecord.userID

            if (data[i].loginRecord.access == "parent"){ 
              if (details.reload){
                if(details.mobile){
                  sessionData.script = "../Java/mobileParentScript_uaasdkhtgavetwqef56fy4rwq3b87dgagf3487rsvdfh.js"
                } else {
                  sessionData.script = "../Java/parentScript_khsbdfyvs6834i2whv3d97adu2c3ewq98ed723vh.js"                  
                }
              } else {
                sessionData.accessURL = "https://www.nadmin.co.uk/Pages/parentside.html"   
              }
              return res.send(JSON.stringify(sessionData));
              
            } else if (data[i].loginRecord.access == "tutor"){
              if (details.reload){
                if(details.mobile){
                  sessionData.script = "../Java/mobileTutorScript_jsnbdfjhsdfg867g34hrhjwbvsad763yrgbwe98fd4htb.js"
                } else {
                  sessionData.script = "../Java/tutorScript_ashkdastdvewqtdfi76832VEQAKSD6q3terhasvd6g.js"                  
                }
              } else {
                sessionData.accessURL = "https://www.nadmin.co.uk/Pages/tutorside.html"  
              }
              return res.send(JSON.stringify(sessionData));
              
            } else if (data[i].loginRecord.access == "daBoss"){
              if (details.reload){
                if(details.mobile){
                  sessionData.script = "../Java/mobileTutorScript_jsnbdfjhsdfg867g34hrhjwbvsad763yrgbwe98fd4htb.js"
                } else {
                  sessionData.script = "../Java/script_khaebfdwiyedgf82374rw2hedq9734yv2qwi8dy8163f4v230d8yg.js"                  
                }
              } else {
                sessionData.userID = "NA-Wr15h-001"
                sessionData.accessURL = "https://www.nadmin.co.uk/Pages/students.html"
              }              
              return res.send(JSON.stringify(sessionData));
            }
          } else {
            sessionData.accessURL = "failed"
            sessionData.password = ""
            db.close();
            return res.send(JSON.stringify(sessionData));
          } 
          break            
        } 


        if (i == data.length-1){
          sessionData.accessURL = "failed"
          sessionData.password = ""
          db.close();
          return res.send(JSON.stringify(sessionData));  
        }
      }      
           
    });
  });

})

//Template to get data from database
router.get('/get-data-sessions/', (req, res) => {
  console.log("Get Data\n");

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "sessionsData";

    let connection = db.db(databaseName);
    console.log(collectionName)
    connection.collection(collectionName).find({}).toArray((err, data) => {
      if (err) throw err;
      res.send(data)
      db.close();
    });
  });
})

router.get('/get-data-discount/', (req, res) => {
  console.log("Get Data\n");

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "discountData";

    let connection = db.db(databaseName);
    console.log(collectionName)
    connection.collection(collectionName).find({}).toArray((err, data) => {
      if (err) throw err;
      res.send(data)
      db.close();
    });
  });
})

router.get('/get-data-settings/', (req, res) => {
  console.log("Get settings\n");

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "settingsArray";

    let connection = db.db(databaseName);
    console.log(collectionName)
    connection.collection(collectionName).find({}).toArray((err, data) => {
      if (err) throw err;
      res.send(data)
      db.close();
    });
  });
})

router.get('/get-data-studentdata/', (req, res) => {
  console.log("Get Student Data\n");

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "studentdata";

    let connection = db.db(databaseName);
    connection.collection(collectionName).find({}).toArray((err, data) => {
      if (err) throw err;

      // Check if the userID query parameter is present and non-empty
      if (req.query.userId && req.query.userId !== '') {
        console.log(req.query.userId)
        dataToReturn = []
        for (let index = 0; index < data.length; index++) {
          if (req.query.userId != data[index].studentsRecord.parentID) {continue}
          dataToReturn.push(data[index])
        }    
        console.log(dataToReturn)
        res.send(dataToReturn)
        db.close();
      } else {
        res.send(data)
        db.close();
      }      
    });
  });
})

router.get('/get-data-parentdata/', (req, res) => {
  console.log("Get parent Data\n");

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "parentdata";

    let connection = db.db(databaseName);
    console.log(collectionName)
    connection.collection(collectionName).find({}).toArray((err, data) => {
      if (err) throw err;

      // Check if the userID query parameter is present and non-empty
      if (req.query.userId && req.query.userId !== '') {
        console.log(req.query.userId)
        dataToReturn = []
        for (let index = 0; index < data.length; index++) {
          if (req.query.userId != data[index].parentsRecord.parentID) {continue}
          dataToReturn.push(data[index])
        }    
        console.log(dataToReturn)
        res.send(dataToReturn)
        db.close();
      } else {
        res.send(data)
        db.close();
      }         
    });
  });
})

router.get('/get-data-tutordata/', (req, res) => {
  console.log("Get tutordata Data\n");

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "tutordata";

    let connection = db.db(databaseName);
    console.log(collectionName)
    connection.collection(collectionName).find({}).toArray((err, data) => {
      if (err) throw err;
      
      res.send(data)
      db.close();
    });
  });
})

router.get('/get-data-notificationdata/', (req, res) => {
  console.log("Get Notification Data\n");

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "notificationdata";

    let connection = db.db(databaseName);
    console.log(collectionName)
    connection.collection(collectionName).find({}).toArray((err, data) => {
      if (err) throw err;
      
      // Check if the userID query parameter is present and non-empty
      if (req.query.userId && req.query.userId !== '') {
        console.log(req.query.userId)
        dataToReturn = {
          notificationsRecord: {
            offers: data[0].notificationsRecord.offers
          }
        }
        console.log(dataToReturn)
        res.send(dataToReturn)
        db.close();
      } else {
        res.send(data)
        db.close();
      }  
    });
  });
})


router.get('/get-data-logindata/', (req, res) => {
  console.log("Get Login Data\n");

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "logindata";

    let connection = db.db(databaseName);
    console.log(collectionName)
    connection.collection(collectionName).find({}).toArray((err, data) => {
      if (err) throw err;
      
      // Check if the userID query parameter is present and non-empty
      if (req.query.userId && req.query.userId !== '') {
        console.log(req.query.userId)
        for (let index = 0; index < data.length; index++) {
          if (req.query.userId == data[index].loginRecord.userID) {
            dataToReturn = data[index]
            break
          }
        }    
        console.log(dataToReturn)
        res.send(dataToReturn)
        db.close();
      } else {
        res.send(data)
        db.close();
      } 
    });
  });
})

// https://nadmin-database-backend.mrwright.repl.co/get-data-sessions/sessionsData


// Update Data
router.post('/update-data-sessions/', (req, res) => {
  console.log("Update Data\n");

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "sessionsData"
    objectToUpdate_id = req.body._id;

    let connection = db.db(databaseName);
    connection.collection(collectionName).updateOne({ "_id": req.body._id }, { $set: { sessionType: req.body.sessionType, sessionPrice: req.body.sessionPrice } }, (err, data) => {
      if (err) throw err;
      console.log(req.body)
      res.send("Data " + objectToUpdate_id + " Updated")
      db.close();
    });
  });

})

router.post('/update-data-studentdata/', (req, res) => {
  console.log("Update Student Data\n");

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "studentdata"
    objectToUpdate_id = req.body._id;

    let connection = db.db(databaseName);
    connection.collection(collectionName).updateOne({ "_id": req.body._id }, { $set: { studentsRecord: req.body.studentsRecord } }, (err, data) => {
      if (err) throw err;
      console.log(req.body)
      console.log("complete")      
      res.send("Data " + objectToUpdate_id + " Updated")
      db.close();
    });
  });

})

router.post('/update-data-parentdata/', (req, res) => {
  console.log("Update Parent Data\n");

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "parentdata"
    objectToUpdate_id = req.body._id;

    let connection = db.db(databaseName);
    connection.collection(collectionName).updateOne({ "_id": req.body._id }, { $set: { parentsRecord: req.body.parentsRecord } }, (err, data) => {
      if (err) throw err;
      console.log(req.body)
      console.log("complete")
      res.send("Data " + objectToUpdate_id + " Updated")
      db.close();
    });
  });
})

router.post('/update-data-tutordata/', (req, res) => {
  console.log("Update Parent Data\n");

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "tutordata"
    objectToUpdate_id = req.body._id;

    let connection = db.db(databaseName);
    connection.collection(collectionName).updateOne({ "_id": req.body._id }, { $set: { tutorsRecord: req.body.tutorsRecord } }, (err, data) => {
      if (err) throw err;
      console.log(req.body)
      console.log("complete")
      res.send("Data " + objectToUpdate_id + " Updated")
      db.close();
    });
  });
})

router.post('/update-data-notificationdata/', (req, res) => {
  console.log("Update Parent Data\n");

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "notificationdata"
    objectToUpdate_id = req.body._id;

    let connection = db.db(databaseName);
    connection.collection(collectionName).updateOne({ "_id": req.body._id }, { $set: { notificationsRecord: req.body.notificationsRecord } }, (err, data) => {
      if (err) throw err;
      console.log(req.body)
      console.log("complete")
      res.send("Data " + objectToUpdate_id + " Updated")
      db.close();
    });
  });
})

router.post('/update-data-logindata/', (req, res) => {
  console.log("Update Login Data\n");
  
  let data = req.body;
  console.log(data)
  var password = data.loginRecord.password  
  var username = data.loginRecord.username
  
  const chars = username + username.split('').reverse().join('')
  for (let i = 0; i < chars.length - 1; i += 2) {
    let temp = chars[i];
    chars[i] = chars[i + 1];
    chars[i + 1] = temp;
  }
  
  let cipheredString = '';
  for (let i = 0; i < chars.length; i++) {
    let code = chars.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      code = (code - 65 + 7) % 26 + 65;
    } else if (code >= 97 && code <= 122) {
      code = (code - 97 + 7) % 26 + 97;
    }
    cipheredString += String.fromCharCode(code);
  }
  
  const crypto = require('crypto');
  let hash = cipheredString + password;
  for (let i = 0; i < 1000; i++) {
    hash = crypto.createHash('sha256').update(hash).digest('hex');
  }

  data.loginRecord.password = hash

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "logindata"
    objectToUpdate_id = req.body._id;

    console.log("blah: " + req.body)

    let connection = db.db(databaseName);
    connection.collection(collectionName).updateOne({ "_id": req.body._id }, { $set: { loginRecord: req.body.loginRecord } }, (err, data) => {
      if (err) throw err;
      console.log(req.body)
      console.log("complete")
      res.send("Data " + objectToUpdate_id + " Updated")
      db.close();
    });
  });
})

router.post('/update-data-discount/', (req, res) => {
  console.log("Update Data\n");

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "discountData"
    objectToUpdate_id = req.body._id;

    let connection = db.db(databaseName);
    connection.collection(collectionName).updateOne({ "_id": req.body._id }, { $set: { nameOfDiscount: req.body.nameOfDiscount, amountOfDiscount: req.body.amountOfDiscount, typeOfDiscount: req.body.typeOfDiscount } }, (err, data) => {
      if (err) throw err;
      console.log(req.body)
      res.send("Data " + objectToUpdate_id + " Updated")
      db.close();
    });
  });
})

router.post('/update-data-settings/', (req, res) => {
  console.log("Update Data\n");

  const databaseName = "Nadmin"
  console.log(req.body)

  MongoClient.connect(url, function(err, db) {
    collectionName = "settingsArray"

    let connection = db.db(databaseName);
    connection.collection(collectionName).updateOne({ "_id": req.body._id }, { $set: { settings: req.body.settings } }, (err, data) => {
      if (err) throw err;
      res.send("Data Updated")
      console.log("Data Updated")
      db.close();
    });
  });
})

router.post('/update-data-settings-element/', (req, res) => {
  console.log("Update settings element\n");



  const databaseName = "Nadmin"
  let fieldToUpdate = req.body.field;
  console.log(req.body)

  MongoClient.connect(url, function(err, db) {
    collectionName = "settingsArray"
    let connection = db.db(databaseName);

    connection.collection(collectionName).updateOne({ "_id": req.body._id }, { $set: { [req.body.field + "." + req.body.previousIndex]: req.body.fieldValue } }, (err, data) => {
      if (err) throw err;
      res.send("Element Added")
      
      db.close();
    });
  });
})

router.post('/update-data-settings-remove/', (req, res) => {
  console.log("Update settings remover\n");

  const databaseName = "Nadmin"
  let fieldToUpdate = req.body.field;
  console.log(req.body)

  MongoClient.connect(url, function(err, db) {
    collectionName = "settingsArray"
    let connection = db.db(databaseName);

    if (fieldToUpdate == "settings.yeargroup") {
      connection.collection(collectionName).updateOne({ "_id": req.body._id }, { $pull: { "settings.yeargroup": req.body.fieldValue } }, (err, data) => {
        if (err) throw err;
        res.send("Element Removed")
        console.log("Element Removed")
        db.close();
      });
    }


    if (fieldToUpdate == "settings.subjects") {
      connection.collection(collectionName).updateOne({ "_id": req.body._id }, { $pull: { "settings.subjects": req.body.fieldValue } }, (err, data) => {
        if (err) throw err;
        res.send("Element Removed")
        console.log("Element Removed")
        db.close();
      });
    }


    if (fieldToUpdate == "settings.schools") {
      connection.collection(collectionName).updateOne({ "_id": req.body._id }, { $pull: { "settings.schools": req.body.fieldValue } }, (err, data) => {
        if (err) throw err;
        res.send("Element Removed")
        console.log("Element Removed")
        db.close();
      });
    }

    if (fieldToUpdate == "settings.books") {
      connection.collection(collectionName).updateOne({ "_id": req.body._id }, { $pull: { "settings.books": req.body.fieldValue } }, (err, data) => {
        if (err) throw err;
        res.send("Element Removed")
        console.log("Element Removed")
        db.close();
      });
    }


    if (fieldToUpdate == "settings.times") {
      connection.collection(collectionName).updateOne({ "_id": req.body._id }, { $pull: { "settings.times": req.body.fieldValue } }, (err, data) => {
        if (err) throw err;
        res.send("Element Removed")
        console.log("Element Removed")
        db.close();
      });
    }


  });

})

// Remove Data
router.get('/remove-data-sessions/:id', (req, res) => {
  console.log("Remove Data\n");

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "sessionsData"
    objectToRemove_id = req.params.id;

    let connection = db.db(databaseName);
    console.log(collectionName)
    connection.collection(collectionName).deleteOne({ "_id": objectToRemove_id }, (err, data) => {
      if (err) throw err;
      console.log()
      res.send("Data " + objectToRemove_id + " Deleted")
      db.close();
    });
  });
})

router.get('/remove-data-discount/:id', (req, res) => {
  console.log("Remove Data\n");

  const databaseName = "Nadmin"

  MongoClient.connect(url, function(err, db) {
    collectionName = "discountData"
    objectToRemove_id = req.params.id;

    let connection = db.db(databaseName);
    console.log(collectionName)
    connection.collection(collectionName).deleteOne({ "_id": objectToRemove_id }, (err, data) => {
      if (err) throw err;
      console.log()
      res.send("Data " + objectToRemove_id + " Deleted")
      db.close();
    });
  });
})

// Test
router.get('/test', (req, res) => {
  res.send('Database Request Working')
})


module.exports = router;