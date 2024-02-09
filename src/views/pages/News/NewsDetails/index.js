import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router';
import { ClipLoader } from 'react-spinners';
import useShowNewsDetails from '../../../../api/useShowNewsDetails';
import DetailsTab from './DetailsTab';
import DeleteTab from './DeleteTab';

const NewsDetails = () => {
  const [value, setValue] = React.useState("1");
  const { news_id } = useParams();
  const categoryDetails = useShowNewsDetails();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if(categoryDetails.isLoading){
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
        loading={categoryDetails.isLoading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Box>
  }
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Update" value="1" />
          <Tab label="Delete" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <DetailsTab
          data={categoryDetails?.data?.data?.data}
        />
      </TabPanel>
      <TabPanel value="2">
        <DeleteTab
          data={categoryDetails?.data?.data?.data}
        />
      </TabPanel>
    </TabContext>
  )
}

export default NewsDetails