import { ArrowBack } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, IconButton, Tab } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import Detailtab from './Detailtab'
import useShowQuestion from '../../../../api/useShowQuestion'
import { ClipLoader } from 'react-spinners'
import ChoicesTab from './ChoicesTab'
import DeleteTab from './DeleteTab'

const QuestionDetails = () => {
    const navigate = useNavigate()
    const [value, setValue] = React.useState("1");
    const questionDetaisl = useShowQuestion()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if(questionDetaisl.isLoading){
    return <Box
        sx={{
            width : '100%',
            height :'100vh',
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center'
        }}
    >
        <ClipLoader
        loading={questionDetaisl.isLoading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Box>
  }
  return (
    <Box>
        <IconButton size='large' sx={{mb : 2}} onClick={() => {
            navigate(-1)
        }}>
            <ArrowBack />
        </IconButton>
        <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Detial" value="1" />
          <Tab label="Update" value="2" />
          <Tab label="Choices" value="3" />
          <Tab label="Delete" value="4" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <Detailtab question={questionDetaisl?.data?.data?.data} />
      </TabPanel>
      <TabPanel value="3">
        <ChoicesTab question={questionDetaisl?.data?.data?.data} />
      </TabPanel>
      <TabPanel value="4">
        <DeleteTab question={questionDetaisl?.data?.data?.data} />
      </TabPanel>
    </TabContext>
    </Box>
  )
}

export default QuestionDetails