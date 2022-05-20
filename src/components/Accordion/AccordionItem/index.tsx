import { Link } from "react-router-dom";
import { AccordionItemContainer } from "./style";
export interface Iitem {
    title: string;
    questions: any[] 
}
export interface IAccordionItem {
    item : Iitem;
    onClick?(): void;
    active? : boolean;
}

const AccordionItem = ({ active, item, onClick } :  IAccordionItem) => {

    return(
        <AccordionItemContainer active={active ?? false}>
            <h2 onClick={(e) => onClick && onClick()} >{item.title}</h2>
            <div className="body"> 
                { item.questions.map( (item) => {
                    return (
                        <div style={{ 
                        display:'flex', 
                        justifyContent:'space-between',
                        backgroundColor:'#E0E0E0',
                        padding: '10px 20px',
                        borderRadius:8,
                        marginBottom:10 }}>
                            {item?.title}
                            <Link to={`/editor/${item.id}`} style={{ display:'block' }}>aqui</Link>
                        </div>
                    )
                } ) }
            </div>
        </AccordionItemContainer>
    )
}
export default AccordionItem;