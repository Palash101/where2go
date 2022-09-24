import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Chip from '@mui/material/Chip'
import { useRouter } from 'next/router'
import { verifyToken } from '../../../../service/auth'
import nookies from 'nookies'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import {
  getAllCategory,
  deleteCategory,
} from '../../../../service/admin/category'
import { userAuth } from '../../../../context/userContext'
import Translations from 'utils/trans'
import { getHomePageEvent } from '../../../../service/admin/events'
import { CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'

function CategoryList() {
  const [allCategory, setAllCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  //User Context
  const userContext = userAuth()

  //Transclations
  const locale = userContext.locale
  const t = Translations(locale)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const catData = await getAllCategory()
    const catArray = []
    catData.docs.forEach((item) => {
      const docId = { docId: item.id }
      const data = Object.assign(docId, item.data())

      catArray.push(data)
    })
    setAllCategory(catArray)
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
  const DeleteClick = async (docId) => {
    if (window.confirm('Are you sure? you want to delete this category.')) {
      // console.log(row)
      setLoading(true)
      deleteCategory(docId).then((res) => {
        toast('Category deleted successfully')
        setLoading(false)
        getData()
      })
    }
  }

  const editCategory = (docId) => {
    router.push(`/admin/category/edit/${docId}`)
  }

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={`${t.event} ${t.categories}`}
            titleTypographyProps={{ variant: 'h6' }}
          />
        </Card>
        <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  {t.categories} {t.name}
                </TableCell>
                <TableCell>{t.status}</TableCell>
                <TableCell>{t.position}</TableCell>
                <TableCell align="right">{t.actions}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allCategory.map((row, key) => {
                const { docId, status, position, name } = row
                return (
                  <TableRow
                    key={key}
                    sx={{
                      '&:last-of-type td, &:last-of-type th': {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {name.hasOwnProperty(locale)
                        ? name[locale]
                        : name[Object.keys(name)[0]]}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {status == 1
                        ? renderStatusChip(t.active, '#56ca00')
                        : renderStatusChip(t.block, '#ff4c51')}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {position}
                    </TableCell>

                    <TableCell align="right">
                      <EditIcon
                        onClick={() => editCategory(docId)}
                        sx={{ color: '#d7c602', cursor: 'pointer' }}
                      />
                      <DeleteIcon
                        onClick={() => DeleteClick(docId)}
                        sx={{
                          color: '#d7c602',
                          cursor: 'pointer',
                          marginLeft: '10px',
                        }}
                      ></DeleteIcon>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {loading && (
        <CircularProgress
          sx={{
            position: 'absolute',
            right: '40%',
            top: '50%',
          }}
        />
      )}
    </>
  )
}

export default CategoryList

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
