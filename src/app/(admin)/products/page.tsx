"use client";
import React, { Suspense } from "react";
import ButtonLink from "@/components/ui/button/ButtonLink";
import Breadcrumb from "@/components/common/Breadcrumb";
import { confirmDelete } from "@/utils/confirm";
import Button from "@/components/ui/button/Button";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";
import products from '@/data/product.json';
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
            header: "Code",
            accessorKey: "code",
        },
        {
            header: "Name",
            accessorKey: "name",
        },

        {
            header: "Description",
            accessorKey: "description",
        },
        {
            header: "Materials",
            accessorKey: "materials",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cell: (item: any) => (
                <>
                    <ul>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {item.materials.map((material: any) => (
                            <li className="text-sm text-white text-center bg-gray-500 px-2 mb-1 rounded" key={material.id}>{material.name}</li>
                        ))}
                    </ul>
                </>
            )
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
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Products', href: '/products' }]} />
            <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='xs' href="/products/create">Create Product</ButtonLink>
                </div>
                <DataTable
                    title="Product List"
                    columns={columns}
                    data={products || []}
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
                        placeholder: "Search products...",
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
