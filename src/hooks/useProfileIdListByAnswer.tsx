import { useEffect, useState } from "react";

import { IProfileId } from "../reducers";
import { TestIndex } from "../reducers/testAnswerReducer";
import { useTestAnswerObject } from "../reducers/profileReducer";

const useProfileIdListByAnswer = ( testIndex: TestIndex, answer: number ) => {

    const [ userList, setProfileList ] = useState< IProfileId[]>([] as  IProfileId[]);
    const [ ascendingOrder, setAscendingOrder ] = useState( -1 );
    const testAnswerObject = useTestAnswerObject( testIndex );

    /* Debug */
    useEffect(() => {
        console.log(`[useProfileIdListByAnswer]: testAnswerObject Updated\n testIndex=${JSON.stringify(testIndex)} testAnswerObject=${JSON.stringify(testAnswerObject)}`);

        let userListTemp: IProfileId[] = [];
        Object.entries( testAnswerObject ).forEach(([ id, userAnswer ]) => {
            if ( userAnswer === answer) {
                userListTemp.push( id )
            }
        });
        setProfileList(userListTemp);

        setAscendingOrder( Array.from(new Set( Object.values( testAnswerObject ) )).sort().indexOf( answer ) );
    }, [ testAnswerObject, answer ]);

    useEffect(()=>{
        console.log(`[useProfileIdListByAnswer] ${answer}/${Object.values( testAnswerObject )} ascendingOrder=${ascendingOrder}`);
    }, [ testAnswerObject, ascendingOrder ])

    return ({
        userList,
        ascendingOrder
    });
}

export default useProfileIdListByAnswer;