"use client";
import React, { Suspense } from "react";
import ButtonLink from "@/components/ui/button/ButtonLink";
import Breadcrumb from "@/components/common/Breadcrumb";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";
import scheduleTimelines from '@/data/schedule-timeline.json';
import { dateFormat } from "@/utils/dateFormat";
import ButtonExportDropdown from "@/components/buttonExportDropdown";
import { Info } from "lucide-react";


function OperatorListContent() {

    const columns = [
        {
            header: "Date",
            accessorKey: "date",
            cell: (item: { date: string }) => dateFormat(item.date, "DD-MM-YYYY"),
        },
        {
            header: "Code",
            accessorKey: "code",
        },
        {
            header: "Created At",
            accessorKey: "createdAt",
            cell: (item: { createdAt: string }) => dateFormat(item.createdAt, "DD-MM-YYYY"),
        },
        {
            header: "Created By",
            accessorKey: "createdBy",
        },
        {
            header: "Action",
            accessorKey: "id",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cell: (item: any) => (
                <div className="flex items-center gap-2">
                    <ButtonExportDropdown />

                    {/* Detail */}
                    <ButtonLink
                        href={`/timeline-schedules/${item.id}`}
                        variant="warning"
                        size="xs"
                    // title="Detail"
                    >
                        <Info className="w-4 h-4" /> Detail
                    </ButtonLink>
                </div >
            ),
        },
    ];

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Schedules', href: '/schedules' }]} />
            <div className="space-y-6">

                <DataTable
                    title="Schedule List"
                    columns={columns}
                    data={scheduleTimelines || []}
                    isLoading={false}
                    pagination={{
                        currentPage: 1,
                        totalPages: 1,
                        totalItems: 20,
                        itemsPerPage: 10,
                        onPageChange: () => { },
                        onLimitChange: () => { },
                    }}
                    search={{
                        value: "",
                        onChange: () => { },
                        placeholder: "Search schedule...",
                    }}
                />
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <OperatorListContent />
        </Suspense>
    );
}
