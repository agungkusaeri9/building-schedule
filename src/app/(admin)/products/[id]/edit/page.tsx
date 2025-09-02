"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import React from 'react'
import toast from 'react-hot-toast';

const EditUserPage = () => {


    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Shift', href: '/shift' }, { label: 'Edit' }]} />
            <div className="space-y-6">
                <ComponentCard title="Edit Shift">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        toast.success("Shift updated successfully");
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
                            label="Start Time"
                            name="start_time"
                            type="time"
                            required
                            placeholder="Enter Start Time"
                        // register={register("name")}
                        // error={errors.name}
                        />
                        <InputLabel
                            label="End Time"
                            name="end_time"
                            type="time"
                            required
                            placeholder="Enter End Time"
                        // register={register("name")}
                        // error={errors.name}
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
                                Update Shift
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    )
}

export default EditUserPage
