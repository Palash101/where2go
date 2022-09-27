
import { useEffect, useState } from 'react';

import MUIDataTable from 'mui-datatables';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';

import { useRouter } from 'next/router';
import { verifyToken } from '../../../../service/auth';
import nookies from 'nookies';
import { userAuth } from 'context/userContext';
import Translations from 'utils/trans';
import { getAllEvents,deleteEvent } from '../../../../service/admin/events';
import { toast } from 'react-toastify'
function EventList() {
  const router = useRouter();
  const [allEvents, setAllEventData] = useState([]);
  const [loading, setLoading] = useState(false)

  const userContext = userAuth();
  const locale = userContext.locale;
  const t = Translations(locale);

  const options = {
    filterType: 'checkbox',
  };

  const columns = [
    {
      name: 'event_name',
      label: 'Event Name',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'event_type',
      label: 'Event Type',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          if (value == 'draft') {
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
                {value.toUpperCase()}
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
                {value.toUpperCase()}
              </span>
            );
          }
        },
      },
    },
    {
      name: 'docId',
      label: 'Action',

      options: {
        filter: false,
        sort: false,
        targe:"_blank",
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <DeleteIcon
                sx={{
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
                onClick={() => DeleteClick(value)}

                color={'error'}
              />
              <EditIcon
                onClick={() => handleEditEvent(value)}
                sx={{
                  color: '#9155fb',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              ></EditIcon>
              {showViewButton(tableMeta.rowIndex) ? (
                <RemoveRedEyeIcon target="_blank"
                  onClick={() => handleRowView(value)}
                  sx={{ color: '#3100f5', cursor: 'pointer' }}
                />
              ) : (
                <></>
              )}
            </>
          );
        },
      },
    },
  ];

  

  const showViewButton = (index) => {
    const d = allEvents[index];
    if (d.status == 'published') {
      return true;
    } else {
      return false;
    }
  };

  const handleRowView = (value) => {
    window.open('/details/' + value);
  };
  const handleEditEvent = (value) => {
    router.push('/admin/events/' + value);
  };

  const DeleteClick = async (docId) => {
    if (window.confirm('Are you sure? you want to delete this event.')) {
      // console.log(row)
      setLoading(true)
      deleteEvent(docId).then((res) => {
        toast('Event deleted successfully')
        setLoading(false)
        getData()
      })
    }
  }

  useEffect(() => {
    getData()
  }, [getAllEvents])

  const getData = async () => {
    const eventData = await getAllEvents();
    const eventArray = [];
    eventData.docs.forEach((item) => {
      const docId = { docId: item.id };
      const { event_name } = item.data();
      const event_data = { ...item.data(), event_name: event_name[locale] };
      const data = Object.assign(docId, event_data);
      eventArray.push(data);
    });
    setAllEventData(eventArray);
  }

  return (
    <Grid item xs={12}>
      <MUIDataTable
        title={'Event List'}
        data={allEvents}
        columns={columns}
        options={options}
      />
    </Grid>
  );
}

export default EventList;

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    if (!cookies.user) {
      return {
        redirect: {
          permanent: false,
          destination: '/admin/login',
        },
        props: {},
      };
    }
    const userData = await verifyToken(cookies.user);
    console.log(userData, 'in index page');

    if (userData.userType === 'admin') {
      return {
        props: { user: userData },
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: '/admin/login',
        },
        props: {},
      };
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login',
      },
      props: {},
    };
  }
}
