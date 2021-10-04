import React,{createContext,useReducer,useContext} from "react";
export const StateContent=createContext({});
const StateProvider=({reducer,initialState,children})=>{
    return(
    <StateContent.Provider value={useReducer(reducer,initialState)}>
          {children}
    </StateContent.Provider>
    );
}

export const useStateValue=()=>{
    return useContext(StateContent);
}
export default StateProvider