import { ChangeEvent, useContext, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Button, Checkbox, Icon, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, TextField, Toolbar } from '@mui/material';
import { Close, Done, QuestionMark, Search, Warning } from '@mui/icons-material';


import { AppDispatch } from '../../store';
import { LoadStatus } from '../../reducers';
import { IProfile, useProfileIdList } from '../../reducers/profileReducer';

import { useStrings } from '../../texts';
import { addFlagged, asyncSearchProfile, deleteFlagged, resetSearch, useAddProfiles, useFlaggedProfileList, useSearchedProfileList, useProfileSearchStatus } from '../../reducers/profileSearchReducer';
import AppBarContext from '../../contexts/AppBarContext';
import { useNavigate } from 'react-router-dom';
import { useUserId } from '../../reducers/authReducer';
import { ProfileAvatar } from '../../components/Avatar/ProfileAvatar';


interface AddFriendContentProps {
    handleSucess?: () => void,
};

function AddFriendContent({ handleSucess }: AddFriendContentProps) {

    const strings = useStrings().public.contents.chemistry.addFriend;
    const commonStrings = useStrings().public.common;

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

    /* States */
    const [input, setInput] = useState(""); /* AutoComplete에 사용자가 입력한 값 */
    const flaggedProfileList = useFlaggedProfileList();
    const flaggedProfileListLength = Object.keys(flaggedProfileList).length;
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const { show: showAppBar, setShow: setShowAppBar } = useContext(AppBarContext);

    /* Reducers */
    const profileSearchResultList = useSearchedProfileList();
    const [ profileSearchtatus ] = useProfileSearchStatus();
    const idList = useProfileIdList();
    const addusers = useAddProfiles();
    const userId = useUserId();

    /* Event Handlers */
    const handleCloseButtonClick = () => {
        if (flaggedProfileListLength > 0) {
            setIsConfirmModalOpen(true);
        }
        else {
            navigate('/chemistry');
        }
    }

    const handleAddFriendAndClose = () => {
        addusers();
        navigate('/chemistry');
    }
    const handleClose = () => {
        navigate('/chemistry');
    }

    const handleToggle = (profile: IProfile) => {
        if (Object.keys(flaggedProfileList).includes(profile.id)) {
            dispatch(deleteFlagged(profile.id));
        }
        else {
            dispatch(addFlagged(profile));
        }
    }

    const handleConfirmSuccess = () => {
        handleSucess && handleSucess();
        // dispatch(endSearch(idToSearch));
    };
    const handleConfirmMissFail = () => {
        // dispatch(endSearch(idToSearch));

    };

    /* Side Effects */
    useEffect(() => {
        setShowAppBar(false);
        dispatch(resetSearch());
        return (() => {
            setShowAppBar(true);
        })
    }, []);

    useEffect(() => {
        if (input !== "") {
            dispatch(asyncSearchProfile(input));
        }
    }, [input, dispatch]);

    useEffect(() => {
        console.log(`[AddFriendContent] profileSearchtatus=${profileSearchtatus}`)
    }, [profileSearchtatus])

    const FlaggedProfileAvatarGroup = () =>
        <Stack>
            {
                Object.values(flaggedProfileList).map((profile) => (
                    <ProfileAvatar key={profile.nickname} {...profile} />
                ))
            }
        </Stack>

    return (
        (!showAppBar) &&
        <div className="page fullscreen flex">
            {
                isConfirmModalOpen ?
                    <div className='block--with-margin block__body block--centered flex-grow'>
                        <h3 className='typography-label'>{`${flaggedProfileListLength}명을 친구로 추가할까요?`}</h3>
                        <FlaggedProfileAvatarGroup />
                        <Stack>
                            <Button onClick={handleAddFriendAndClose} startIcon={<Done />}>
                                친구로 추가하기
                            </Button>
                            <Button onClick={handleClose} startIcon={<Close />}>
                                그냥 닫기
                            </Button>
                        </Stack>
                    </div>
                    :
                    <>
                        <Toolbar>
                            <IconButton onClick={handleCloseButtonClick}>
                                <Close />
                            </IconButton>
                            <Button
                                disabled={flaggedProfileListLength === 0}
                                onClick={handleAddFriendAndClose}
                                variant='text'
                                className=""
                                startIcon={<Done />}
                            >
                                <p>
                                    {
                                        `확인${flaggedProfileListLength > 0 ? ` (${flaggedProfileListLength}명 일행으로 추가하기)` : ''}`
                                    }
                                </p>
                            </Button>
                        </Toolbar>
                        <div className='block--with-margin flex-grow block__body flex'>
                            <TextField
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setInput(event.target.value);
                                }}
                                placeholder={strings.searchFormPlaceholder}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    )
                                }}
                                sx={{ width: "100%" }}
                            />
                            <FlaggedProfileAvatarGroup />
                            {
                                profileSearchtatus === LoadStatus.FAIL
                                    ?
                                    <div className='flex-grow body--centered'>
                                        <Warning />
                                        <h4>{commonStrings.error.connect}</h4>
                                        <p>{commonStrings.error.contact}</p>
                                        <Stack>
                                            <Icon>{commonStrings.contact.icon}</Icon>
                                            <p>{commonStrings.contact.mail}</p>
                                        </Stack>
                                    </div>
                                    :
                                    (input !== "") && (profileSearchResultList.length === 0) ?
                                        <div className='flex-grow body--centered'>
                                            <QuestionMark />
                                            <p>사용자를 찾을 수 없어요. <br /> 아이디를 다시 확인해볼까요?</p>
                                        </div>
                                        :
                                        <>
                                            <div>
                                                <List>
                                                    {
                                                        profileSearchResultList.map((profile) => (
                                                            <ListItem
                                                                key={profile.id}
                                                                disablePadding
                                                                secondaryAction={
                                                                    <div style={{ marginRight: "16px", }}>
                                                                        {
                                                                            (profile.id === userId)
                                                                                ?
                                                                                <p className='disabled'>나</p>
                                                                                :
                                                                                idList.includes(profile.id)
                                                                                    ?
                                                                                    <p className='disabled'>이미 추가되었어요</p>
                                                                                    : <Checkbox
                                                                                        edge="end"
                                                                                        checked={Object.keys(flaggedProfileList).includes(profile.id)}
                                                                                    />
                                                                        }
                                                                    </div>
                                                                }
                                                            >
                                                                <ListItemButton disableGutters onClick={() => handleToggle(profile)} disabled={idList.includes(profile.id)} style={{ zIndex: 2 }}>
                                                                    <ListItemAvatar>
                                                                        <ProfileAvatar {...profile} showLabel={false} />
                                                                    </ListItemAvatar>
                                                                    <ListItemText primary={profile.nickname} secondary={profile.nickname} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        ))
                                                    }
                                                </List>
                                            </div>
                                        </>
                            }
                        </div>
                    </>
            }
        </div>
    );
}

export default AddFriendContent;