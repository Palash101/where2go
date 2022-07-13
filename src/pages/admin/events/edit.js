import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'


function EventEdit() {
    return(
        <>
         <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Create Event' titleTypographyProps={{ variant: 'h6' }} />
                    <CardContent>
                        <Typography>subtitle1</Typography>
                        <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
                        Cupcake ipsum dolor sit amet chocolate bar pastry sesame snaps.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                    </CardContent>
                </Card>

            </Grid>
            </Grid>
        </>


    )
}
export default EventEdit