import React from 'react'




export default function ImageRekognition({base64String}) {
    AWS.config.region = 'us-east-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: "us-east-1:7e4257c7-b198-4dfb-806c-b5b1cff0d337",
        });



       

    




}

//https://docs.aws.amazon.com/rekognition/latest/dg/image-bytes-javascript.html

