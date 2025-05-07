// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(13)
  }
}))

const TreeIllustration = styled('img')(({ theme }) => ({
  left: 0,
  bottom: '5rem',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    bottom: 0
  }
}))

const Error404 = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h1'>404</Typography>
          <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
            Page Not Found ⚠️
          </Typography>
          <Typography variant='body2'>We couldn&prime;t find the page you are looking for.</Typography>
        </BoxWrapper>
        <Link passHref href='/'>
          <Button component='a' variant='contained' sx={{ px: 5.5 }}>
            Back to Home
          </Button>
        </Link>
      </Box>
      <FooterIllustrationsV1 />
    </Box>
  )
}

Error404.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error404



// 'use client'
// // import Layout from '@/components/layout/layoutadmin'
// import { Box, Grid, Typography } from '@mui/material'
// import { useTranslation } from 'react-i18next'
// // import { useGetMessageQuery } from '@/services/api/MessagesAPI'
// import { useParams } from 'next/navigation'
// import Detailsmessage from '@/components/commun/detailsmessage'

// const ViewMessage = () => {
//   const params = useParams()
//   const { data: message, refetch } = useGetMessageQuery(params?.id)

//   const handleIsUpdated = () => {
//     refetch()
//   }

//   const { t } = useTranslation()

//   return (
//     <>
//       {/* <Layout> */}
//         <Grid container spacing={1}>
//           <Grid item lg={8} xs={12} sx={{ mt: '30px', ml: '20px', mb: '10rem' }}>
//             <Typography className='title' sx={{ borderBottom: '1px solid #E5E5E5' }}>
//               {t('message__title')}
//             </Typography>
//             <Typography
//               sx={{ fontWeight: '500', fontSize: '25px', fontFamily: 'Poppins', py: '2rem', color: '#031326' }}
//             >
//               {message?.object}
//             </Typography>
//             <Box marginBottom='4rem'>
//               {message && <Detailsmessage conversation={message} onActionComplete={handleIsUpdated} />}
//             </Box>
//           </Grid>
//         </Grid>
//       {/* </Layout> */}
//     </>
//   )
// }
// export default ViewMessage