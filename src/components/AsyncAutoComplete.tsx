
// import { ChangeEvent, Fragment, useEffect, useState } from 'react';

// import { Autocomplete, Avatar, InputAdornment, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from '@mui/material';
// import { Search } from '@mui/icons-material';

// import { useSearchedProfileList } from '../reducers/profileSearchReducer';
// import { IProfileId } from '../reducers';
// import { useProfileList } from '../reducers/profileReducer';


// interface AsyncAutoCompleteProps {
//     placeholder?: string
//     setValue?: (value: string) => void
//     handleAdd: (id: IProfileId) => void
// }
// function sleep(duration: number): Promise<void> {
//     return new Promise<void>((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, duration);
//     });
// }

// export default function AsyncAutoComplete({ placeholder, setValue = ()=>{}, handleAdd }: AsyncAutoCompleteProps) {
    
//     /* States */
//     const [ open, setOpen ] = useState(false);

//     /* Reducers */
//     const options = useSearchedProfileList();
//     const idList = useProfileList();

//     // const loading = open && options.length === 0;    
//     const loading = false;

//     /* SideEffects */
//     useEffect(() => {
//         let active = true;

//         if (!loading) {
//             return undefined;
//         }

//         (async () => {
//             await sleep(1e3); // For demo purposes.

//             if (active) {
//                 // setOptions([]);
//             }
//         })();

//         return () => {
//             active = false;
//         };
//     }, [loading]);

//     useEffect(() => {
//         if (!open) {
//             // setOptions([]);
//         }
//     }, [open]);

//     return (
//         <Autocomplete
//             id="searchUser"
//             // freeSolo
//             open={open}
//             onOpen={() => {
//                 setOpen(true);
//             }}
//             onClose={() => {
//                 setOpen(false);
//             }}
//             options={options}
//             loading={loading}
//             filterOptions={(x) => x}
//             renderInput={(params) => (
//                 <TextField
//                     {...params}
//                     onChange={(event: ChangeEvent<HTMLInputElement>) => {
//                         setValue ( event.target.value );
//                     }}
//                     placeholder = { placeholder }
//                     //   label="Asynchronous"
//                     InputProps={{
//                         ...params.InputProps,
//                         startAdornment: (
//                             <InputAdornment position="start" sx={{ width: '40px', display: 'flex' }}>
//                                 <Search />
//                             </InputAdornment>
//                         ),
//                         endAdornment: (
//                             <Fragment>
//                                 {/* {loading ? <CircularProgress color="inherit" size={20} /> : null} */}
//                                 {params.InputProps.endAdornment}
//                             </Fragment>
//                         ),
//                     }}
//                 />
//             )}
//             getOptionLabel={(option) => option.id}
//             renderOption={( props, { id, tripCharacterId } ) => (
//                 <ListItemButton onClick={() => handleAdd( id )} disabled={ id in idList }>
//                     <ListItemAvatar>
//                         <Avatar />
//                     </ListItemAvatar>
//                     <ListItemText primary={id} />
//                 </ListItemButton>
//             )}
//         />
//     );
// }