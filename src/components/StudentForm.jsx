import { useState, useEffect } from 'react';

export default function StudentForm({ initialValues = { code:'', name:'', class:'' }, onSubmit, submitLabel = 'บันทึก' }) {
  const [form, setForm] = useState(initialValues);
  useEffect(() => setForm(initialValues), [initialValues]);
  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} className="grid gap-4">
      <input name="code" value={form.code} onChange={change} placeholder="รหัส" className="border p-3 rounded" />
      <input name="name" value={form.name} onChange={change} placeholder="ชื่อ-นามสกุล" className="border p-3 rounded" />
      <input name="class" value={form.class} onChange={change} placeholder="ระดับชั้น" className="border p-3 rounded" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">{submitLabel}</button>
    </form>
  );
}