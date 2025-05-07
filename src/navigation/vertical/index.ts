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
import { AccountDetailsOutline, AccountEditOutline, BriefcaseAccountOutline, BriefcaseEditOutline, MessageBadgeOutline, MessagePlusOutline, NoteEditOutline, TextBoxPlusOutline, Update } from 'mdi-material-ui'
import { mdiMessageBadgeOutline, mdiMessagePlusOutline } from '@mdi/js'

const navigation = (): VerticalNavItemsType => {
  return [
  {
      title: 'Acceuil',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Mon compte'
    },

    {
      title: 'Profil',
      icon: AccountCogOutline,
      path: '/Espace_Employe/Profil',
      openInNewTab: false

    },    {
      title: 'Renseignements',
      icon: AccountDetailsOutline,
      path: '/Espace_Employe/AutresInformations',
      openInNewTab: false

    },
    {
      title: 'Demande de Congé',
      icon: BriefcaseAccountOutline,
      path: '/Espace_Employe/Demande_conge ',
      openInNewTab: false

    },

    {
      sectionTitle: 'Communication'
    },

    {
      title: 'Lancer une conversation',
      icon: MessagePlusOutline,
      path: '/Espace_Employe/LancerConversation',
      openInNewTab: false

    },    {
      title: 'Discussions',
      icon: MessageBadgeOutline,
      path: '/Espace_Employe/messagerie',
      openInNewTab: false

    },
    
  ]
}

export default navigation
