import { useState } from "react";
import RGerais from "../../components/RGerais";
import PortalSidebar from "../../components/PortalSidebar";

export default function RecadosGerais() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <LayoutDiv>
      <PortalSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <Content $collapsed={isCollapsed}>
        <RGerais />
      </Content>
    </LayoutDiv>
  );
}
