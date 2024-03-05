import { ChangeEvent, useContext, useEffect, useState } from 'react';

import { Close, Done, QuestionMark, Search, Warning } from '@mui/icons-material';
import { Button, Checkbox, Icon, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, TextField, Toolbar } from '@mui/material';
import { useDispatch } from 'react-redux';


import { LoadStatus } from '../../reducers';
import { AppDispatch } from '../../store';

import { useNavigate } from 'react-router-dom';
import AppBarContext from '../../contexts/AppBarContext';
import { IProfile } from '../../interfaces/IProfile';
import { useUserId } from '../../reducers/authReducer';
import { clearChemistry } from '../../reducers/chemistryReducer';
import { addFlagged, asyncSearchProfile, deleteFlagged, resetSearch, useAddProfiles, useFlaggedProfileList, useProfileSearchStatus, useSearchedProfileList } from '../../reducers/profileSearchReducer';
import { useProfileIdList } from '../../reducers/tripReducer';
import { useStrings } from '../../texts';
import ProfileAvatar from '../../components/Avatar/ProfileAvatar';


interface SearchAndInviteFriendContentProps {
    handleSucess?: () => void,
};

function SearchAndInviteFriendContent({ handleSucess }: SearchAndInviteFriendContentProps) {

    /* Constants */
    const strings = useStrings().public.contents.chemistry.addFriend;
    const commonStrings = useStrings().public.common;

    /* Hooks */
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
            navigate('../');
        }
    }

    const handleAddFriendAndClose = () => {
        dispatch( clearChemistry() );
        addusers();
        navigate('../');
    }
    const handleClose = () => {
        navigate('../');
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
        console.log(`[SearchAndInviteFriendContent] profileSearchtatus=${profileSearchtatus}`)
    }, [profileSearchtatus])

    const FlaggedAvatarProfileGroup = () =>
        <Stack>
            {
                Object.values(flaggedProfileList).map((profile) => (
                    <ProfileAvatar key={profile.nickname} {...profile} labelSize="lg" />
                ))
            }
        </Stack>

    return (
        (!showAppBar) &&
        <div className="page fullscreen flex">
            {
                isConfirmModalOpen 
                    ?
                    <div className='block--with-margin block__body body--centered flex-grow'>
                        <h3 className='typography-label'>{`${flaggedProfileListLength}명을 친구로 추가할까요?`}</h3>
                        <FlaggedAvatarProfileGroup />
                        <Stack spacing={4}>
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
                            <IconButton 
                                edge="start"
                                onClick={handleCloseButtonClick}
                            >
                                <Close />
                            </IconButton>
                            <Button
                                disabled={flaggedProfileListLength === 0}
                                onClick={handleAddFriendAndClose}
                                variant='text'
                                className=""
                                startIcon={<Done />}
                            >
                                {
                                    `확인${flaggedProfileListLength > 0 ? ` (${flaggedProfileListLength}명 일행으로 추가하기)` : ''}`
                                }
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
                            <FlaggedAvatarProfileGroup />
                            {
                                profileSearchtatus === LoadStatus.FAIL
                                    ?
                                    <div className='flex-grow body--centered block__body'>
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
                                            <p>사용자를 찾을 수 없어요. <br /> 친구의 닉네임과 태그를 다시 확인해주세요.</p>
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
                                                                                <p className='typography-note disabled'>나</p>
                                                                                :
                                                                                idList.includes(profile.id)
                                                                                    ?
                                                                                    <p className='typography-note disabled'>이미 추가되었어요</p>
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
                                                                        <ProfileAvatar characterId={profile.testResult? profile.testResult.tripCharacter.id : undefined} showLabel={false} />
                                                                    </ListItemAvatar>
                                                                    <ListItemText primary={profile.nickname} />
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

export default SearchAndInviteFriendContent;