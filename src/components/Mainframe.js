import React from 'react'
import '../index.css';
import ButtonContainer from '../components/ButtonContainer'
import MiniDisplay from '../components/MiniDisplay'
import tld from '../images/tld.png'
export default function Mainframe() {

    const imgRef = React.useRef()
    return (
        <div className='mainframe'> 

            <div className="mainframe__imageframe">  

                <div className="mainframe__imageframe--image">

                        
                        <img className="thumbnail-gen" ref={imgRef} src={tld} id="img" alt="camera phone" /> 
                            

                </div>         
            
            </div>            
            <ButtonContainer imgRef={imgRef} />
           
        </div>
    )
}
