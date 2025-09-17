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
import { Bool_Setting } from "../../configs/defaultSetting";
import type { OpenStateProps, SettingKey } from "../../types";

export default function SettingDialog({ open, setOpen }: OpenStateProps) {
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
          {Bool_Setting.map(([key]) => (
            <SwitchSettingItem setting_key={key} key={key} />
          ))}
          <RemindTimeField
            remind_before={setting.remind_before}
            onChange={(value, unit) =>
              update_setting({ remind_before: { value, unit } })
            }
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

interface SwitchSettingItemProps {
  setting_key: SettingKey;
}

function SwitchSettingItem({ setting_key }: SwitchSettingItemProps) {
  const checked = useSettingStore((s) => s.setting[setting_key]);
  const update = useSettingStore((s) => s.update_setting);

  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Typography sx={{ textTransform: "capitalize" }}>
        {setting_key.split("_").join(" ")}
      </Typography>
      <Switch
        checked={checked}
        onChange={(_, checked) => update({ [setting_key]: checked })}
      />
    </Stack>
  );
}
