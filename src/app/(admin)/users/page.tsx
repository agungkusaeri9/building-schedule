"use client";
import React, { Suspense } from "react";
import ButtonLink from "@/components/ui/button/ButtonLink";
import Breadcrumb from "@/components/common/Breadcrumb";
import { confirmDelete } from "@/utils/confirm";
import Button from "@/components/ui/button/Button";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";
import dataUsers from '@/data/user.json';
import toast from "react-hot-toast";


function OperatorListContent() {
    // const {
    //     data: operators,
    //     isLoading,
    //     setKeyword,
    //     setCurrentPage,
    //     setLimit,
    //     limit,
    //     keyword,
    //     pagination
    // } = useFetchData(OperatorService.get, "operators");
    const handleDelete = async () => {
        const confirmed = await confirmDelete();
        if (confirmed) {
            // remove(id);
            toast.success("Data berhasil dihapus.");
        }
    };
    const users = dataUsers;

    const columns = [
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Username",
            accessorKey: "username",
        },
        {
            header: "Role",
            accessorKey: "role",
        },
        {
            header: "Action",
            accessorKey: "id",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cell: (item: any) => (
                <div className="flex items-center gap-2">
                    <ButtonLink
                        href={`/users/${item.id}/edit`}
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
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Users', href: '/users' }]} />
            <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='xs' href="/users/create">Create User</ButtonLink>
                </div>
                <DataTable
                    title="User List"
                    columns={columns}
                    data={users || []}
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
                        placeholder: "Search users...",
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
