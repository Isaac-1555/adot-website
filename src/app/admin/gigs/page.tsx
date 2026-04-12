"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Plus, Edit, Trash2, X } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Event = any;

const emptyForm = {
  title: "", date: "", startTime: "", endTime: "", venue: "", 
  city: "", eventType: "club", status: "booked", visibility: true, externalUrl: ""
};

export default function AdminGigs() {
  const events = useQuery(api.api.getEvents);
  const createEvent = useMutation(api.api.createEvent);
  const updateEvent = useMutation(api.api.updateEvent);
  const deleteEvent = useMutation(api.api.deleteEvent);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openModal = (gig?: Event) => {
    if (gig) {
      setForm({ ...gig });
      setEditingId(gig._id);
    } else {
      setForm(emptyForm);
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      const { _id, _creationTime, ...updateData } = form as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await updateEvent({ id: editingId as any, ...updateData });
    } else {
      await createEvent(form);
    }
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this gig?")) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await deleteEvent({ id: id as any });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-[family-name:var(--font-heading)] font-bold">Gigs & Events</h1>
          <p className="text-[var(--text-muted)]">Manage your calendar and availability.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-primary)] text-[var(--bg)] font-bold rounded hover:bg-[var(--accent-primary-hover)] transition-colors"
        >
          <Plus className="w-5 h-5" /> ADD GIG
        </button>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)] text-sm">
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Event</th>
              <th className="p-4 font-medium">Location</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events?.map((gig: Event) => (
              <tr key={gig._id} className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg)] transition-colors">
                <td className="p-4">{new Date(gig.date).toLocaleDateString()}</td>
                <td className="p-4 font-semibold">{gig.title}</td>
                <td className="p-4">{gig.venue}, {gig.city}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded uppercase ${
                    gig.status === 'booked' ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]' : 'bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary)]'
                  }`}>
                    {gig.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => openModal(gig)} className="p-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors inline-block">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(gig._id)} className="p-2 text-[var(--text-muted)] hover:text-red-500 transition-colors inline-block ml-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {events?.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[var(--text-muted)]">No gigs found. Add your first gig!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-[var(--border-subtle)]">
              <h2 className="text-xl font-[family-name:var(--font-heading)] font-bold">{editingId ? "Edit Gig" : "Add Gig"}</h2>
              <button onClick={closeModal} className="text-[var(--text-muted)] hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Title *</label>
                  <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none" />
                </div>
                
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Date *</label>
                  <input type="date" required value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Event Type</label>
                  <select value={form.eventType} onChange={e => setForm({...form, eventType: e.target.value})} className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none">
                    <option value="club">Club / Bar</option>
                    <option value="wedding">Wedding</option>
                    <option value="private">Private Event</option>
                    <option value="corporate">Corporate</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Start Time</label>
                  <input type="time" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">End Time</label>
                  <input type="time" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none" />
                </div>

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Venue *</label>
                  <input type="text" required value={form.venue} onChange={e => setForm({...form, venue: e.target.value})} className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">City *</label>
                  <input type="text" required value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none" />
                </div>

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none">
                    <option value="booked">Booked</option>
                    <option value="tentative">Tentative</option>
                  </select>
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.visibility} onChange={e => setForm({...form, visibility: e.target.checked})} className="w-4 h-4 accent-[var(--accent-primary)]" />
                    <span className="text-sm text-[var(--text-muted)]">Visible on public calendar</span>
                  </label>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm text-[var(--text-muted)] mb-1">External URL (Tickets/Info)</label>
                  <input type="url" value={form.externalUrl} onChange={e => setForm({...form, externalUrl: e.target.value})} className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none" placeholder="https://" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-[var(--border-subtle)]">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-[var(--border-subtle)] rounded hover:bg-[var(--bg)] transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[var(--accent-primary)] text-[var(--bg)] font-bold rounded hover:bg-[var(--accent-primary-hover)] transition-colors">{editingId ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}