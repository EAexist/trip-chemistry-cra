import { Button, IconButton, ToggleButton, ToggleButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";

interface ToggleIconButtonProps extends ToggleButtonProps {
    label: string;
    onChange: ((event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => void);
};

const ToggleIconButton = ({ label, children, ...muiToggleButtonProps }: PropsWithChildren<ToggleIconButtonProps>) => (
    <Button onClick={( event ) => muiToggleButtonProps.onChange( event, muiToggleButtonProps.value )} className="toggle-icon-button">
        <ToggleButton {...muiToggleButtonProps} >
            {children}
        </ToggleButton>
        <h6 className="toggle-icon-button__label">{label}</h6>
    </Button>
)
export default ToggleIconButton;