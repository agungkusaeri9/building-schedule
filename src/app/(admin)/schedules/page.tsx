"use client";
import React, { Suspense } from "react";
import ButtonLink from "@/components/ui/button/ButtonLink";
import Breadcrumb from "@/components/common/Breadcrumb";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";
import requestSchedules from '@/data/request-schedule.json';
import { dateFormat } from "@/utils/dateFormat";


function OperatorListContent() {

    const columns = [
        {
            header: "Start Date",
            accessorKey: "startDate",
            cell: (item: { startDate: string }) => dateFormat(item.startDate, "DD-MM-YYYY"),
        },
        {
            header: "End Date",
            accessorKey: "endDate",
            cell: (item: { endDate: string }) => dateFormat(item.endDate, "DD-MM-YYYY"),
        },
        {
            header: "Code",
            accessorKey: "code",
        },

        {
            header: "Products",
            accessorKey: "products",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cell: (item: any) => (
                <>
                    <ul>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {item.products.map((product: any) => (
                            <li className="text-sm text-white text-left bg-gray-800 px-2 mb-1 rounded flex justify-between" key={product.id}>
                                <span className="w-2/4">
                                    Name : {product.name}
                                </span>
                                <span className="w-1/4">Qty : {product.quantity}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )
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
            header: "Status",
            accessorKey: "status",
            cell: (item: { status: string }) => {
                if (item.status === "completed") {
                    return <span className="bg-green-600 px-2 py-1 text-white rounded">Completed</span>
                } else {
                    return <span className="bg-yellow-600 px-2 py-1 text-white rounded">Pending</span>
                }
            },
        },
        {
            header: "Action",
            accessorKey: "id",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cell: (item: any) => (
                <div className="flex items-center gap-2">
                    <ButtonLink
                        href={`/schedules/${item.id}`}
                        variant='warning'
                        size='xs'
                    >
                        Detail
                    </ButtonLink>
                    <ButtonLink
                        href={`/schedules/${item.id}/process`}
                        variant='info'
                        size='xs'
                        disabled={item.status === "pending" ? false : true}
                    >
                        Process
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
                    data={requestSchedules || []}
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
