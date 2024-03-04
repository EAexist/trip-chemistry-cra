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
const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#FF7949',
            light: '#FFDDCF',
            contrastText: '#fff',
        },
        secondary: {
            main: '#fff'
        },        

    }},
);

export const theme = createTheme({
    ...defaultTheme,
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
        MuiCard: {
            defaultProps: {
                elevation: 6,
            }
        },
        MuiCardContent: {
            defaultProps: {
                // sx: {
                //     padding: '12px',
                // }
            }
        },
        MuiDrawer: {
            defaultProps: {
                sx: {
                    zIndex: (theme) => theme.zIndex.appBar - 1,
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
                style: {
                    backgroundColor: defaultTheme.palette.primary.light
                }
            }
        },
        MuiAvatarGroup: {
            defaultProps: {
                style: {                 
                    // backgroundColor: defaultTheme.palette.primary.light
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
        MuiIconButton: {
            defaultProps: {
                size: "large"
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
