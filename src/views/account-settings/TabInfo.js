// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'

import { userAuth } from 'context/userContext'
import Translations from 'utils/trans'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label="Birth Date" fullWidth {...props} />
})

const TabInfo = () => {

  const userContext = userAuth()
  const locale = userContext.locale
  const t = Translations(locale)

  // ** State
  const [date, setDate] = useState(null)

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
              label={t.bio}
              minRows={2}
              placeholder={t.bio}
              defaultValue="The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scalable 😀, and lightning 😍 fast search and discovery experiences."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id="account-settings-date"
                placeholderText="MM-DD-YYYY"
                customInput={<CustomInput />}
                onChange={(date) => setDate(date)}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label={t.phone}
              placeholder="(123) 456-7890"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t.website}
              placeholder="https://example.com/"
              defaultValue="https://themeselection.com/"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>{t.country}</InputLabel>
              <Select label="Country" defaultValue="USA">
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
                <MenuItem value="Australia">Australia</MenuItem>
                <MenuItem value="Germany">Germany</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="form-layouts-separator-multiple-select-label">
                {t.languages}
              </InputLabel>
              <Select
                multiple
                defaultValue={['English']}
                id="account-settings-multiple-select"
                labelId="account-settings-multiple-select-label"
                input={
                  <OutlinedInput
                    label="Languages"
                    id="select-multiple-language"
                  />
                }
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="Portuguese">Portuguese</MenuItem>
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="German">German</MenuItem>
                <MenuItem value="Arabic">Arabic</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>{t.gender}</FormLabel>
              <RadioGroup
                row
                defaultValue="male"
                aria-label="gender"
                name="account-settings-info-radio"
              >
                <FormControlLabel
                  value="male"
                  label={t.male}
                  control={<Radio />}
                />
                <FormControlLabel
                  value="female"
                  label={t.female}
                  control={<Radio />}
                />
                <FormControlLabel
                  value="other"
                  label={t.other}
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" sx={{ marginRight: 3.5 }}>
              {`${t.save} ${t.changes}`}
            </Button>
            <Button
              type="reset"
              variant="outlined"
              color="secondary"
              onClick={() => setDate(null)}
            >
              {t.reset}
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabInfo
