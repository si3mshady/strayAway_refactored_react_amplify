
import React, {useRef} from 'react'
import '../index.css';
import $ from 'jquery'
import Axios from 'axios'
import MiniDisplay from './MiniDisplay'
import AWS from 'aws-sdk';
import ReverseGeocode from 'reverse-geocode';




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
    const [labels, setLabels] =  React.useState([])
    const [reverseGeoLocation, setReverseGeoLocation] =  React.useState({})
    const [clicked, setButtonClicked ] = React.useState(false)
    const [gpsHistory, updateGPSHistory] =  React.useState([...gps]) // spread operator only works on iterables        
    const [s3Bucket] = React.useState("deployments-si3mshady")
        
   
    var rekognition = new AWS.Rekognition()
    

    const handleGeoLocation = (event) => {

        setGPS([{ latitude:event.coords.latitude,  longitude:event.coords.longitude,
          accuracy:event.coords.accuracy, timestamp: new Date().toISOString() }])  }

    const trackHistory = () => {
            updateGPSHistory(prev => ([ ...prev,...gps])) //create new array with new & previous elements
            console.log(gpsHistory)
          }

        
    
  React.useEffect(() => {
    // const result = ReverseGeocode.lookup(gps.latitude, gps.longitude, 'us')    
    // setReverseGeoLocation(result)  
    setReverseGeoLocation((ReverseGeocode.lookup(gps[0].latitude, gps[0].longitude, 'us')))
    console.log('Print GPS')
  },[gps]) 
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

  }, [gps, labels])
 
  const connectAnimalServices = () => {
    //http://server:32000
    // Axios.get('http://54.67.117.237:32000/311')
   
    // Axios.get('http://server:32000/311')
    // Axios.get('http://server:8080/311':32000)
    // Axios.get('http://server:8080/311')
     Axios.get('http://localhost:32000/311')


    
    .then(response => {
      console.log(response)
      console.log("launching script")
    })
  }
 
  const analyze_image = (bufferedBase64Data) => {      
   const params = {Image: { Bytes: bufferedBase64Data }}

    rekognition.detectLabels(params, function(err, data) {
      if (err) console.log(err); // an error occurred
      
      else    {
        const narrowList = data.Labels.slice(0,3)
        console.log(data)
        console.log(narrowList)
        setLabels(narrowList)      
      
      } }

    
  )
  }


   const getImage =  () => {
        $("#camera").on("change", (event) => {
          const newImageFile = event.target.files[0]
          sendToS3(newImageFile)
          console.log('newImagevariable', newImageFile.name)
          
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


    const buf =  Buffer.from(reader.result.replace(/^data:image\/\w+;base64,/, ""),'base64')
    analyze_image(buf) // 

    var data = {

      Key: file.name, 
    
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
                        <button onClick={() => ( $('input').click(), setButtonClicked(!clicked), trackHistory(), connectAnimalServices() ) }  className="theGlow" >
                            
                        <i class="fas fa-camera"></i>

                            <form    action="#" id="form" encType="multipart/form-data">
                                <input hidden  ref={fileInput} onClick={getImage}
                                type="file" id="camera" accept="image/*" capture />
                                </form>                        
                        </button>
                </div>   
                <MiniDisplay 
                gps={gps} reverseGeoLocation={reverseGeoLocation}
                labels={labels}
                 />
            </div>            
            
            
        </div>
        
    </>

    )
}
////////////
//https://stackoverflow.com/questions/52165333/deprecationwarning-buffer-is-deprecated-due-to-security-and-usability-issues/52165509
//https://reactjs.org/docs/hooks-reference.html#useref
//https://medium.com/@PhilipAndrews/react-how-to-access-props-in-a-functional-component-6bd4200b9e0b
//https://aws.amazon.com/blogs/mobile/integrate-the-aws-sdk-for-javascript-into-a-react-app/
//https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_federated-users.html
//https://intellipaat.com/community/15243/uploading-base64-encoded-image-to-amazon-s3-via-node-js
//https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging