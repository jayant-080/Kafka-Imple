
import express from 'express'
import {Kafka} from 'kafkajs'
const app = express()

app.use(express.json())

const port = 3000

const kafka = new Kafka({
    clientId: 'order-service',

    brokers:['kafka:9092']
})


const producer = kafka.producer()


app.post('/order',async(req,res)=>{

    const data = req.body

    await producer.send({
        topic: 'order-placed',
        messages: [
            { value: JSON.stringify({ data: data, date: new Date() }) }
        ],
    });


    res.json({
        message:"order placed",
        data
    });
})


app.listen(port,()=>{
  console.log("order-service is started on port 3000")
});


(async () => {
    await producer.connect();
  })();