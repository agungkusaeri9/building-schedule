"use client";
import React, { Suspense } from "react";
import ButtonLink from "@/components/ui/button/ButtonLink";
import Breadcrumb from "@/components/common/Breadcrumb";
import { confirmDelete } from "@/utils/confirm";
import Button from "@/components/ui/button/Button";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";
import shifts from '@/data/shift.json';
import toast from "react-hot-toast";


function OperatorListContent() {
    const handleDelete = async () => {
        const confirmed = await confirmDelete();
        if (confirmed) {
            // remove(id);
            toast.success("Machine deleted successfully.");
        }
    };

    const columns = [
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Start Time",
            accessorKey: "start_time",
        },
        {
            header: "End Time",
            accessorKey: "end_time",
        },
        {
            header: "Action",
            accessorKey: "id",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cell: (item: any) => (
                <div className="flex items-center gap-2">
                    <ButtonLink
                        href={`/shift/${item.id}/edit`}
                        variant='info'
                        size='xs'
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
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Shifts', href: '/shift' }]} />
            <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='xs' href="/shift/create">Create Shift</ButtonLink>
                </div>
                <DataTable
                    title="Machine List"
                    columns={columns}
                    data={shifts || []}
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
                        placeholder: "Search machine...",
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
