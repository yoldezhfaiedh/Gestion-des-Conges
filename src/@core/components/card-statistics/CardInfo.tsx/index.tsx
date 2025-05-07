// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// ** Types Imports
import { CardStatsVerticalProps } from 'src/@core/components/card-statistics/typesInfo';

const CardInfo = (props: CardStatsVerticalProps) => {
  // ** Props
  const { Nom, Prenom, Email, Departement, icon, color } = props;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', marginBottom: 5.5, alignItems: 'center', justifyContent: 'space-between' }}>
          <Avatar sx={{ boxShadow: 3, marginRight: 4, color: 'common.white', backgroundColor: `${color}.main` }}>
            {icon}     
          </Avatar>
         
        </Box>
        <Typography variant='h5' sx={{ color: 'text.primary' }}>
           Nom:  {Nom} {Prenom}
          </Typography>
        <Typography variant='h5' sx={{ color: 'text.primary', marginBottom: 1 }}>
          Email: {Email}
        </Typography>
        <Typography variant='h5' sx={{ color: 'text.primary', marginBottom: 1 }}>
          Département: {Departement}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardInfo;
