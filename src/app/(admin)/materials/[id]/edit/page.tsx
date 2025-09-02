"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import TextAreaLabel from '@/components/form/FormTextArea';
import Button from '@/components/ui/button/Button';
import React from 'react'
import toast from 'react-hot-toast';

const EditUserPage = () => {


    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Materials', href: '/materials' }, { label: 'Edit' }]} />
            <div className="space-y-6">
                <ComponentCard title="Edit Material">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        toast.success("Material updated successfully");
                    }}>
                        <InputLabel
                            label="Code"
                            name="code"
                            type="text"
                            required
                            placeholder="Enter Code"
                        />
                        <InputLabel
                            label="Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter Name"
                        />
                        <TextAreaLabel
                            rows={4}
                            register={() => { }}
                            label="Description"
                            name="description"
                            required
                            placeholder="Enter Description"
                        />
                        <TextAreaLabel
                            rows={4}
                            register={() => { }}
                            label="Specification"
                            name="Specification"
                            required
                            placeholder="Enter Specification"
                        />


                        <div className="flex justify-end gap-2 mt-6">
                            <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                className="px-4"
                            // onClick={() => reset()}
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                variant="primary"
                                className="px-4"
                            // disabled={isPending}
                            // loading={isPending}
                            >
                                Update Material
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    )
}

export default EditUserPage
