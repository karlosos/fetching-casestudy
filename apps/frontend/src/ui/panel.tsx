import styled from "@emotion/styled";
import { neutral200 } from "./colors";

export const PanelStyled = styled.div`
  border-left: 1px solid ${neutral200};
  min-width: 200px;
  display: flex;
  flex-direction: column;
`

export const PanelHeaderStyled = styled.div`
  border-bottom: 1px solid ${neutral200};
  padding: 8px;
  font-size: 14px;
`

export const PanelContentStyled = styled.div`
  padding: 8px;
  grow: 1;
  flex-grow: 1;
  font-size: 14px;
`

export const PanelFooterStyled = styled.div`
  display: flex;
  justify-content: end;
  padding: 8px;
`
