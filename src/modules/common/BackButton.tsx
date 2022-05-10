import React from 'react';
import {Grid, Typography} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useNavigate} from "react-router-dom";

export const BackButton: React.FC = () => {
    const navigate = useNavigate()
    return (
        <Grid container style={{gap: 16, cursor: "pointer"}} onClick={() => navigate(-1)} alignItems="center">
            <ArrowBackIosIcon color="secondary"/>
            <Typography color="secondary">Back</Typography>
        </Grid>
    );
}

