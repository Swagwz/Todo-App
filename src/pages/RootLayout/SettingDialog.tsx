import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { useSettingStore } from "../../stores/useSettingStore";
import RemindTimeField from "../../components/RemindTimeField";

export default function SettingDialog({ open, setOpen }) {
  const setting = useSettingStore((s) => s.setting);
  const update_setting = useSettingStore((s) => s.update_setting);

  useEffect(() => {
    localStorage.setItem("setting", JSON.stringify(setting));
  }, [setting]);
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      slotProps={{ paper: { sx: { width: 400 } } }}
    >
      <DialogTitle sx={{ position: "relative" }}>
        Setting
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack gap={1}>
          <SwitchSettingItem title="Dark mode" />
          <SwitchSettingItem title="Expand all" />
          <SwitchSettingItem title="Ask before delete" />
          <SwitchSettingItem title="Newest project top" />
          <SwitchSettingItem title="Newest todo top" />
          <RemindTimeField
            remind_before={{
              value: setting.remind_before.value,
              unit: setting.remind_before.unit,
            }}
            onChange={(value, unit) =>
              update_setting({ remind_before: { value, unit } })
            }
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

function SwitchSettingItem({ title }) {
  const setting_key = title.toLowerCase().split(" ").join("_");
  const checked = useSettingStore((s) => s.setting[setting_key]);
  const update = useSettingStore((s) => s.update_setting);

  const handleCheck = (e) => {
    update({ [setting_key]: e.target.checked });
  };
  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Typography>{title}</Typography>
      <Switch checked={checked} onChange={handleCheck} />
    </Stack>
  );
}
