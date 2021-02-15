import React, {useRef} from 'react'
import '../index.css';
import $ from 'jquery'
import Axios from 'axios'
import MiniDisplay from '../components/MiniDisplay'
import AWS from 'aws-sdk';

AWS.config.region = 'us-east-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:7e4257c7-b198-4dfb-806c-b5b1cff0d337"
});





const initialLocationState = {
    latitude: null,
    longitude: null,
    speed:null,
    timestamp: null
  }

  

export default function ButtonContainer({imgRef}) 



{
    const fileInput = useRef()
    
    const [gps, setGPS] = React.useState([initialLocationState]) // uses an array of dictionaries 
    const [clicked, setButtonClicked ] = React.useState(false)
    const [gpsHistory, updateGPSHistory] =  React.useState([...gps]) // spread operator only works on iterables        
    const [currentImage, setCurrentImage ]= React.useState('')
    const [base64String, setbase64String ]= React.useState(null)
    const [s3Bucket] = React.useState("deployments-si3mshady")
    

    const [imageBucketParams] = React.useState({
      Image: {
       S3Object: {
        Bucket: s3Bucket, 
        Name: currentImage.name === null? '': currentImage.name 
       }
      }
     })
   

    var rekognition = new AWS.Rekognition()
    

    const handleGeoLocation = (event) => {

        setGPS([{ latitude:event.coords.latitude,  longitude:event.coords.longitude,
          accuracy:event.coords.accuracy, timestamp: new Date().toISOString() }])  }

    const trackHistory = () => {
            updateGPSHistory(prev => ([ ...prev,...gps])) //create new array with new & previous elements
            console.log(gpsHistory)
          }

        
    

  React.useEffect(() => { navigator.geolocation.getCurrentPosition(handleGeoLocation)},[clicked])  // useEffect is triggered ONLY when selected pieces of state are updated 
  React.useEffect(() => {
    const url = "https://72zu52q14g.execute-api.us-east-1.amazonaws.com/dev/tracker"
    Axios.post(url, gpsHistory)
      .then(response => {
        console.log(response)
        console.log("updated gpsHistory")
      })
      .catch(error => {
        console.log(error)
        
      })

  }, [gps])


  const analyze_image = (base64Data) => {      
   const params = {
      Image: { Bytes: base64Data }}

    rekognition.detectLabels(params, function(err, data) {
      if (err) console.log(err); // an error occurred
      
      else     console.log(data);  }

    
  )
  }


   const getImage =  (event) => {
        $("#camera").on("change", (event) => {
          const newImageFile = event.target.files[0]
          sendToS3(newImageFile)
          console.log('newImagevariable', newImageFile.name)
          setCurrentImage(newImageFile.name)
            if (newImageFile !== null) {                           
                imgRef.current.src = window.URL.createObjectURL(newImageFile) 
                
                
                
          }  } )
        
          
        }

                    
  












const sendToS3 = (data) => {    
    
  var file = data
  var reader = new FileReader();
  reader.onloadend = function() {
    console.log('RESULT', reader.result)   //Try and send to s3
      
    const bucket = new AWS.S3( { params: {Bucket: s3Bucket} } );

    const buf = new Buffer(reader.result.replace(/^data:image\/\w+;base64,/, ""),'base64')
    analyze_image(buf)


    var data = {

      Key: "perfectCircle", 
    
      Body: buf,
    
      ContentEncoding: 'base64',
    
      ContentType: 'image/jpeg'
    
    };


    bucket.putObject(data, function(err, data){

      if (err) { 
  
        console.log(err);
  
        console.log('Error uploading data: ', data); 
  
      } else {
  
        console.log('succesfully uploaded the image!');
  
      }
  
  });

 }
  reader.readAsDataURL(file);
    

}
   

    return (
        <>
        
        <div className="containerButtons"> 

            <div className="containerButtons__row">
            <div className="containerButtons__row--col">
                        <button onClick={(event) => ( $('input').click(), setButtonClicked(!clicked), trackHistory())}  className="theGlow" >
                            
                        <i class="fas fa-camera"></i>

                            <form    action="#" id="form" encType="multipart/form-data">
                                <input hidden  ref={fileInput} onClick={getImage}
                                type="file" id="camera" accept="image/*" capture />
                                </form>
                         
                        
                        </button>
                </div>   
           
            </div>            
            <MiniDisplay gps={gps} />
            
        </div>
        
    </>

    )
}


//https://reactjs.org/docs/hooks-reference.html#useref
//https://medium.com/@PhilipAndrews/react-how-to-access-props-in-a-functional-component-6bd4200b9e0b
//https://aws.amazon.com/blogs/mobile/integrate-the-aws-sdk-for-javascript-into-a-react-app/
//https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_federated-users.html
//https://intellipaat.com/community/15243/uploading-base64-encoded-image-to-amazon-s3-via-node-js
//https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging