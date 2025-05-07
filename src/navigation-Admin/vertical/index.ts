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
import { AccountDetailsOutline, AccountEditOutline, BriefcaseAccountOutline, BriefcaseEditOutline, DeleteSweep, MessageBadgeOutline, MessagePlusOutline, NoteEditOutline, TextBoxPlusOutline, Update } from 'mdi-material-ui'
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
      path: '/Espace_Admin/Profil',
      openInNewTab: false

    },    {
      title: 'Renseignements',
      icon: AccountDetailsOutline,
      path: '/Espace_Admin/AutresInformations',
      openInNewTab: false

    },
    {
      title: 'Demande de Congé',
      icon: BriefcaseAccountOutline,
      path: '/Espace_Admin/Demande_conge ',
      openInNewTab: false

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
      sectionTitle: 'administration'
    },

     {
      title: 'Gérer les Congés',
      icon: BriefcaseEditOutline,
      path: '/Espace_Admin/Gestion_des_conges',
      openInNewTab: false
    },
    {
      title: 'Gérer les Utilisateurs',
      icon: AccountEditOutline,
      path: '/Espace_Admin/Gestion_des_utilisateurs',
      openInNewTab: false

    },
    {
      title: ' Créer un solde',
      icon: NoteEditOutline,
      path: '/Espace_Admin/Gestion_comptes_employe',
      openInNewTab: false

    },
    {
      title: 'Mettre à jour les soldes',
      icon: Update,
      path: '/Espace_Admin/Gestion_Presence',
      openInNewTab: false
    },
    {
      title: 'Réviser les soldes',
      icon: DeleteSweep,
      path: '/Espace_Admin/GestionDeLasaisie',
      openInNewTab: false
    },
    {
      title: 'Gérer les Départements',
      icon: TextBoxPlusOutline,
      path: '/Espace_Admin/Gestion_Departement',
      openInNewTab: false

    },
    {
      title: 'Type de Congé',
      icon: TextBoxPlusOutline,
      path: '/Espace_Admin/Gestion_type_conge',
      openInNewTab: false
    },
    {
      sectionTitle: 'Communication'
    },

    {
      title: 'Lancer une conversation',
      icon: MessagePlusOutline,
      path: '/Espace_Admin/LancerConversation',
      openInNewTab: false

    },    {
      title: 'Discussions',
      icon: MessageBadgeOutline,
      path: '/Espace_Admin/messagerie',
      openInNewTab: false

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
