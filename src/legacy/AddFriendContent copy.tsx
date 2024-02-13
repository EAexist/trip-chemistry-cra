// import { ChangeEvent, Fragment, useCallback, useContext, useEffect, useState } from 'react';

// import { useDispatch } from 'react-redux';
// import { Autocomplete, Avatar, Button, CircularProgress, Icon, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, TextField, Toolbar } from '@mui/material';
// import { Add, AddCircleOutline, Done, NavigateBefore, PersonAdd, QuestionMark, Search, Warning } from '@mui/icons-material';


// import { AppDispatch } from '../../store';
// import { LoadStatus, IProfileId } from '../../reducers';
// import { setProfile, asyncGetTestResult, endSearch, startSearch, useFindUser, useSearchStatus, useProfileList } from '../../reducers/profileReducer';

// import { useStrings } from '../../texts';
// import useHandleLoadSuccess from '../../hooks/useHandleLoadSuccess';
// import AsyncAutoComplete from '../../components/AsyncAutoComplete';
// import { asyncSearchProfile, useSearchedProfileList } from '../../reducers/profileSearchReducer';
// import AppBarContext, { useSetAppBar } from '../../contexts/AppBarContext';
// import { useNavigate } from 'react-router-dom';

// const userId = useUserId();

// interface AddFriendContentProps {
//     handleSucess?: () => void,
// };

// function AddFriendContent({ handleSucess }: AddFriendContentProps) {

//     const strings = useStrings().public.contents.chemistry.sections.addFriend;
//     const navigate = useNavigate();

//     /* States */
//     const [input, setInput] = useState(''); /* AutoComplete에 사용자가 입력한 값 */
//     const [open, setOpen] = useState(false);

//     /* Reducers */
//     const profileSearchResultList = useSearchedProfileList();
//     const idList = useProfileList();
//     const [loadStatus, setStatus] = useSearchStatus(input);
//     const status = loadStatus ? loadStatus : LoadStatus.REST;

//     const findUser = useFindUser();
//     const dispatch = useDispatch<AppDispatch>(); /* Using useDispatch with createAsyncThunk. https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete */

//     const [showRedundancyWarning, setShowRedundancyWarning] = useState<boolean>(false);
//     const handleClickConfirmRedundancyWarning = () => setShowRedundancyWarning(false);



//     /* Event Handlers */
//     const handleBeforeClick = () => {
//         navigate('/chemistry');
//     }
//     const handleAdd = (id: IProfileId) => {
//         dispatch(setProfile(id));
//         dispatch(asyncGetTestResult(id));
//     }
//     const handleConfirmSuccess = () => {
//         handleSucess && handleSucess();
//         // dispatch(endSearch(idToSearch));
//     };
//     const handleConfirmMissFail = () => {
//         // dispatch(endSearch(idToSearch));

//     };

//     const { show: showAppBar, setShow: setShowAppBar } = useContext(AppBarContext);

//     const successToRestSecond = useHandleLoadSuccess({ status, setStatus, handleSuccess: handleConfirmSuccess, delay: 3000 });


//     /* Side Effects */
//     useEffect(() => {
//         setShowAppBar(false);
//     }, [])

//     useEffect(() => {
//         dispatch(asyncSearchProfile(input));
//     }, [ dispatch, input ]);

//     return (
//         (!showAppBar) &&
//         <div className="page fullscreen content__body content__body--gray ">
//             <div className='body--padding-y'>
//                 <Stack className='stack--full'>
//                     <IconButton onClick={handleBeforeClick}>
//                         <NavigateBefore />
//                     </IconButton>
//                     <Autocomplete
//                         id="searchUser"
//                         freeSolo
//                         open={open}
//                         onOpen={() => {
//                             setOpen(true);
//                         }}
//                         onClose={() => {
//                             setOpen(false);
//                         }}
//                         options={[]}
//                         // loading={loading}
//                         filterOptions={(x) => x}
//                         renderInput={(params) => (
//                             <TextField
//                                 {...params}
//                                 onChange={(event: ChangeEvent<HTMLInputElement>) => {
//                                     setInput(event.target.value);
//                                 }}
//                                 placeholder={strings.searchFormPlaceholder}
//                                 InputProps={{
//                                     ...params.InputProps,
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <Search />
//                                         </InputAdornment>
//                                     ),
//                                     endAdornment: (
//                                         <Fragment>
//                                             {/* {loading ? <CircularProgress color="inherit" size={20} /> : null} */}
//                                             {params.InputProps.endAdornment}
//                                         </Fragment>
//                                     ),
//                                 }}
//                             />
//                         )}
//                         sx={{ flexGrow: 1 }}
//                     />
//                 </Stack>
//                 {profileSearchResultList.map(({ id, tripCharacterId }) => (
//                     <ListItemButton onClick={() => handleAdd(id)} disabled={id in idList}>
//                         <ListItemAvatar>
//                             <Avatar />
//                         </ListItemAvatar>
//                         <ListItemText primary={id} />
//                     </ListItemButton>
//                 ))
//                 }
//                 {
//                     // showRedundancyWarning ?
//                     //     <>
//                     //         <Icon>warning</Icon>
//                     //         <p className="text-center">{input}님은<br />이미 친구로 추가되었어요!</p>
//                     //     </>
//                     //     :
//                     (() => {
//                         switch (status) {
//                             case LoadStatus.REST:
//                                 return (
//                                     <>
//                                         <ListItem className='list-item--md'>
//                                             <ListItemText>
//                                             </ListItemText>
//                                         </ListItem>
//                                         <Button variant='contained'>
//                                             <p>{strings.add}</p>
//                                         </Button>
//                                     </>
//                                 )
//                             case LoadStatus.PENDING:
//                                 return (
//                                     <>
//                                         <ListItem className='list-item--md'>
//                                             <ListItemAvatar>
//                                                 <Avatar />
//                                             </ListItemAvatar>
//                                             <ListItemText>
//                                                 <p className="load__warning">{input}님을 일행으로 추가했어요.</p>
//                                                 {(successToRestSecond > 0) && <p className="text-center">{successToRestSecond}초 후 닫힘</p>}
//                                             </ListItemText>
//                                         </ListItem>
//                                         <Button onClick={handleConfirmSuccess} variant='contained'>
//                                             <CircularProgress />
//                                             {/* <p>{strings.pending}</p> */}
//                                         </Button>
//                                     </>
//                                 )
//                             case LoadStatus.SUCCESS:
//                                 return (
//                                     <>
//                                         <ListItem className='list-item--md'>
//                                             <ListItemAvatar>
//                                             </ListItemAvatar>
//                                             <ListItemText>
//                                                 <p className="load__warning">{input}님을 일행으로 추가했어요.</p>
//                                                 {(successToRestSecond > 0) && <p className="text-center">{successToRestSecond}초 후 닫힘</p>}
//                                             </ListItemText>
//                                         </ListItem>
//                                         <Button onClick={handleConfirmSuccess} variant='contained'>
//                                             <p>{strings.confirm}</p>
//                                         </Button>
//                                     </>
//                                 )
//                             case LoadStatus.FAIL:
//                                 return (
//                                     <>
//                                         <ListItem className='list-item--md'>
//                                             <ListItemText>
//                                                 <div className='body--center'>
//                                                     <p style={{}}>지금 서버에 연결할 수 없어요.<br />잠시 후 다시 시도해주세요.</p>
//                                                     <Warning />
//                                                 </div>
//                                             </ListItemText>
//                                         </ListItem>
//                                         <Button onClick={handleConfirmMissFail} variant='contained'>
//                                             <p>{strings.confirm}</p>
//                                         </Button>
//                                     </>
//                                 )
//                             case LoadStatus.MISS:
//                                 return (
//                                     <>
//                                         <ListItem className='list-item--md'>
//                                             <ListItemAvatar>
//                                                 <QuestionMark />
//                                             </ListItemAvatar>
//                                             <ListItemText>
//                                                 <p className="text-center">{input}님을 찾지 못했어요.<br />Id를 다시 확인해주세요.</p>
//                                             </ListItemText>
//                                         </ListItem>
//                                         <Button onClick={handleConfirmMissFail}>
//                                             <p>{strings.confirm}</p>
//                                         </Button >
//                                     </>
//                                 )
//                             default:
//                                 return <></>;
//                         }
//                     })()}
//             </div>
//         </div >
//     );
// }

// export default AddFriendContent;