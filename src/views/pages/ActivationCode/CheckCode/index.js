import { Check, CheckBoxOutlineBlank, Restore } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { gridSpacing } from "../../../../constant";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import useCheckCode from "../../../../api/useCheckCode";
import { MaterialReactTable } from "material-react-table";

const CheckCode = () => {
  const { t } = useTranslation();
  const checkCode = useCheckCode();
  const handelCheck = (values) => {
    checkCode.callFuntion(values);
  };
  return (
    <Box>
      <Formik
        initialValues={{
          code: "",
        }}
        validationSchema={yup.object({
          code: yup.string().max(6).min(6).required("enter code to check it"),
        })}
        onSubmit={handelCheck}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          handleReset,
          values,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ maxWidth: "500px" }}>
                  <InputLabel>
                    {t("categories.create_category.labels.name")}
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    label={t("categories.create_category.labels.name")}
                    name="code"
                    onChange={handleChange}
                    value={values.code}
                    error={touched.code && errors.code}
                    onBlur={handleBlur}
                  />
                  {touched.code && errors.code && (
                    <FormHelperText error>{errors.code}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <LoadingButton
                    color="success"
                    variant="contained"
                    size="large"
                    type="submit"
                    startIcon={<CheckBoxOutlineBlank />}
                    loading={checkCode.isPending}
                  >
                    {t("categories.create_category.labels.create_btn")}
                  </LoadingButton>
                  <Button
                    color="warning"
                    startIcon={<Restore />}
                    variant="outlined"
                    size="large"
                    onClick={handleReset}
                  >
                    {t("categories.create_category.labels.reset_btn")}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <Box
        sx={{
          my: 2,
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "1px 1px 10px -6px rgba(0,0,0,0.4)",
          p: 3,
        }}
      >
        <Typography
          sx={{
            mb: 2,
          }}
        >
          Type : {checkCode.mutation?.data?.data?.data?.type}
        </Typography>
        <Typography
          sx={{
            mb: 2,
          }}
        >
          expired :{" "}
          {checkCode?.mutation?.data?.data?.data?.is_expired ? "Yes" : "No"}
        </Typography>
        <MaterialReactTable
          data={checkCode?.mutation?.data?.data?.data?.courses || []}
          columns={[
            {
              accessorKey: "course_name",
              header: "Course Name",
            },
            {
              accessorKey: "is_used",
              header: "Is Used",
              Cell: ({ row }) => {
                return row.original.is_used ? "Yes" : "No";
              },
            },
            {
              accessorKey: "activator",
              header: "Activator",
            },
            {
              accessorKey: "phone",
              header: "Phone",
            },
          ]}
          enableBottomToolbar={false}
          enableColumnActions={false}
          enableTopToolbar={false}
          enableSorting={false}
        />
      </Box>
    </Box>
  );
};

export default CheckCode;
