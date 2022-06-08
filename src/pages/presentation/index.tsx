import { TittleContainer, TittleWarpper } from "./style";

import tetris from "../../assets/blocks-tetris.svg"
export function Presentation(){



    return(
        <>
           <TittleContainer> 
           <img  src={tetris}/>
               <TittleWarpper>
               <h2 style={{color:'white', fontSize:'5em'}}>
                   JOAO
               </h2>
               <h3 style={{color:'white', fontSize:'2.5em'}}>
                   Corretor automatico de código <br/> em blocos
                </h3>

               </TittleWarpper>
               <img style={{transform:'rotate(0.5turn)'}} src={tetris}/>
            </TittleContainer> 
               
        
        </>
    );
}