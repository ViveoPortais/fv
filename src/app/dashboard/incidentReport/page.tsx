"use client"; 
import dynamic from "next/dynamic";

const PowerBIDashboard = dynamic(() => import("@/components/dashboard/PowerBIDashboard"), {
  ssr: false,
});


export default function IncidentReport() {
    
    return (
      <div className="h-full w-full">
        <div className="flex flex-col min-h-screen p-6">
          <PowerBIDashboard reportId="ce783073-1345-4732-9d31-4eb567a385be" groupId="87ad9545-1b34-41de-ba40-a8745891c93d"/>
        </div>
      </div>
    );
  }