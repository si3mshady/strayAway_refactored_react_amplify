import React from 'react'
import '../index.css';
import ButtonContainer from '../components/ButtonContainer'
import tld from '../images/tld.png'
export default function Mainframe() {

    const imgRef = React.useRef()
    return (
        <div className='mainframe'> 

            <div className="mainframe__imageframe">  

                <div className="mainframe__imageframe--image">

                        
                        <img className="thumbnail-gen" ref={imgRef} src={tld} id="img" alt="camera phone" /> 
                            

                </div>         

                <div className="mainframe__imageframe--form">
                
                    <form>
                    <input type="text"  class="mainframe__imageframe--form__input" name="incident-address" required id='incident' placeholder="Location of incident"/>
                    {/* <label for="incident" class="form__label">Incident</label> */}

                    <input type="text"  class="mainframe__imageframe--form__input" name="Description of animal" required id='animal-description' placeholder="Type of animal"/>
                    {/* <label for="animal-type" class="form__label">Type of animal</label> */}

                    <input type="text"  class="mainframe__imageframe--form__input" name="lastseen" required id='animal-lastseen' placeholder="Animal last seen"/>
                    {/* <label for="animal-type" class="form__label">Type of animal</label> */}



                    {/* CHECK BOXES */}
                    <div>
                    <h3>Type of Animal</h3>
                     <input type="checkbox" id="cat" name="cat" value="cat"/>
                    <label for="vehicle1">Cat</label>
                    <input type="checkbox" id="dog" name="dog" value="dog"/>
                    <label for="dog">Dog</label>
                    <input type="checkbox" id="livestock" name="livestock" value="livestock"/>
                    <label for="vehicle3">Livestock</label>
                    <input type="checkbox" id="wildlife" name="wildlife" value="wildlife"/>
                    <label for="vehicle3">Wildlife</label>
                


                    </div>
                   

                  



                

                    </form>                   
                            

                </div>  
            
            </div>            
            <ButtonContainer imgRef={imgRef} />
           
        </div>
    )
}
