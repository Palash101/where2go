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
import Account from 'mdi-material-ui/Account'
import CategoryIcon from '@mui/icons-material/Category'
import AddIcon from '@mui/icons-material/Add'
import EventIcon from '@mui/icons-material/Event'
import { userAuth } from 'context/userContext'
import Translations from 'utils/trans'

const navigation = () => {
  const userContext = userAuth()
  const t = userContext.getTrans()

  return [
    {
      title: t.dashboard,
      icon: HomeOutline,
      path: '/admin',
    },

    {
      sectionTitle: t.userManagement,
    },
    {
      title: t.users,
      icon: Account,
      path: '/admin/users',
    },
    {
      sectionTitle: t.location,
    },
    {
      title: t.location,
      icon: CategoryIcon,
      path: '/admin/location',
    },
    {
      title: `${t.addnew} ${t.location}`,
      icon: AddIcon,
      path: '/admin/location/add',
    },
    {
      sectionTitle: t.category,
    },

    {
      title: t.categories,
      icon: CategoryIcon,
      path: '/admin/category',
    },

    {
      title: `${t.addnew} ${t.categories}`,
      icon: AddIcon,
      path: '/admin/category/add',
    },
    {
      sectionTitle: t.events,
    },
    {
      title: t.event,
      icon: EventIcon,
      path: '/admin/events/list',
    },
    {
      title: `${t.addnew} ${t.event}`,
      icon: AddIcon,
      path: '/admin/events/',
    },
    {
      sectionTitle: t.setting,
    },
    {
      title: `${t.admin}  ${t.setting}`,
      icon: AccountCogOutline,
      path: '/admin/account-settings',
    },
    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
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


