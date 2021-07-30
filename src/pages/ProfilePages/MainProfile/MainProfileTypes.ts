import React from "react";

export type TMainView = {
  handleFillBtnClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  isRequestPending: boolean
}
