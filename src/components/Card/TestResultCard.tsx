import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Icon, IconButton } from "@mui/material";
import { LoadStatus, IProfileId } from "../../reducers";
import { RootState } from "../../store";
import { ITestResult } from "../../interfaces/ITestResult";
import { Close } from "@mui/icons-material";
import { useProfileLoadStatus } from "../../reducers/profileReducer";
import { useUserId } from "../../reducers/authReducer";

interface TestResultCardProps {
    id: IProfileId;
    handleClickDelete?: ( id: IProfileId ) => void;
    highlightCharacter?: boolean;
};

function TestResultCard({ id, handleClickDelete, highlightCharacter = false }: TestResultCardProps) {

    const testResult: ITestResult = useSelector((state: RootState) => state.profile.data[id].data.testResult.data);
    const [ status, ] = useProfileLoadStatus(id, 'testResult');
    const userId = useUserId();

    useEffect(() => {
        console.log(`[TestResultCard]: status=${status}`);
    }, [status])

    return (
        status === LoadStatus.REST &&
        <div className={`card cardContainer relative flex flex-col`}>
            <div className={`px-8`}>
                {/* <LazyImage
                    src={getImgSrc('/result/tripCharacter', testResult.tripCharacter.id as string, FORMATPNG)}
                    alt={testResult.tripCharacter.name}
                /> */}
            </div>            
            <div className='absolute bottom-0 w-full flex flex-col p-4 card-text bg-white z-10'>
                    <h4>{id}</h4>                        
                <p className={highlightCharacter ? "animate-expandParagraph" : ""}>{`${testResult.tripCharacter.prefix} ${testResult.tripCharacter.name}`}</p>
                <div className='flex flex-wrap gap-1 pt-2'>
                    {testResult.tripTagList?.map((tag) => <div key={tag} className="chip bg-gray-300"><p>{tag}</p></div>)}
                </div>
            </div>            
            {
                ( id === userId ) 
                ? <div className='absolute top-2 right-2 center flex-col z-20'>
                    <span className="material-icons">star</span>
                    {/* <p>{ meString }</p> */}
                </div>
                : ( 
                    handleClickDelete 
                    && <IconButton onClick={ ()=>handleClickDelete(id) } className={`absolute top-2 right-2`}>
                        <Close/>
                    </IconButton>  
                )
            }
        </div>
    );
}

export default TestResultCard;