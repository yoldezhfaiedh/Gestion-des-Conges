"use client"
import { SyntheticEvent, useState } from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import { mdiAccountSupervisor } from '@mdi/js';

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import AccountGroup from 'mdi-material-ui/AccountGroup'

import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from '../../../views/InterfaceAdmin/EditUser'
import Liste_des_utilisateurs from '../../../views/InterfaceAdmin/ListUsers'
import UserManipulation from '../../../views/InterfaceAdmin/Activite_users'
import Icon from '@mdi/react';
import { mdiAccountGroup } from '@mdi/js';
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import Ajout_users from 'src/views/InterfaceAdmin/Ajout_users'
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

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState<string>('Liste_des_utilisateurs')

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
            value='Ajout_users'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Ajouter des utilisateurs</TabName>
              </Box>
            }
          />
          <Tab
            value='Liste_des_utilisateurs'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Icon path={mdiAccountGroup} size={1} />
                <TabName>Liste des utilisateurs</TabName>
              </Box>
            }
          />
        

                 {/* <Tab
            value='User'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>User</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Info</TabName>
              </Box>
            }
          /> */}
        </TabList>

        <TabPanel sx={{ p: 0 }} value='Ajout_users'>
          <Ajout_users />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='Liste_des_utilisateurs'>
          <Liste_des_utilisateurs />
          </TabPanel>

          
      </TabContext>
    </Card>
  )
  
}

export default AccountSettings



       
          
