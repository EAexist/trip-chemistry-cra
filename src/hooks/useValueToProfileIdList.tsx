import { useEffect, useState } from "react";

import { IProfileId } from "../reducers";
import { TestIndex } from "../reducers/testAnswerReducer";
import { useTestAnswerObject } from "../reducers/profileReducer";

interface IvalueToProfiles {[value: string] : IProfileId[]};

const useValueToProfileIdList = ( testIndex: TestIndex ) => {

    /* @TODO 완성 후 testAnswerDefault 제거 */
    // const testAnswerDefault = useSelector(( state:RootState )=>(state.testAnswer.data[testIndex.testName][testIndex.subTestName]));

    const [ valueToProfileList, setValueToProfileIdList ] = useState<IvalueToProfiles>({} as IvalueToProfiles);
    const testAnswerObject = useTestAnswerObject( testIndex );

    /* Debug */
    useEffect(() => {
        console.log(`[useValueToProfileIdList]: testAnswerObject Updated\n testIndex=${JSON.stringify(testIndex)} testAnswerObject=${JSON.stringify(testAnswerObject)}`);

        let valueToProfileListTemp: { [value: string]: IProfileId[] } = {};
        valueToProfileListTemp = {};

        Object.entries( testAnswerObject ).forEach(([id, value]) => {
            const value_ = value?.toString() as string;
            if (value_) {
                if (Object.keys(valueToProfileListTemp).includes(value_)) {
                    valueToProfileListTemp[value_].push(id);
                }
                else {
                    valueToProfileListTemp[value_] = [id];
                }
            }
        });

        setValueToProfileIdList(valueToProfileListTemp);

    }, [ testAnswerObject ]);
    
    useEffect(() => {
        console.log(`[useValueToProfileIdList]: valueToProfileList=${JSON.stringify(valueToProfileList)}}`);
    }, [ valueToProfileList ]);

    return ( valueToProfileList );
}


export default useValueToProfileIdList;