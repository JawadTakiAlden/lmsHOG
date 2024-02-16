import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Link,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import ChoiceCard from "./ChoiceCard";

const Detailtab = ({ question }) => {
  return (
    <Box>
      <Typography
        sx={{
          mb: 5,
          lineHeight: "1.6",
          textTransform: "capitalize",
          fontSize: "1.2rem",
        }}
      >
        <span style={{ color: "#09c" }}>title : </span>{" "}
        {question.title || "untitled"}
      </Typography>

      <Typography
        sx={{
          mb: 5,
          lineHeight: "1.6",
          fontSize: "1.2rem",
          textTransform: "capitalize",
        }}
      >
        <span style={{ color: "#09c" }}>clarification :</span>{" "}
        {question.clarification_text || "unclarification"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          mb: 5,
        }}
      >
        <Card sx={{ maxWidth: 345, flex: 1, minWidth: "250px" }}>
          <CardHeader title="Title Image" />
          <CardMedia
            component="img"
            height="250"
            image={question.image}
            alt={question.image}
          />
          <CardContent>
            <Link
              component={"a"}
              target="_blank"
              variant={"caption"}
              size="small"
              href={question.image}
            >
              Open Full Image
            </Link>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, flex: 1, minWidth: "250px" }}>
          <CardHeader title="Clarification Image" />
          <CardMedia
            component="img"
            height="250"
            image={question.clarification_image}
            alt={question.clarification_image}
          />
          <CardContent>
            <Link
              component={"a"}
              target="_blank"
              variant={"caption"}
              size="small"
              href={question.clarification_image}
            >
              Open Full Image
            </Link>
          </CardContent>
        </Card>
      </Box>
      <Typography variant="h5" mb={2}>
        Choices :
      </Typography>
      {question.choices.length === 0 && (
        <Typography
          sx={{
            textTransform: "capitalize",
            textAlign: "center",
          }}
        >
          no choices
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {question.choices.map(
          (choice, index) => (
            <Box
                sx={{
                    flexBasis : '25%',
                    minWidth : '250px',
                   
                }}
            >
                <ChoiceCard key={index} choice={choice} />
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default Detailtab;
