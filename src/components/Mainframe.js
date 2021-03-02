import React from 'react'
import Axios from 'axios'
import '../index.css';
import ButtonContainer from '../components/ButtonContainer'
import tld from '../images/tld.png'
export default function Mainframe() {
     const [formData, setFormData] = React.useState({})

     const handleSubmit = (event) => {
         event.preventDefault()        
         connectAnimalServices()
     }

     const connectAnimalServices = () => {         
          console.log('formdata')
          console.log(formData)    
        //   http://localhost:8080/311
    Axios.post('http://13.56.233.192:8080/311',formData).then(response => {
    
      console.log(response)
      console.log("launching script")
    })
  } 

    const imgRef = React.useRef()
    return (
        <div className='mainframe'> 

            <div className="mainframe__imageframe">  

                <div className="mainframe__imageframe--image">

                        
                        <img className="thumbnail-gen" ref={imgRef} src={tld} id="img" alt="camera phone" /> 
                            

                </div>         

                <div className="mainframe__imageframe--form">
                <form onSubmit={handleSubmit}>

                 {/* CHECK BOXES */}
                 <div>
                    <h3>Type of Animal</h3>
                     
                    <input onChange={(event) => setFormData({...formData,
                        [event.target.name]:event.target.value
                    })} type="radio" id="dog" name="animal" value="dog"/>
                    <label for="dog">Dog</label>                  
                    <input onChange={(event) => setFormData({
                        [event.target.name]:event.target.value
                    })} type="radio" id="wildlife" name="animal" value="wildlife"/>
                    <label for="wildlife">Wildlife</label>
                    </div>

                <div>
                    <h3>What type of action is being reported?</h3>
                     
                    <input
                    onChange={(event) => setFormData({...formData,
                        [event.target.name]:event.target.value
                    })}
                     type="radio" id="loose-animal" name="reportOf" value="loose-animal"/>
                    <label for="loose-animal">Loose agressive animal</label>                  
                    <input onChange={(event) => setFormData({...formData,
                        [event.target.name]:event.target.value
                    })}
                     type="radio" id="wildlife" name="reportOf" value="wildlife"/>
                    <label for="wildlife">Pack of agressive animals</label>
                 </div>
                
                 
                    <input type="text" onChange={(event) => setFormData({...formData,
                        [event.target.name]:event.target.value
                    })}  class="mainframe__imageframe--form__input" name="incidentAddress" required id='incident' placeholder="Location of incident"/>
                    {/* <label for="incident" class="form__label">Incident</label> */}

                    <input type="text"  onChange={(event) => setFormData({...formData,
                        [event.target.name]:event.target.value
                    })} class="mainframe__imageframe--form__input" name="animalDescription" required id='animal-description' placeholder="Description of animal"/>
                    {/* <label for="animal-type" class="form__label">Type of animal</label> */}

                    <input type="text" onChange={(event) => setFormData({...formData,
                        [event.target.name]:event.target.value
                    })}  class="mainframe__imageframe--form__input" name="animalLastseen" required id='animal-lastseen' placeholder="Animal last seen"/>
                    {/* <label for="animal-type" class="form__label">Type of animal</label> */}

                

                    <input type="text"  onChange={(event) => setFormData({...formData,
                        [event.target.name]:event.target.value
                    })} class="mainframe__imageframe--form__input" name="animalCount" required id='animal-count' placeholder="Number of Animals" />
                   

                 <div> 
                 <h3>Contact Information</h3>

                 <input type="text"  onChange={(event) => setFormData({...formData,
                        [event.target.name]:event.target.value
                    })} class="mainframe__imageframe--form__input" name="fname" required id='name' placeholder="First Name" />


                <input type="text"  onChange={(event) => setFormData({...formData,
                        [event.target.name]:event.target.value
                    })} class="mainframe__imageframe--form__input" name="lname" required id='name' placeholder="Last Name" />

                
                <input type="text"  onChange={(event) => setFormData({...formData,
                        [event.target.name]:event.target.value
                    })} class="mainframe__imageframe--form__input" name="email" required id='name' placeholder="Email" />   
                   
               

                 <input type="text"  onChange={(event) => setFormData({...formData,
                        [event.target.name]:event.target.value
                    })} class="mainframe__imageframe--form__input" name="phone" required id='name' placeholder="Phone Number" />   
               

               </div> 
                   <button type="submit">Submit</button>
                

                    </form>                   
                            

                </div>  
            
            </div>            
            <ButtonContainer imgRef={imgRef} />
           
        </div>
    )
}
