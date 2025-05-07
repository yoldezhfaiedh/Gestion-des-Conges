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


// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'


// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import HistoriquePresence from 'src/views/InfoConge/PresenceByUser'
import HistoriqueConges from 'src/views/InfoConge/CongéByUser'
import SoldeByUser from 'src/views/InfoConge/SoldeByUser'

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

const AutresInfos = () => {
  // ** State
  const [value, setValue] = useState<string>('HistoriqueConges')

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
            value='HistoriqueConges'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TabName>Historique des Congés</TabName>
              </Box>
            }
          />
          <Tab
            value='HistoriquePresence'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TabName>Historique des Présences</TabName>
              </Box>
            }
          />
          <Tab
            value='SoldeByUser'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TabName>Solde de congé</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='HistoriqueConges'>
          <HistoriqueConges />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='HistoriquePresence'>
          <HistoriquePresence />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='SoldeByUser'>
          <SoldeByUser />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default AutresInfos
