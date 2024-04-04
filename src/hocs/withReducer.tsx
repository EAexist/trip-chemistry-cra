import { ComponentType, useEffect, useState } from "react";
import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { defaultReudcer, store } from "../store";

const withReducer = <T extends {}>(WrappedComponent: ComponentType<T>) =>
    (asyncReducer: { [key: string]: Reducer }) =>
        (props: T) => {

            const [isReducerInjected, setIsReducerInjected] = useState(false);

            /* Side Effects */
            useEffect(() => {
                const newRootReducer = combineReducers({                    
                    ...defaultReudcer,
                    ...asyncReducer
                })
                store.replaceReducer(newRootReducer)
                setIsReducerInjected(true)
            }, [])

            return (
                isReducerInjected &&
                <WrappedComponent {...props} />
            );
        }

export default withReducer