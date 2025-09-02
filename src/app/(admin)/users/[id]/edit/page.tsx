"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import React from 'react'
import toast from 'react-hot-toast';

const EditUserPage = () => {


    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Users', href: '/users' }, { label: 'Edit' }]} />
            <div className="space-y-6">
                <ComponentCard title="Edit User">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        toast.success("User updated successfully");
                    }}>
                        <InputLabel
                            label="Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter Name"
                        // register={register("name")}
                        // error={errors.name}
                        />
                        <InputLabel
                            label="Username"
                            name="username"
                            type="text"
                            required
                            placeholder="Enter username"
                        // register={register("nik")}
                        // error={errors.nik}
                        />
                        <SelectLabel
                            label="Role"
                            name="role"
                            required
                            placeholder="Select role"
                            // register={register("nik")}
                            // error={errors.nik}
                            options={[
                                { value: "admin", label: "Admin" },
                                { value: "ppc", label: "PPC" },
                                { value: "p3", label: "P3" },
                            ]}
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
                                Update User
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    )
}

export default EditUserPage
