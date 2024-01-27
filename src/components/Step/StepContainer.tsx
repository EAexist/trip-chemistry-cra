import { PropsWithChildren, useCallback, useEffect, useState } from "react";

/* App */
import { useValueToBound } from "../../hooks/useValueToBound";
import { IdToIndex, useStepCheckpoint, useSetIdToIndex, withStepCheckpointContext } from "./StepCheckpointContext";
import { useSetSection, withStepContext } from "./StepContext";

interface StepContainerProps{
    idToIndex: IdToIndex;
};

function StepContainer({ idToIndex, children }: PropsWithChildren<StepContainerProps>) {

    const { stepCheckpointList } = useStepCheckpoint();
    useSetIdToIndex( idToIndex );

    const setSection = useSetSection(); /* 현재 step */

    const [ value, setValue ] = useState<number>(0);
    const [ activeCheckpointIndex, ] = useValueToBound({ 
        boundList: stepCheckpointList.current.filter((checkpoint) => (checkpoint.offsetTop !== null)).map(( checkpoint )=>{
            console.log("[StepContainer] CHECKPOINT");
            return( checkpoint.offsetTop-(window.innerHeight-(checkpoint.offsetParent as HTMLDivElement).offsetTop)/2 )
        }), 
        value: value,
        returnIndex: true, 
    }); 

    const handleScroll = useCallback((e: Event) => {
        // setActiveCheckpointIndex(window.scrollY);
        setValue( window.scrollY );
    }, [ setValue ]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); //clean up
        };
      }, [ handleScroll ]);

    useEffect(()=>{        
        console.log(`[StepContainer] window.scrollY=${window.scrollY} activeCheckpointIndex=${activeCheckpointIndex}`);
        setSection( activeCheckpointIndex as number );
    }, [ activeCheckpointIndex, setSection ]);

    useEffect(()=>{        
        console.log(`[StepContainer] idToIndex=${JSON.stringify(idToIndex)}`);
    }, [ idToIndex ]);

    useEffect(()=>{        
        console.log(`[StepContainer]  stepCheckpointList.current=${stepCheckpointList.current}`);

        stepCheckpointList.current.map((checkpoint, index)=>{
            console.log(`[StepContainer] checkpoints[${index}]=${checkpoint.offsetTop}`);
        })
    }, [ stepCheckpointList ]);

    return( children );
}

export default withStepContext(withStepCheckpointContext( StepContainer ));