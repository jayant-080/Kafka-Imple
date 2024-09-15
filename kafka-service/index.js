const kafka = require('kafka-node');
const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
const admin = new kafka.Admin(kafkaClient);

const topicsConfig = [
  { topic: 'order-placed', partitions: 3, replicationFactor: 1 }
];

const createTopics = () => {
  admin.listTopics((err, res) => {
    if (err) {
      console.error('Error listing topics:', err);
      return;
    }

    const existingTopics = Object.keys(res[1]);
    const topicsToCreate = topicsConfig.filter(t => !existingTopics.includes(t.topic));

    if (topicsToCreate.length > 0) {
      admin.createTopics(topicsToCreate, (err, result) => {
        if (err) {
          console.error('Error creating topics:', err);
        } else {
          console.log('Topics created successfully:', result);
        }
      });
    } else {
      console.log('All topics already exist.');
    }
  });
};

createTopics();
