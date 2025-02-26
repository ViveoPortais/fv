"use client"; 
import dynamic from "next/dynamic";

const PowerBIDashboard = dynamic(() => import("@/components/dashboard/PowerBIDashboard"), {
  ssr: false,
});


export default function IncidentReport() {
    
    return (
      <div className="h-full w-full">
        <div className="flex flex-col min-h-screen p-6">
          <PowerBIDashboard reportId="31A60D76-AF77-4CD3-BDC8-8B244D4FF40A" groupId="9672ce0f-9625-461e-be9a-2b7b08aa48d9"/>
        </div>
      </div>
    );
  }