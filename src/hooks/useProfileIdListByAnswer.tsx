import { useEffect, useState } from "react";

import { IProfileId } from "../reducers";
import { TestName } from "../reducers/testAnswerReducer";
import { useTestAnswerObject } from "../reducers/profileReducer";

const useProfileIdListByAnswer = ( testName: TestName, answer: number ) => {

    const [ userList, setProfileList ] = useState< IProfileId[]>([] as  IProfileId[]);
    const [ ascendingOrder, setAscendingOrder ] = useState( -1 );
    const testAnswerObject = useTestAnswerObject( testName );

    /* Debug */
    useEffect(() => {
        console.log(`[useProfileIdListByAnswer]: testAnswerObject Updated\n testName=${JSON.stringify(testName)} testAnswerObject=${JSON.stringify(testAnswerObject)}`);

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