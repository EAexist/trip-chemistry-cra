import { createTheme } from "@mui/material";

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        base: true;
    }
}

declare module '@mui/material/ToggleButton' {
    interface ToggleButtonPropsVariantOverrides {
        contained: true;
    }
}
const defaultTheme = createTheme();

export const theme = createTheme({
    palette: {
        primary: {
            main: '#FF7949',
            light: '#FFDDCF',
            contrastText: '#fff',
        },
        secondary: {
            main: '#fff'
        },        

    },
    typography: {
      fontFamily: [
        'Apple SD Gothic Neo', 
        'sans-serif'
      ].join(','),
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 2,
                color: "secondary",
                // color: "transparent",
            }
        },
        MuiDrawer: {
            defaultProps: {
                sx: {
                    zIndex: (theme) => theme.zIndex.appBar - 1,
                    // flexShrink: 0,
                }
            }
        },
        MuiStack: {
            defaultProps: {
                direction: 'row',
                alignItems: 'center',
                spacing: 1,
            }
        },
        MuiAvatar: {
            defaultProps: {
                sx: {
                    backgroundColor: (theme) => theme.palette.primary.light
                }
            }
        },
        MuiList: {
            defaultProps: {
                // disablePadding: true,
            }
        },
        MuiListItem: {
            defaultProps: {
                disableGutters: true,
                // disablePadding: true,
            }
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'base' },
                    style: {
                        padding: 0,
                        borderRadius: 0,
                        height: 'fit-content',
                    },
                },
            ],
        },
        MuiToolbar: {
            defaultProps: {
                disableGutters: true,
                variant: 'dense'
                // disablePadding: true,
            }
        },
        MuiAccordion: {
            defaultProps: {
                disableGutters: true,
                square: true,
                elevation: 0
                // disablePadding: true,
            }
        },
        // MuiToggleButton: {            
        //     // variants: [
        //     //     {
        //     //         props: { variant: 'contained' },
        //     //         style: {
        //     //             padding: 0,
        //     //             borderRadius: 0,
        //     //             height: 'fit-content',
        //     //         },
        //     //     },
        //     // ],
        //     styleOverrides: {
        //         root: ({ ownerState }) => ({
        //             padding: 0,
        //             borderRadius: 0,
        //             ...(
        //                 // ownerState.variant === 'contained' &&
        //                 ownerState.selected ? {
        //                 '&.MuiButtonBase-root, &.MuiButtonBase-root:hover': {
        //                     backgroundColor: defaultTheme.palette.primary.main,
        //                     color: `${defaultTheme.palette.secondary.main}`,
        //                     // color: `white`,
        //                 },                            
        //             } : {
        //                 '&.MuiButtonBase-root': {
        //                     border: `4px ${defaultTheme.palette.primary.main}`,
        //                     color: `${defaultTheme.palette.primary.main}`,
        //                 }
        //             }),
        //         }),
        //     },
        // }
    }
});
