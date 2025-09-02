"use client"
import React, { useState } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import materials from '@/data/material.json';
import toast from 'react-hot-toast';

export default function CreateProduct() {
    // const { data: Materials } = useFetchData(MaterialService.getWithoutPagination, "Materials", false);
    // const { mutate: createMutation, isPending } = useCreateData(
    //     ProductService.create,
    //     ["productCreate"],
    //     "/products"
    // );

    const [form, setForm] = useState({
        name: '',
        description: '',
        materials: [
            { id: 0, quantity: 1 }
        ]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

        console.log(e.target.id);
    };

    const handleMaterialChange = (idx: number, value: number) => {
        setForm(prev => ({
            ...prev,
            materials: prev.materials.map((item, i) => i === idx ? { ...item, id: value } : item)
        }));
    };

    const handleQuantityChange = (idx: number, value: number) => {
        setForm(prev => ({
            ...prev,
            materials: prev.materials.map((item, i) => i === idx ? { ...item, quantity: value } : item)
        }));
    };

    const handleAddMaterial = () => {
        setForm(prev => ({
            ...prev,
            materials: [...prev.materials, { id: 0, quantity: 1 }]
        }));
    };

    const handleRemoveMaterial = (idx: number) => {
        setForm(prev => ({
            ...prev,
            materials: prev.materials.filter((_, i) => i !== idx)
        }));
    };

    const getAvailableMaterialOptions = (currentIdx: number) => {
        const selectedIds = form.materials
            .map((item, idx) => idx !== currentIdx ? item.id : null)
            .filter(id => typeof id === 'number' && id !== 0);
        return materials
            ? materials.filter((k: { id: number }) => !selectedIds.includes(k.id))
            : [];
    };


    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Products', href: '/products' },
                    { label: 'Create' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Create Product">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        toast.success("Product created successfully.");
                    }} className="space-y-4">
                        <h3 className="text-lg font-semibold mb-6">Form Product</h3>
                        <div className='grid grid-cols-3 gap-4'>
                            <InputLabel
                                label="Code"
                                name="code"
                                type="text"
                                required
                                placeholder="Enter product code"
                                // defaultValue={form.code}
                                onChange={handleChange}
                            />
                            <InputLabel
                                label="Name"
                                name="name"
                                type="text"
                                required
                                placeholder="Enter product name"
                                defaultValue={form.name}
                                onChange={handleChange}
                            />
                            <InputLabel
                                label="Description"
                                name="description"
                                type="text"
                                required
                                placeholder="Enter product description"
                                defaultValue={form.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex items-center justify-between'>
                            <h3 className="text-lg font-semibold mb-2">Form Part/Material</h3>
                            <Button variant="info" size='xs' type="button" onClick={handleAddMaterial} >
                                + Tambah Material/Part
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {form.materials.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="flex-1 min-w-0">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                                        <select
                                            className="w-full border rounded px-2 py-2"
                                            value={item.id}
                                            onChange={e => handleMaterialChange(idx, Number(e.target.value))}
                                            required
                                        >
                                            <option value={0}>Choose Material</option>
                                            {getAvailableMaterialOptions(idx).map((Material: { id: number; code: string; description: string; }) => (
                                                <option key={Material.id} value={Material.id}>
                                                    {Material.code} - {Material.description}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-40">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={e => handleQuantityChange(idx, Number(e.target.value))}
                                            required
                                            placeholder="Enter quantity"
                                            className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                                        />
                                    </div>
                                    <div className="w-28 flex items-start pt-6">
                                        <Button
                                            type="button"
                                            variant="danger"
                                            size="sm"
                                            className="ml-2 w-full"
                                            onClick={() => handleRemoveMaterial(idx)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <Button
                                type="submit"
                                size="sm"
                                variant="primary"
                                className="px-4"
                            // disabled={isPending}
                            // loading={isPending}
                            >
                                Create Product
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
