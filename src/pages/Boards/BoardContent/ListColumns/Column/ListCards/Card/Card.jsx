import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card as CardMui } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";

function Card() {
  return (
    <CardMui
      sx={{
        borderRadius: "8px",
        flexShrink: "0",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://images.pexels.com/photos/163872/italy-cala-gonone-air-sky-163872.jpeg"
        title="green iguana"
      />
      <CardContent
        sx={{
          padding: 1.5,
          "&:last-child": {
            padding: 1.5,
          },
        }}
      >
        <Typography>Lizard</Typography>
      </CardContent>
      <CardActions
        sx={{
          padding: "0px 4px 8px 4px",
        }}
      >
        <Button size="small" startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
          15
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          10
        </Button>
      </CardActions>
    </CardMui>
  );
}

export default Card;
