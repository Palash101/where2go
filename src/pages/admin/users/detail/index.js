import { useState } from 'react'


// MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import CircularProgress from '@mui/material/CircularProgress';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import MUIDataTable from "mui-datatables";





function UserDetail (){
	const [value, setValue] = useState('')

	const handleChange = (event, newValue) => {
	    setValue(newValue)
	  }

	const TransactionsData = [
	{transId:'AA20NF-3NNF939-2N3-2',paymentMethod:'Master', amount:'200QAR',date:'12 Aug 2022'},
	{transId:'AA20NF-3NNF939-2N3-2',paymentMethod:'Master', amount:'200QAR',date:'12 Aug 2022'},
	{transId:'AA20NF-3NNF939-2N3-2',paymentMethod:'Master', amount:'200QAR',date:'12 Aug 2022'},
	{transId:'AA20NF-3NNF939-2N3-2',paymentMethod:'Master', amount:'200QAR',date:'12 Aug 2022'},
	{transId:'AA20NF-3NNF939-2N3-2',paymentMethod:'Master', amount:'200QAR',date:'12 Aug 2022'},
	{transId:'AA20NF-3NNF939-2N3-2',paymentMethod:'Master', amount:'200QAR',date:'12 Aug 2022'},
	{transId:'AA20NF-3NNF939-2N3-2',paymentMethod:'Master', amount:'200QAR',date:'12 Aug 2022'},
	{transId:'AA20NF-3NNF939-2N3-2',paymentMethod:'Master', amount:'200QAR',date:'12 Aug 2022'},
	{transId:'AA20NF-3NNF939-2N3-2',paymentMethod:'Master', amount:'200QAR',date:'12 Aug 2022'},
	{transId:'AA20NF-3NNF939-2N3-2',paymentMethod:'Master', amount:'200QAR',date:'12 Aug 2022'},
	]

	const options = {
	  filterType: 'checkbox',
	};


	const columns = [
	 {
	  name: "transId",
	  label: "Transaction Id",
	  options: {
	   filter: false,
	   sort: true,
	  }
	 },
	 {
	  name: "paymentMethod",
	  label: "Payment Method",

	  options: {
	  	filter:false,
	  	sort: false,
	 }
	},
	  {
	  name: "amount",
	  label: "Amount",

	  options: {
	  	filter:false,
	  	sort: false,
	 }
	},
	];
	    
	return(
		<>
		<Card>
		<Grid container spacing={6}>
			<Grid item xs={12} sm={12}>
			    <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
			    	<Box sx={{display:'flex', justifyContent:'space-between'}}>
				    	<Typography variant='h6' sx={{ marginBottom: 3.5 }}>
			              User Details
			            </Typography>
			            <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
			              Active
			            </Typography>
			    	</Box>
			    	<Divider sx={{ marginTop: .5, marginBottom: 6.75 }} />
			    	<Box>
				    	<Grid container spacing={6}>
							<Grid item xs={12} sm={6}>
								<Typography variant='p'>Customer Name: Abhilash Sharma</Typography>
								<Typography display='inline-block' variant='p'>SignUp Date/Time: 1July 2022 </Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Typography variant='p'>Mobile Number: +917224901787</Typography>
							</Grid>

					</Grid>

			    	</Box>
			    </CardContent>
			</Grid>
		</Grid>
	</Card>
	<Divider sx={{ marginTop: 6.75, marginBottom: 6.75 }} />
	 <Card>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab value='1' label='Order List' />
          <Tab value='2' label='Transactions/Invoice' />
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
	          <MUIDataTable
				  title={"Order List"}
				  data={TransactionsData}
				  columns={columns}
				  options={options}
				/>
     
          </TabPanel>
          <TabPanel value='2' sx={{ p: 0 }}>
          	<MUIDataTable
				  title={"Transactions List"}
				  data={TransactionsData}
				  columns={columns}
				  options={options}
				/>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
	</>
)

}
export default UserDetail