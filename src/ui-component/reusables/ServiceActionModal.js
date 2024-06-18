import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { LoadingButton } from "@mui/lab";
import { Alert, TextField } from "@mui/material";
import { useState } from "react";
import { updateService } from "client/api/services";

export default function ServiceActionModal({
  serviceId,
  open,
  title,
  text,
  requiredInput,
  inputLabel,
  onClose,
  onSuccess,
  type,
}) {
  const STATUS = {
    DONE: "COMPLETED",
    CANCEL: "CANCELED",
  };
  const [inputValue, setInputValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [hasError, setHasError] = useState({ error: false, msg: "" });
  const handleSubmit = async () => {
    setIsSaving(true);
    setHasError({ error: false, msg: "" });
    const result = await updateService({
      id: serviceId,
      status: STATUS[type],
      comments: inputValue,
    });
    setIsSaving(false);
    if (!result.error) {
      onSuccess(true, result.msg);
    } else {
      setHasError({ error: true, msg: result.msg });
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title" fontSize={22} align="center">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
          <TextField
            sx={{ marginTop: 2 }}
            autoComplete="off"
            required={requiredInput}
            label={inputLabel}
            multiline
            rows={3}
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            autoFocus
            fullWidth={true}
          />

          {hasError.error && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              {hasError.msg}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          {!isSaving && (
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
          )}
          <LoadingButton
            disabled={requiredInput && inputValue.trim().length <= 0}
            loading={isSaving}
            color={type === "DONE" ? "success" : "error"}
            variant="contained"
            onClick={handleSubmit}
          >
            Continuar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
