import React, { useState } from "react";
import { AppBar, Tabs, Tab, Toolbar, Typography, Box } from "@mui/material";



const AppBarWithTabs = () => {
    const [value, setValue] = useState(0);
    const [greeting, setGreeting] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 1) {
            setGreeting("Hello World!");
        } else {
            setGreeting("");
        }
    };


    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Simple Todo App
                    </Typography>
                    <Tabs value={value} onChange={handleChange} textColor="inherit" >
                        <Tab label="TODO" />
                        <Tab label="Home" />
                    </Tabs>
                </Toolbar>
            </AppBar>
            <Box sx={{ padding: 2 }}>
                {greeting && <Typography variant="h5">{greeting}</Typography>}
            </Box>
        </Box>
    );
};

export default AppBarWithTabs;