
import express from 'express'
import {Kafka} from 'kafkajs'
const app = express()

const port = 3000


const kafka = new Kafka({
    clientId: 'notification-service',

    brokers: ['kafka:9092'],
  });
  
  const consumer = kafka.consumer({ groupId: 'notification-group' });
  

 


app.listen(port,()=>{
  console.log("notification-service is started on port 3000")
});

(async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'order-placed' });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Received message: ${message.value.toString()}`);
    },
    });
  })();
