import Grid from '@mui/material/Grid'

import { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip'
import MUIDataTable from 'mui-datatables'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { useRouter } from 'next/router'
import { verifyToken } from '../../../../service/auth'
import nookies from 'nookies'
import { userAuth } from 'context/userContext'
import { getAllUsers , deleteUser } from '../../../../service/admin/users'
import { toast } from 'react-toastify'
function UserList() {
  const router = useRouter()
  const userContext = userAuth()
  const t = userContext.getTrans()
  const [loading, setLoading] = useState(false)

  const [allUsers, setAllUsers] = useState([])

  const options = {
    filterType: 'checkbox',
  }
  const showUser = (id) =>{
    
      router.push(`/admin/users/detail/${id}`)
    
  }

  const columns = [
    {
      name: 'phoneNumber',
      label: t.phone,
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'status',
      label: t.status,
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          if (value == 0) {
            return (
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  backgroundColor: '#ff4c51',
                  color: '#fdfdfd',
                  fontSize: '12px',
                }}
              >
                Block
              </span>
            );
          } else {
            return (
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  backgroundColor: '#56ca00',
                  color: '#fdfdfd',
                  fontSize: '12px',
                }}
              >
                Active
              </span>
            );
          }
        },
      },
    },
    {
      name: 'role',
      label: 'Role',

      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value === 1) {
            return <div>Customer</div>
          } else {
            return (
              <>
                <div>Admin</div>
              </>
            )
          }
        },
      },
    },
    {
      name: 'docId',
      label: t.actions,

      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
          
              <DeleteIcon
                onClick={() => DeleteClick(value)}
                color={'error'}
                sx={{
                  // color: '#9155fb',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              ></DeleteIcon>
              <RemoveRedEyeIcon
                onClick={() => showUser(value)}
                color={'info'}
                sx={{
                  // color: '#9155fb',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              ></RemoveRedEyeIcon>
            </>
          )
        },
      },
    },
  ]

  // const DeleteClick = (value, tableMeta) => {
  //   console.log({ value, tableMeta })
  // }

  const DeleteClick = async (docId) => {
    if (window.confirm('Are you sure? you want to delete this user.')) {
      // console.log(row)
      setLoading(true)
      deleteUser(docId).then((res) => {
        toast('User deleted successfully')
        setLoading(false)
        getData()
      })
    }
  }

  useEffect(async () => {
    getData()
  }, [getAllUsers])

  const getData = async () => {
  const userData = await getAllUsers()
  const userArray = []
  userData.docs.forEach((item) => {
    if (item.data().role == 1) {
      const docId = { docId: item.id }
      const data = Object.assign(docId, item.data())
      userArray.push(data)
    }
  })
  setAllUsers(userArray)
  console.log(allUsers, 'users Array')
 }


  const renderStatusChip = (status, color) => {
    return (
      <div>
        <span
          style={{
            padding: '4px 10px',
            borderRadius: '12px',
            backgroundColor: color,
            color: '#fdfdfd',
            fontSize: '12px',
          }}
        >
          {status}
        </span>
      </div>
    )
  }

  return (
    <Grid item xs={12}>
      <MUIDataTable
        title={`${t.users} ${t.list}`}
        data={allUsers}
        columns={columns}
        options={options}
      />
    </Grid>
  )
}

export default UserList

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context)
    if (!cookies.user) {
      return {
        redirect: {
          permanent: false,
          destination: '/admin/login',
        },
        props: {},
      }
    }
    const userData = await verifyToken(cookies.user)
    console.log(userData, 'in index page')

    if (userData.userType === 'admin') {
      return {
        props: { user: userData },
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: '/admin/login',
        },
        props: {},
      }
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login',
      },
      props: {},
    }
  }
}
