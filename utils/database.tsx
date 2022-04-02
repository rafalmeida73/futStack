import { Db, MongoClient } from "mongodb";

interface ConnectType {
    db: Db;
    client: MongoClient;
}

const client = new MongoClient("mongodb+srv://futstack:gNNykl10lrCXkRkU@cluster001.vkbzl.mongodb.net/test", {
   

});



export default async function connect(): Promise<ConnectType> {

    
    await client.connect();


const db = client.db('futstack');
return {db, client}

}