/* React */
import { useCallback, useContext, useEffect, useState } from "react";

/* React Packages */
import { Done } from "@mui/icons-material";
import { Button, Toolbar } from "@mui/material";

/* Trip Chemistry */
import { useSelector } from "react-redux";
import { USER } from "../../common/app-const";
import AppBarContext from "../../contexts/AppBarContext";
import useSetNickname from "../../hooks/useSetNickname";
import { RootState } from "../../store";
import TextFieldBlock from "./TextFieldBlock";
import { useUserInfo } from "../../reducers/authReducer";

interface SetNicknamePageProps {
    handleClose: () => void;
    doRequireInitialization?: boolean;
};

function SetNicknamePage({ 
    handleClose,
    doRequireInitialization
 }: SetNicknamePageProps) {

    /* Hooks */
    const setNickname = useSetNickname();

    /* Reducers */
    const { nickname : currentNickname } = useUserInfo();
    const authProviderNickname = useSelector((state: RootState) => state.auth.data.profile.authProviderNickname)

    /* States */
    const [ value, setValue ] = useState( currentNickname ? currentNickname : ( authProviderNickname ? authProviderNickname : "" ) );
    const { setShow: setShowAppBar } = useContext(AppBarContext);
    const isInputAllowed = value.length > 0

    /* Event Handlers */
    const handleConfirm = ( value: string) => {
        setNickname(value);
    }
    const getIsConfirmAllowed = useCallback (( value: string ) => (
        !doRequireInitialization && ( value === currentNickname )
    ), [ doRequireInitialization, currentNickname ]);

    const getIsValueAllowed = useCallback (( value: string ) => (
        value.length <= USER.maxNicknameLength
    ), [ USER.maxNicknameLength ]);

    const helperText = useCallback (( value: string ) => (
        `${value.length}/${USER.maxNicknameLength}`
    ), [ USER.maxNicknameLength ]);

    /* Side Effects */
    useEffect(() => {
        setShowAppBar(false);
        return (() => {
            setShowAppBar(true);
        })
    }, []);

    return (
        <div className="page fullscreen flex">
            <Toolbar>
                <Button
                    onClick={handleClose}
                >
                    취소
                </Button>
                <Button
                    disabled={ !isInputAllowed || getIsConfirmAllowed(value) }
                    onClick={ ()=>handleConfirm(value) }
                    variant='text'
                    className=""
                    startIcon={<Done />}
                >
                    확인
                </Button>
            </Toolbar>
        <TextFieldBlock
            value={ value }
            setValue={ setValue }
            getIsValueAllowed={ getIsValueAllowed }
            helperText={ helperText }
            title={ "사용할 이름을 입력해주세요." }
            className="block--with-margin-x"
        />
        </div>
    );
}
export default SetNicknamePage;