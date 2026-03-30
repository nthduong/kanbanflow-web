import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card as CardMui } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";

function Card({ card }) {
  const showCardActions = () => {
    return (
      !!card?.memberIds?.length ||
      !!card?.comments?.length ||
      !!card?.attachments?.length
    );
  };

  return (
    <CardMui
      sx={{
        borderRadius: "10px",
        flexShrink: "0",
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
        boxShadow: "0px 1px 1px #1E1F2140, 0px 0px 1px #1E1F214F",
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}
      <CardContent
        sx={{
          padding: 1.5,
          "&:last-child": {
            padding: 1.5,
          },
        }}
      >
        <Typography>{card?.title}</Typography>
      </CardContent>
      {showCardActions() && (
        <CardActions
          sx={{
            padding: "0px 4px 8px 4px",
          }}
        >
          {!!card?.memberIds?.length && (
            <Button size="small" startIcon={<GroupIcon />}>
              {card?.memberIds?.length}
            </Button>
          )}
          {!!card?.comments?.length && (
            <Button size="small" startIcon={<CommentIcon />}>
              {card?.comments?.length}
            </Button>
          )}
          {!!card?.attachments?.length && (
            <Button size="small" startIcon={<AttachmentIcon />}>
              {card?.attachments?.length}
            </Button>
          )}
        </CardActions>
      )}
    </CardMui>
  );
}

export default Card;
