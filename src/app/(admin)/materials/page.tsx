"use client";
import React, { Suspense } from "react";
import ButtonLink from "@/components/ui/button/ButtonLink";
import Breadcrumb from "@/components/common/Breadcrumb";
import { confirmDelete } from "@/utils/confirm";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";
import materials from '@/data/material.json';
import toast from "react-hot-toast";
import Modal from "@/components/common/Modal";
import { useModal } from "@/hooks/useModal";
import { FileSpreadsheetIcon } from "lucide-react";
import Button from "@/components/ui/button/Button";
import InputLabel from "@/components/form/FormInput";


function OperatorListContent() {
    const { closeModal, isOpen, openModal } = useModal();
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
            header: "Specification",
            accessorKey: "specification",
        },
        {
            header: "Action",
            accessorKey: "id",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cell: (item: any) => (
                <div className="flex items-center gap-2">
                    <ButtonLink
                        href={`/materials/${item.id}/edit`}
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
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Materials', href: '/materials' }]} />
            <div className="space-y-6">
                <div className="flex justify-end mb-4 gap-2">
                    <Button size='xs' onClick={openModal} variant="success">
                        <FileSpreadsheetIcon className="h-4 w-4" aria-hidden />
                        Import
                    </Button>
                    <ButtonLink size='xs' href="/materials/create">Create Materials</ButtonLink>
                </div>
                <DataTable
                    title="Material List"
                    columns={columns}
                    data={materials || []}
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
                        placeholder: "Search material...",
                    }}
                />
            </div>

            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                title="Import Materials"
                size="md"
            >
                <>
                    <p className="text-sm leading-6 text-gray-500 dark:text-gray-400 mb-4">
                        Before uploading the file, please ensure that the file is in the correct format.
                        Download the sample file to understand the format. in
                        <a href="" className="text-brand-500">Download</a>
                    </p>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            toast.success("File uploaded successfully.");
                            closeModal();
                        }}
                    >
                        <div className="mb-4">
                            <InputLabel
                                label="File"
                                name="file"
                                type="file"
                                onChange={() => { }}
                            />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <Button
                                type="button"
                                onClick={closeModal}
                                size="sm"
                                variant="gray"
                            >
                                Cancel
                            </Button>
                            <Button size="sm" variant="primary">
                                Upload
                            </Button>
                        </div>
                    </form>
                </>
            </Modal>

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
