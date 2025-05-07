// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { CardStatsVerticalProps } from 'src/@core/components/card-statistics/types1'

const CardCongeRH = (props:CardStatsVerticalProps) => {
  // ** Props
  const { NomDemande, User, color, icon, NombreJours , Date_debut, Date_fin ,typeConge ,Statut} = props

  return (
    <Card
    sx={{
      height: '100%', 
      padding: 1, 
    }}
  >      <CardContent>
        <Box sx={{ display: 'flex', marginBottom: 5.5, alignItems: 'flex-start', justifyContent: 'space-between', marginTop:5.5 }}>
          <Avatar sx={{ boxShadow: 3, marginRight: 4, color: 'common.white', backgroundColor: `${color}.main` }}>
            {icon}     
          </Avatar>
          <Typography  variant='h6'aria-label='settings'  sx={{ color: 'text.primary' }}>
            Demande déposée par :{User}
          </Typography>       
        </Box>
        <Typography variant='h5' sx={{ mr: 2 }} >{NomDemande} - {typeConge}</Typography>
        <Box sx={{ marginTop: 1.5, display: 'flex', flexWrap: 'wrap', marginBottom: 1.5, alignItems: 'flex-start' }}>
          <Typography variant='h6' sx={{ mr: 2 }}>
            Décision :{Statut}
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: 300, fontSize: '1rem' }}>Date de début : {Date_debut} Date de reprise : {Date_fin}</Typography>
        <Typography sx={{ fontWeight: 200 , fontSize: '1rem'}}>Nombre de jours : {NombreJours}</Typography>



      </CardContent>
    </Card>
  )
}

export default CardCongeRH
