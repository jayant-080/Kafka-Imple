
import express from 'express'
import {Kafka} from 'kafkajs'

const app = express(); // Correct initialization of express

const port = 3000;

const kafka = new Kafka({
    clientId: 'inventory-service',
    brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'inventory-group' });

app.listen(port, () => {
    console.log(`Inventory-service is started on port ${port}`);
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
