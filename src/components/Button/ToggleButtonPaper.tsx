import { Paper as MuiPaper, PaperProps, styled } from "@mui/material";

const ToggleButtonPaper = styled(MuiPaper)<PaperProps & { selected? : boolean, iselevated? : boolean, isDisabled?: boolean }>(({ iselevated = false, selected = false, isDisabled = false, theme }) => ({
    elevation: iselevated ? 5 : 0,
    opacity: isDisabled ? 0.4 : 1,
    ...{
        
        ...(
        selected ?
        {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main
        }
        :
        {
            border: `4px ${theme.palette.primary.main}`,
            color: theme.palette.primary.main
        }
    )}
}));

export default ToggleButtonPaper;
