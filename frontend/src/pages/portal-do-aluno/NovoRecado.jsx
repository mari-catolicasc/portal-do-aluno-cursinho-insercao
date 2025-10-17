import PortalSidebar from "../../components/PortalSidebar";
import { useState } from "react";
import styled from "styled-components";
import NRecado from "../../components/NRecado";


export default function NovoRecado() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      <PortalSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div style={{ flex: 1 }}>
        <NRecado />
      </div>
    </div>
  );
}
