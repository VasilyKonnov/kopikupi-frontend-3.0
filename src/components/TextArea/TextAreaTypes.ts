import {ChangeEvent} from "react";

export type TTextArea = {
  label: string
  id: string
  innerText: string | null
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}