"use client";

import { useEffect, useState } from "react";
import {
  fetchCalls,
  fetchStatusOptions,
  resetCalls,
  selectCalls,
  selectLoading,
  selectStatusOptions,
} from "@/store/slices/callTrackingSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filters } from "@/types/incident";
import useSession from "@/hooks/useSession";
import { CustomSelect } from "@/components/custom/CustomSelect";
import { DataTable } from "@/components/dashboard/DataTable";
import { columns } from "./columns";
import { getBackgroundColor, getTextColor } from "@/helpers/helpers";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoadingOverlay } from "@/components/custom/LoadingOverlay";

export default function CallTracking() {
  const dispatch = useAppDispatch();
  const calls = useAppSelector(selectCalls);
  const isLoading = useAppSelector(selectLoading);
  const statusOptions = useAppSelector(selectStatusOptions);
  const programCode = useSession().programCode;
  const bgColor = getBackgroundColor(useSession().programCode);
  const textColor = getTextColor(useSession().programCode);
  const [isTableLoading, setIsTableLoading] = useState(true);

  const [filters, setFilters] = useState<Filters>({
    code: "",
    statusStringMapId: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const data = {
      entityName: "Incident",
      attributeName: "StatusStringMap",
      programCode: programCode,
    };
    dispatch(fetchStatusOptions(data));
  }, [dispatch, programCode]);

  useEffect(() => {
    dispatch(resetCalls());
    dispatch(fetchCalls({ filters, programCode }));
  }, [dispatch, programCode]);

  useEffect(() => {
    if (!isLoading && calls.length > 0) {
      setIsTableLoading(false);
    } else {
      setIsTableLoading(true);
    }
  }, [calls, isLoading]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="p-4 space-y-4">
      <LoadingOverlay isVisible={isTableLoading} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input name="code" placeholder="Código" value={filters.code} onChange={handleFilterChange} />
        <CustomSelect
          name="statusStringMapId"
          options={statusOptions}
          onChange={(value) => setFilters((prev) => ({ ...prev, statusStringMapId: value }))}
          label="Status"
        />
        <Input type="date" placeholder="De" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
        <Input type="date" placeholder="Até" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
      </div>
      <Button
        disabled={isLoading}
        variant={"genericModalNo"}
        onClick={() => dispatch(fetchCalls({ filters, programCode }))}
      >
        Filtrar
      </Button>
      <DataTable columns={columns} data={calls} isLoading={isTableLoading} bgColor={bgColor} textColor={textColor} />
    </div>
  );
}
