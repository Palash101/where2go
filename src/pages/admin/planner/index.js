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
import EditIcon from '@mui/icons-material/Edit'
import nookies from 'nookies'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { userAuth } from 'context/userContext'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { getAllFloorPLan } from '../../../../service/admin/floorPlan'
import { verifyToken } from '../../../../service/auth'

function PlansList() {
  const router = useRouter()
  const [allLocations, setAllLocations] = useState([])
  const [loading, setLoading] = useState(false)
  const userContext = userAuth()
  const t = userContext.getTrans()
  const [showCreateModal, setShowCreateModal] = useState(true)
  const [floorPlanName, setFloorPlanName] = useState('')

  useEffect(() => {
    getData()
  }, [setAllLocations])

  const getData = async () => {
    const plans = await getAllFloorPLan()
    const plansArray = []
    plans.docs.forEach((item) => {
      const docId = { docId: item.id }
      const data = Object.assign(docId, item.data())
      plansArray.push(data)
    })
    console.log(plansArray)
    setAllLocations(plansArray)
  }

  const handleClose = () => {
    setShowCreateModal(false)
  }

  const handleOpen = () => {
    console.log('opening')
    setShowCreateModal(true)
  }

  const editLocation = (docId) => {
    router.push(`/admin/location/edit/${docId}`)
  }

  const createFloorPlan = () => {
    console.log('creating floor plan')
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

  const DeleteClick = (id) => {
    if (window.confirm('Are you sure? you want to delete this location.')) {
      console.log(id)
      setLoading(true)
      deleteLocation(id).then((res) => {
        toast('Location deleted successfully.')

        setLoading(false)
        getData()
      })
    }
  }

  return (
    <div>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={`Plans  ${t.list}`}
            titleTypographyProps={{ variant: 'h6' }}
          />
          <Button onClick={handleOpen}>Create New Sitting Plan</Button>
        </Card>
        <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{`Plan ${t.name}`}</TableCell>
                <TableCell>{t.status}</TableCell>
                <TableCell align="right">{t.actions}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allLocations.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    '&:last-of-type td, &:last-of-type th': {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.status == 1
                      ? renderStatusChip(t.active, '#56ca00')
                      : renderStatusChip(t.block, '#ff4c51')}
                  </TableCell>

                  <TableCell align="right">
                    <EditIcon
                      onClick={() => editLocation(row.docId)}
                      sx={{ color: '#d7c602', cursor: 'pointer' }}
                    />
                    <DeleteIcon
                      onClick={() => DeleteClick(row.docId)}
                      sx={{
                        color: '#d7c602',
                        cursor: 'pointer',
                        marginLeft: '10px',
                      }}
                    ></DeleteIcon>
                  </TableCell>
                </TableRow>
              ))}
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
    </div>
  )
}

export default PlansList

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
