import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-west-2' });
const dbDocClient = new AWS.DynamoDB.DocumentClient();
const table = 'alert';

/* Get alerts from DynamoDB */
const getAlertByTime = function getAlertByTime() {
  return new Promise((resolve, reject) => {
    // Unix time based on minutes
    let eventtime = new Date();
    eventtime.setUTCSeconds(0);
    eventtime.setUTCMilliseconds(0);
    eventtime = eventtime.getTime();
    console.log(`Current time: ${eventtime}`);

    const params = {
      TableName: table,
      IndexName: 'eventtime-index',
      KeyConditionExpression: 'eventtime = :eventtime',
      ExpressionAttributeValues: {
        ':eventtime': eventtime,
      },
    };

    dbDocClient.query(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

export default getAlertByTime;
