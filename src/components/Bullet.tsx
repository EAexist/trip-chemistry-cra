import { useTheme } from "@mui/material";

interface BulletProps extends React.HTMLAttributes<HTMLSpanElement>{

};

function Bullet( props : BulletProps ){

    const theme = useTheme();

    return(
        <span style={{ color: theme.palette.primary.main }} {...props}/>
    );
}
export default Bullet;