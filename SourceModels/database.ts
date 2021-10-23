import admin = require('firebase-admin');
import * as serviceAccount from "./creds.json";

let account: admin.ServiceAccount = {};
account.clientEmail = serviceAccount.client_email;
account.privateKey = serviceAccount.private_key;
account.projectId = serviceAccount.project_id;

admin.initializeApp({
  credential: admin.credential.cert(account)
});

const db = admin.firestore();

export async function addData (data:string,sensor:string):Promise<void> {
  try{
    const collection = db.collection('collection').doc(sensor);
    let doc:any = await collection.get();
    if(!doc.exists){
      let toSend = {
        info: data
      }
      doc = await db.collection('collection').doc(sensor).set(toSend);
    }
    }
    catch (err) {
        console.log(err)
    }
} 

export async function deleteData (data:string,sensor:string):Promise<boolean> {
    try{
        let collection =  db.collection('collection').doc(sensor);
        let remove = await collection.update({
            info: admin.firestore.FieldValue.arrayRemove(data)
        });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
  }
}

export async function getData (sensor:string):Promise<admin.firestore.DocumentData | undefined> {
    try{
        let collection: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData>;
        collection = await db.collection('collection').doc(sensor).get();
        if(collection !== undefined && collection.data() !== undefined){
        let dataArr = collection.data();
        return dataArr;
        }
    }
    catch (err) {
        console.log(err);
    }
    return [];
}
