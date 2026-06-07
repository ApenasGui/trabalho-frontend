import { useState, useContext, createContext } from "react";

const ItemContext = createContext();

function ItemProvider({children}) {
    const [itens, setItens] = useState([]);
    const adicionarItem = (dados) => {
        setItens([...itens, dados]);
    }

    return (  
    <ItemContext.Provider value={{ itens, adicionarItem }}> 
        {children}
    </ItemContext.Provider>
    )
}

function useItem(){
    const context = useContext(ItemContext);
    if(!context){
        throw new Error("useItem deve ser usado dentro do ItemProvider")
    }
    return context;
}

export {useItem, ItemProvider};