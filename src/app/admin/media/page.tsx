"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Plus, Edit, Trash2, X, Play, Film } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Media = any;

const emptyForm = {
  title: "", description: "", type: "audio", platform: "soundcloud", 
  embedUrl: "", category: "", sortOrder: 0
};

export default function AdminMedia() {
  const media = useQuery(api.api.getMedia);
  const createMedia = useMutation(api.api.createMedia);
  const updateMedia = useMutation(api.api.updateMedia);
  const deleteMedia = useMutation(api.api.deleteMedia);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openModal = (item?: Media) => {
    if (item) {
      setForm({ ...item });
      setEditingId(item._id);
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
      await updateMedia({ id: editingId as any, ...updateData });
    } else {
      await createMedia(form);
    }
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this media item?")) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await deleteMedia({ id: id as any });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-[family-name:var(--font-heading)] font-bold">Media & Mixes</h1>
          <p className="text-[var(--text-muted)]">Manage your audio and video showcases.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-primary)] text-[var(--bg)] font-bold rounded hover:bg-[var(--accent-primary-hover)] transition-colors"
        >
          <Plus className="w-5 h-5" /> ADD MEDIA
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {media?.map((item: Media) => (
          <div key={item._id} className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--accent-secondary)]/30 transition-all flex gap-4 items-center">
            <div className="w-16 h-16 rounded bg-[var(--bg)] flex items-center justify-center flex-shrink-0">
              {item.type === "audio" ? (
                <Play className="w-6 h-6 text-[var(--accent-secondary)]" />
              ) : (
                <Film className="w-6 h-6 text-[var(--accent-secondary)]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{item.title}</h3>
              <p className="text-sm text-[var(--text-muted)] truncate">{item.description || "No description"}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border-subtle)] uppercase text-[var(--text-muted)]">
                  {item.platform}
                </span>
                {item.category && (
                  <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                    {item.category}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <button onClick={() => openModal(item)} className="p-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(item._id)} className="p-2 text-[var(--text-muted)] hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {media?.length === 0 && (
          <div className="col-span-2 p-8 text-center text-[var(--text-muted)] border border-dashed border-[var(--border-subtle)] rounded-lg">
            No media found. Add your first mix or video!
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-[var(--border-subtle)]">
              <h2 className="text-xl font-[family-name:var(--font-heading)] font-bold">{editingId ? "Edit Media" : "Add Media"}</h2>
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
                
                <div className="col-span-2">
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none" rows={2} />
                </div>

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Type</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none">
                    <option value="audio">Audio / Mix</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Platform</label>
                  <select value={form.platform} onChange={e => setForm({...form, platform: e.target.value})} className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none">
                    <option value="soundcloud">SoundCloud</option>
                    <option value="mixcloud">Mixcloud</option>
                    <option value="spotify">Spotify</option>
                    <option value="youtube">YouTube</option>
                    <option value="vimeo">Vimeo</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Embed URL (e.g. iframe src) *</label>
                  <input type="url" required value={form.embedUrl} onChange={e => setForm({...form, embedUrl: e.target.value})} className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none" placeholder="https://" />
                </div>

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Category (e.g. &quot;Club Sets&quot;)</label>
                  <input type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none" />
                </div>

                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Sort Order</label>
                  <input type="number" value={form.sortOrder} onChange={e => setForm({...form, sortOrder: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--border-subtle)] rounded focus:border-[var(--accent-primary)] outline-none" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-[var(--border-subtle)]">
                <button type="button" onClick={closeModal} className="px-4 py-2 border border-[var(--border-subtle)] rounded hover:bg-[var(--bg)] transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[var(--accent-primary)] text-[var(--bg)] font-bold rounded hover:bg-[var(--accent-primary-hover)] transition-colors">{editingId ? "Update" : "Add Media"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}