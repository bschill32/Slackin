const aws = require('aws-sdk');

const { S3_BUCKET, ACCESS_KEY_ID,  SECRET_KEY, AWS_REGION} = process.env;
//aws access key and secret key are grabbed when we make a IAM user which louie and me made,
//and they are already in...

module.exports = {
  getAws: async(req, res) => {
    aws.config = {
      region: AWS_REGION,
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_KEY
    };
  
    const {fileName, fileType} = req.body;
    //we are grabbing these from the front end with dropzone and i will explain more when we get to them

    //amazon s3 DOES NOT use promise based architecture, so they have a bit of a funky way of doing things.
    //so thats why some of this will look really weird
    const s3 = new aws.S3();
    
    const s3Params = { //this is the settings for our link which amazon will give us to edit our bucket ie: upload files to our bucket link
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,//this says that we have 60s to use our link before it expires
      ContentType: fileType,
      ACL: 'public-read'
    };

    await s3.getSignedUrl('putObject', s3Params, (error, data) => {
      if (error) {
        console.log('amazon s3' + error);
        return res.end(); //if there is an error, console.log the error and end this function/ the servers request to s3
      } else {
        const returnData = {
          signedRequest: data,//this is our url that expires in 60 seconds
          url: `http://${S3_BUCKET}.s3.amazonaws.com/${filName}`//this is our url that is permanent which we will refer to when grabbing the file in the future
        };
        res.status(200).send(returnData); //sends back our signed url and our url for future use.
      };
    });

    
  }
}