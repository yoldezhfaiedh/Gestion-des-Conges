"use client"
import { SyntheticEvent, useState } from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from '../../../views/InterfaceAdmin/EditUser'
import Liste from '../../../views/InterfaceAdmin/ListUsers'
import UserManipulation from '../../../views/InterfaceAdmin/Activite_users'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import Ajout_users from 'src/views/InterfaceAdmin/Ajout_users'
import InfoPerso from 'src/views/Information_personnelles/info_perso'
import ChangePassword from 'src/views/Information_personnelles/Change_password'
// import Navigation from '../@core/layouts/components/vertical/navigation'

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

const Profil = () => {
  // ** State
  const [value, setValue] = useState<string>('InfoPerso')

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
            value='InfoPerso'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Informations Personnelles</TabName>
              </Box>
            }
          />
          {/* <Tab
            value='ChangePassword'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>ChangePassword</TabName>
              </Box>
            }
          /> */}
            
      
         
        </TabList>

        <TabPanel sx={{ p: 0 }} value='InfoPerso'>
          <InfoPerso userId={undefined}/>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='ChangePassword'>
          <ChangePassword />
          </TabPanel>

     
       
      </TabContext>
    </Card>
  )
  
}

export default Profil