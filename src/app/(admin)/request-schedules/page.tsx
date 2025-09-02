"use client";
import React, { Suspense } from "react";
import ButtonLink from "@/components/ui/button/ButtonLink";
import Breadcrumb from "@/components/common/Breadcrumb";
import { confirmDelete } from "@/utils/confirm";
import Button from "@/components/ui/button/Button";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";
import requestSchedules from '@/data/request-schedule.json';
import toast from "react-hot-toast";
import { dateFormat } from "@/utils/dateFormat";


function OperatorListContent() {
    const handleDelete = async () => {
        const confirmed = await confirmDelete();
        if (confirmed) {
            // remove(id);
            toast.success("Request schedule deleted successfully.");
        }
    };

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
                        href={`/request-schedules/${item.id}/edit`}
                        variant='info'
                        size='xs'
                        disabled={item.status === "pending" ? false : true}
                    >
                        Edit
                    </ButtonLink>
                    <Button
                        onClick={() => handleDelete()}
                        variant='danger'
                        size='xs'
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Request Schedules', href: '/request-schedules' }]} />
            <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='xs' href="/request-schedules/create">Add Request Schedule</ButtonLink>
                </div>
                <DataTable
                    title="Request Schedule List"
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
                        placeholder: "Search request schedule...",
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
