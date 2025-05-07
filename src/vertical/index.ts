// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Acceuil',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Pages'
    },

    {
      title: 'Profil',
      icon: AccountCogOutline,
      path: '/Espace_Manager/Profil',
      openInNewTab: true

    },
    {
      title: 'Informations Personnelles',
      icon: AccountCogOutline,
      path: '/Espace_Manager/AutresInformations',
      openInNewTab: true

    },
    // {
    //   title: 'Gestion des conges',
    //   icon: AlertCircleOutline,
    //   path: '/Espace_Admin/Gestion_des_conges',
    //   openInNewTab: true
    // },
    // {
    //   sectionTitle: 'User Interface'
    // },
     {
      title: 'Gestion des conges',
      icon: AlertCircleOutline,
      path: '/Espace_Manager/Gestion_des_conges',
      openInNewTab: true
    },
    {
      title: "Depot d'une demande de congé ",
      icon: AlertCircleOutline,
      path: '/Espace_Manager/Demande_Conge',
      openInNewTab: true

    },
   
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation