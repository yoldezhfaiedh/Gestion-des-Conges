// ** React Imports
import { Fragment, ReactNode } from 'react'

// ** MUI Components
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

interface FooterIllustrationsProp {
  image1?: ReactNode
  image2?: ReactNode
  image3?: ReactNode

}

// Styled Components
const MaskImg = styled('img')(() => ({
  bottom: 0,
  zIndex: -1,
  width: '100%',
  position: 'absolute'
}))

const Img1 = styled('img')(() => ({
  left: 0,
  bottom: 0,
  position: 'absolute'
}))

const Img2 = styled('img')(() => ({
  right: 0,
  bottom: '100px',
  position: 'absolute'
}))

const Img3 = styled('img')(() => ({
  left: '40%',
  right: '70%',
  bottom: '500px',
  position: 'absolute'
}));
const FooterIllustrationsV1 = (props: FooterIllustrationsProp) => {
  // ** Props
  const { image1, image2 , image3 } = props

  // ** Hook
  const theme = useTheme()

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  if (!hidden) {
    return (
      <Fragment>
        {image1 || <Img1 alt='tanitWeb' src='/images/pages/tanit.png' />}
        <MaskImg alt='mask' src={`/images/pages/auth-v1-mask-${theme.palette.mode}.png`} />
        {image2 || <Img2 alt='TanitWeb' src='/images/pages/tanit.png' />}
        {image3 || <Img3 alt='TanitWeb' src='/images/pages/tanit.png' />}

      </Fragment>
    )
  } else {
    return null
  }
}

export default FooterIllustrationsV1
