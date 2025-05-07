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
import FileDocumentEditOutline  from 'mdi-material-ui/FileDocumentEditOutline'
import CalendarCheck from 'mdi-material-ui/CalendarCheck'

// ** Demo Tabs Imports
import TabInfo from '../../../views/InterfaceAdmin/EditUser'
import Liste_des_utilisateurs from '../../../views/InterfaceAdmin/ListUsers'
import UserManipulation from '../../../views/InterfaceAdmin/Activite_users'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import Ajout_users from 'src/views/InterfaceAdmin/Ajout_users'
import ListeDesConges from 'src/views/Congé/ListeDesCongés'
import GestionDesCongésRh from 'src/views/Gestion-Congé/Gestion_Congé_Rh'
import GestionDesCongésManager from 'src/views/Gestion-Congé/Gestion_Congé_Manager'
import ListeDesCongés from 'src/views/Congé/ListeDesCongés'
import GestionDesCongésManagerByAdmin from 'src/views/Gestion-Congé/Gestion_Congé_Manager ByAdmin'
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

const GestionConges = () => {
  // ** State
  const [value, setValue] = useState<string>('ListeDesCongés')

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
            value='ListeDesCongés'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TabName>Liste Des Congés</TabName>
              </Box>
            }
          />

          <Tab
            value='GestionDesCongésRh'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FileDocumentEditOutline  />
                <TabName>Demandes de congés (Responsable Rh) </TabName>
              </Box>
            }
          />
           <Tab
            value='GestionDesCongésManagerByAdmin'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
<FileDocumentEditOutline/>
                <TabName>Demandes de congés (Manager) </TabName>
              </Box>
            }
          />
         
              
        
        </TabList>
  <TabPanel sx={{ p: 0 }} value='ListeDesCongés'>
          <ListeDesCongés />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='GestionDesCongésRh'>
          <GestionDesCongésRh/>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='GestionDesCongésManagerByAdmin'>
          <GestionDesCongésManagerByAdmin/>
        </TabPanel>
      </TabContext>
    </Card>
  )
  
}

export default GestionConges