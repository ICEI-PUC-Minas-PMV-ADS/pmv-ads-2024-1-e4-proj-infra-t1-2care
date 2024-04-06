import * as React from 'react';
import { useTheme  } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProfessionalInfoForm from '../Forms/ProfessionalInfoForm';
import UnitInfoForm from '../Forms/UnitInfoForm';
import GeneralInfoForm from '../Forms/GeneralInfoForm';

export default function ProfileTab(props) {
    const theme = useTheme();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const profileTabscss = { backgroundColor: '#fff', borderRadius: '25px',}

    return (
        <Box sx={{ width: '100%', typography: 'body1' }} className='profileTabs' style={profileTabscss}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} centered variant="fullWidth">
                        <Tab label="Informações gerais" value="1" style={{ backgroundColor: theme.palette.primary}}/>
                        <Tab label={props.caregiver == true ? "Informações profissionais" : "Informações unitárias"} value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <GeneralInfoForm></GeneralInfoForm>
                </TabPanel>
                <TabPanel value="2">
                    {props.caregiver ?
                        <ProfessionalInfoForm></ProfessionalInfoForm> :
                        <UnitInfoForm></UnitInfoForm>}
                </TabPanel>
            </TabContext >
        </Box >
    );
}

// export default ProfileTab;