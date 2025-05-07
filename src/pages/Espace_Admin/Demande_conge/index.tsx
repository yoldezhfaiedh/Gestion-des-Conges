// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import Icon from '@mdi/react';
import { mdiExitRun } from '@mdi/js';
import { mdiFileEditOutline } from '@mdi/js';
import { mdiNotePlus } from '@mdi/js';

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import LeaveRequest from 'src/views/Demande_Conge/Demande'
import AnnulationModificationConge from 'src/views/Demande_Conge/AnnulationModificationDemande'
import ModifierRequest from 'src/views/Demande_Conge/Modification'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState<string>('LeaveRequest')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='LeaveRequest'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
<Icon path={mdiNotePlus} size={1} />
                <TabName>Depot d'une demande de congé</TabName>
              </Box>
            }
          />
           <Tab
            value='AnnulationModificationConge'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
<Icon path={mdiFileEditOutline} size={1} />
                <TabName> Modifier la demande </TabName>
              </Box>
            }
          /> 
          
        </TabList> 

        <TabPanel sx={{ p: 0 }} value='LeaveRequest'>
          <LeaveRequest />
        </TabPanel>
         <TabPanel sx={{ p: 0 }} value='AnnulationModificationConge'>
          <AnnulationModificationConge />
        </TabPanel>
   
      </TabContext>
    </Card>
  )
}

export default AccountSettings
