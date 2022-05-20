import { useState } from "react";
import AccordionItem, { IAccordionItem, Iitem } from "./AccordionItem";
import { AccordionContainer } from "./style";


export interface IAccordionProps {
    onOpen?() : void;
    items: Iitem[] 
}
const Accordion = ({ items } : IAccordionProps) =>{
    const [clicked, setClicked] = useState<any>(null);
    const handleToggle = (index : any) => {
        if(clicked == index)
            return setClicked(null)
        setClicked(index);
    }
    return(
        <AccordionContainer >
            { items.map( (item, index) => {
                return <AccordionItem item={item} active={ clicked == index} onClick={() => { handleToggle(index) }}/>
            })}
        </AccordionContainer>
    )
}

export default Accordion;