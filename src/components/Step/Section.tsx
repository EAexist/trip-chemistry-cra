// import { PropsWithChildren, useEffect } from "react";
// import { useSetStepCheckpoint } from "./StepCheckpointContext";

// interface scrollCheckpointProps{
//     id: string;
//     className?: string;
// };

// function Section({ id, children, className } : PropsWithChildren<scrollCheckpointProps>){

//     const { setCheckpoint, removeCheckpoint } = useSetStepCheckpoint( id );

//     useEffect(()=>{
//         return() => {
//             console.log(`[Section] Unmounting. id=${id}`)
//             removeCheckpoint();
//         }
//     }, [])

//     return(
//         <div ref={setCheckpoint} className={className}>
//             { children }
//         </div>
//     );
// }
// export default Section;