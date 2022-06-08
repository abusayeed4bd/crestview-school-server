const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

var cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.r4sl1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const classCollection = client.db('school').collection('classes')


        app.get('/classes', async (req, res) => {
            const q = req.query;
            const cursor = classCollection.find(q);
            const classes = await cursor.toArray();
            res.send(classes);
        })
    }
    finally {

    }
}
run().catch(console.dir)





app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})