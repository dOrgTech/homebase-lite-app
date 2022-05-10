import React from 'react';
import {Button, Divider, Grid, styled, Typography} from "@mui/material";
import {theme} from "../../../theme";

const PluginsContainer = styled(Grid)(({theme}) => ({
    background: theme.palette.primary.main,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
}));

export const Plugins: React.FC = () => {
    return (
        <PluginsContainer>
            <Grid item px={2} py={2}>
                <Typography variant={"body2"} color={theme.palette.text.secondary}>
                    Choices
                </Typography>
            </Grid>
            <Divider/>
            <Grid item px={1} py={1}>
                <Grid container justifyContent={"center"} alignItems={"center"} style={{gap: 10}}
                      py={1}>
                    <Button variant='contained' color='secondary'>
                        Add Plugin
                    </Button>
                </Grid>
            </Grid>
        </PluginsContainer>
    );
}
