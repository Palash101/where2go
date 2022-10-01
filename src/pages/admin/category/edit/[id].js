import { useState, useEffect } from "react";

//Mui Import
import FormLayoutsBasic from "src/views/form-layouts/FormLayoutsBasic";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Input from "@mui/material/Input";
import FormControlLabel from "@mui/material/FormControlLabel";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { userAuth } from "context/userContext";

import {
  getCategoryById,
  updateCategoryData,
} from "../../../../../service/admin/category";
import objectTranslation from "utils/objectTransaltion";

function CategoryEdit() {
  const router = useRouter();
  const [show, setShow] = useState(true);

  const [categoryData, setCategoryData] = useState({});

  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("");
  // const locale = localStorage.getItem("locale");

  const userContext = userAuth()
  const locale = userContext.locale

  useEffect(async() => {
    // const storageLocale = localStorage.getItem("locale");
    // setCurrentLanguage(storageLocale);
    if (router.isReady) {
    
        setLoading(true);
        await getCategoryById(router.query.id).then((data) => {
          if (!data.err) {
            setCategoryData(data);
            const d = objectTranslation(data.name)
            setCategoryName(d);
            setStatus(data.status);
            setLoading(false);
          } else {
            console.log(data.message);
          }
        });
     
    }
  }, [router.isReady]);

  //Firebase Uodate Category
  const storeCategory = async () => {
    if (categoryName === "" || status === "") {
      alert("Please enter Valid data");
      return;
    }
    const data = {
      [locale]: categoryName,
      status: status,
      lang: locale,
    };
    await updateCategoryData(router.query.id, data).then((data) => {
      console.log(data);
      toast("Category updated successfully");
      // alert(res);
      //handleMessage()
      setLoading(false);
      router.push("/admin/category");
    });

    // setLoading(true)

    // alert(englishName)
    // await addCategory(categoryName,currentLanguage,status).then((res)=>{
    //   console.log(res,'ress')
    //  // alert(res);
    //   handleMessage()
    //  setLoading(false)
    //  router.push('/admin/category')
    // })
  };

  const changLanguage = () => {
    setCurrentLanguage(currentLanguage == "en" ? "ar" : "en");
  };

  console.log("rendering");

  // if(Object.keys(categoryData).length === 0){
  // 	console.log('checking render.....',categoryData)
  // 	return (<>
  // 		loading

  // 		</>)
  // }

  // else{

  useEffect(() => {
    if(categoryData && categoryData.name){
      const d = objectTranslation(categoryData.name)
      setCategoryName(d);
    }
  },[locale])


  return (
    <div>
      {Object.keys(categoryData).length ? (
        <DatePickerWrapper dir={currentLanguage == "ar" ? "rtl" : "ltr"}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={12}>
              <Card>
                <CardHeader
                  title="Add Category"
                  titleTypographyProps={{ variant: "h6" }}
                />
                <CardContent>
                  <form>
                    <Grid container spacing={5}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          onChange={(e) => setCategoryName(e.target.value)}
                          value={categoryName}
                          fullWidth
                          label="Category Name"
                          placeholder="Ex: Drama, Game, Movie"
                        />
                        <FormControl sx={{ marginTop: "20px" }} fullWidth>
                          <InputLabel id="form-layouts-separator-multiple-select-label">
                            Status
                          </InputLabel>
                          <Select
                            onChange={(e) => setStatus(e.target.value)}
                            id="form-layouts-separator-multiple-select"
                            labelId="form-layouts-separator-multiple-select-label"
                            value={status}
                            input={
                              <OutlinedInput
                                label="Language"
                                id="select-multiple-language"
                              />
                            }
                            required
                          >
                            <MenuItem value="1">Active</MenuItem>
                            <MenuItem value="0">Block</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          disabled={loading}
                          type="button"
                          onClick={storeCategory}
                          variant="contained"
                          size="large"
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
            {loading && (
              <CircularProgress
                sx={{
                  position: "absolute",
                  right: "40%",
                  top: "50%",
                }}
              />
            )}
          </Grid>
        </DatePickerWrapper>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
  // }
}

export default CategoryEdit;


