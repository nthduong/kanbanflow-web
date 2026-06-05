import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import PasswordIcon from "@mui/icons-material/Password";
import LockResetIcon from "@mui/icons-material/LockReset";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import { useConfirm } from "material-ui-confirm";

import { FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from "~/utils/validators";
import FieldErrorAlert from "~/components/Form/FieldErrorAlert";
import { updateUserAPI, logoutUserAPI } from "~/redux/user/userSlice";

function SecurityTab() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const confirmChangePassword = useConfirm();
  const submitChangePassword = (data) => {
    confirmChangePassword({
      title: (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LogoutIcon sx={{ color: "warning.dark" }} /> Change Password
        </Box>
      ),
      description: "You have to login again after successfully changing your password. Continue?",
      confirmationText: "Confirm",
      cancellationText: "Cancel",
    })
      .then(async () => {
        const { current_password, new_password, new_password_confirmation } = data;

        const res = await toast.promise(dispatch(updateUserAPI({ current_password, new_password })), {
          pending: "Updating...",
        });

        if (!res?.error) {
          toast.success("Successfully change password, please login again!");
          dispatch(logoutUserAPI(false));
        }
      })
      .catch(() => {});
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Box>
          <Typography variant="h5">Security Dashboard</Typography>
        </Box>
        <Box component="form" sx={{ maxWidth: "400px", width: "100%" }} onSubmit={handleSubmit(submitChangePassword)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                {...register("current_password", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE,
                  },
                })}
                error={!!errors["current_password"]}
              />
              <FieldErrorAlert errors={errors} fieldName={"current_password"} />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                {...register("new_password", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE,
                  },
                })}
                error={!!errors["new_password"]}
              />
              <FieldErrorAlert errors={errors} fieldName={"new_password"} />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="New Password Confirmation"
                type="password"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockResetIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                {...register("new_password_confirmation", {
                  validate: (value) => {
                    if (value === watch("new_password")) return true;
                    return "Password confirmation does not match.";
                  },
                })}
                error={!!errors["new_password_confirmation"]}
              />
              <FieldErrorAlert errors={errors} fieldName={"new_password_confirmation"} />
            </Box>

            <Box>
              <Button className="interceptor-loading" type="submit" variant="contained" color="primary" fullWidth>
                Change
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SecurityTab;
