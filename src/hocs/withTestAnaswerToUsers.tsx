// import { ComponentType, useEffect } from "react";
// import { useValueToProfileIdList } from "../reducers/profileReducer";
// import { IProfileId } from "../reducers";
// import { TestIndex } from "../reducers/testAnswerReducer";


// interface withTestAnaswerToProfilesProps{
//     value: number;
//     idList: IProfileId[];
// };
// const withTestAnaswerToProfiles = <T extends withTestAnaswerToProfilesProps>( WrappedComponent: ComponentType<T> ) =>
//     ({ className, ...props } : Omit<T & TestIndex & { filter?: 'all' | 'odd' | 'even', isReversed?: boolean, className?: string }, keyof withTestAnaswerToProfilesProps> ) => {
        
//     const valueToProfileList = useValueToProfileIdList({ index: props.index, subIndex: props.subIndex });
//     const answers = Object.keys(useTestString({ index: props.index }).answers );

//     useEffect(()=>{
//         console.log(`[withTestAnaswerToProfiles] Mounting. testIndex=${props.index}/${props.subIndex}\n`);
//     }, []);
//     useEffect(()=>{
//         console.log(`[withTestAnaswerToProfiles] valueToProfileList updated\ntestIndex=${props.index}/${props.subIndex}\nvalueToProfileList=${JSON.stringify( valueToProfileList )}`);
//     }, [ valueToProfileList ]);

//     return(
//         <ul className={ className }>
//             {
//                 answers.map(( answer, index ) => (
//                     <li className="flex-1">
//                         <WrappedComponent {...{ 
//                             key: answer, 
//                             value: answer, 
//                             idList : Object.keys( valueToProfileList ).includes( answer ) ? valueToProfileList[answer] : [] 
//                         }} {...props as T}/>          
//                     </li>
//                 ))
//             }
//         </ul>
//     )}

// export default withTestAnaswerToProfiles;
// export type { withTestAnaswerToProfilesProps };
