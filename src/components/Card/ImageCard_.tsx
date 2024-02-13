import { Card, CardProps, styled } from "@mui/material";

const ImageCard = styled( Card )<CardProps & { src? : string }>(( src ) => ({
    elevation: "6",  
    sx: {
        backgroundImage: src ? `url("${src}")` : undefined
    }
}));

// export default ImageCard;