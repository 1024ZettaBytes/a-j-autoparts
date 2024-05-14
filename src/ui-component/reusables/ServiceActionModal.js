import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { useState } from "react";

export default function ServiceActionModal({
  open,
  title,
  text,
  isLoading,
  requiredInput,
  inputLabel,
  onAccept,
  onCancel,
  type,
}) {
  const [inputValue, setInputValue] = useState("");
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
        </DialogContent>
        <DialogActions>
          {!isLoading && (
            <Button variant="outlined" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <LoadingButton
            disabled={requiredInput && inputValue.trim().length <= 0}
            loading={isLoading}
            color={type === "DONE" ? "success" : "error"}
            variant="contained"
            onClick={requiredInput ? () => onAccept(inputValue) : onAccept}
          >
            Continuar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
