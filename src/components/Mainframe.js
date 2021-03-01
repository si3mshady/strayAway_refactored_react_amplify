import React from 'react'
import Axios from 'axios'
import '../index.css';
import ButtonContainer from '../components/ButtonContainer'
import tld from '../images/tld.png'
export default function Mainframe() {

     const connectAnimalServices = (event) => {
          event.preventDefault()
          console.log('formdata')
          console.log(event)    
    const formData = {} 
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
                <form onSubmit={(event)=> {connectAnimalServices(event)}}>

                 {/* CHECK BOXES */}
                 <div>
                    <h3>Type of Animal</h3>
                     
                    <input type="radio" id="dog" name="animal" value="dog"/>
                    <label for="dog">Dog</label>                  
                    <input type="radio" id="wildlife" name="animal" value="wildlife"/>
                    <label for="wildlife">Wildlife</label>
                    </div>

                <div>
                    <h3>What type of action is being reported?</h3>
                     
                    <input type="radio" id="loose-animal" name="report" value="loose-animal"/>
                    <label for="loose-animal">Loose agressive animal</label>                  
                    <input type="radio" id="wildlife" name="report" value="wildlife"/>
                    <label for="wildlife">Pack of agressive animals</label>
                 </div>


                
                
                 
                    <input type="text"  class="mainframe__imageframe--form__input" name="incident-address" required id='incident' placeholder="Location of incident"/>
                    {/* <label for="incident" class="form__label">Incident</label> */}

                    <input type="text"  class="mainframe__imageframe--form__input" name="Description of animal" required id='animal-description' placeholder="Description of animal"/>
                    {/* <label for="animal-type" class="form__label">Type of animal</label> */}

                    <input type="text"  class="mainframe__imageframe--form__input" name="lastseen" required id='animal-lastseen' placeholder="Animal last seen"/>
                    {/* <label for="animal-type" class="form__label">Type of animal</label> */}



                   

                    <input type="text"  class="mainframe__imageframe--form__input" name="number of animals" required id='animal-count' placeholder="Number of Animals" />
                   

                  


                   <button type="submit">Submit</button>
                

                    </form>                   
                            

                </div>  
            
            </div>            
            <ButtonContainer imgRef={imgRef} />
           
        </div>
    )
}
