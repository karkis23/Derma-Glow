'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { 
  UploadCloud, 
  CheckCircle2, 
  Image as ImageIcon, 
  Tag, 
  Plus, 
  Edit, 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  Clock, 
  IndianRupee, 
  ArrowRight,
  TrendingUp,
  Layout,
  Package,
  Settings,
  Trash2,
  AlertTriangle,
  Upload
} from 'lucide-react'
import { upsertService, toggleServiceStatus, upsertGalleryPhoto, deleteGalleryPhoto } from './actions'

interface Service {
  id: string
  name: string
  slug: string
  description?: string
  long_description?: string
  price: number
  duration_minutes: number
  category: string
  image_url?: string
  is_active: boolean
}

interface GalleryPhoto {
  id: string
  title: string
  description?: string
  before_image_url: string
  after_image_url: string
  service_id?: string
  is_published: boolean
  consent_given: boolean
  created_at: string
  services?: { name: string }
}

interface AssetManagerProps {
  initialServices: Service[]
  initialGallery: GalleryPhoto[]
}

export default function AssetManagerUI({ initialServices, initialGallery }: AssetManagerProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'gallery' | 'services'>('gallery')
  const [services] = useState<Service[]>(initialServices)
  const [gallery, setGallery] = useState<GalleryPhoto[]>(initialGallery)
  
  // UI States
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null)
  const [isAddingService, setIsAddingService] = useState(false)
  
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null)
  const [isAddingPhoto, setIsAddingPhoto] = useState(false)
  
  const [isPending, startTransition] = useTransition()
  
  // Shared status messages
  const [success, setSuccess] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // Form states data
  const [serviceFormData, setServiceFormData] = useState<Partial<Service>>({})
  const [photoFormData, setPhotoFormData] = useState<Partial<GalleryPhoto>>({})

  const categories = Array.from(new Set(services.map(s => s.category)))
  if (!categories.includes('Medical Aesthetics')) categories.push('Medical Aesthetics')
  if (!categories.includes('Clinical Dermatology')) categories.push('Clinical Dermatology')

  const handleToggleService = async (id: string, currentStatus: boolean) => {
    startTransition(async () => {
      const res = await toggleServiceStatus(id, currentStatus)
      if (res.success) router.refresh()
      else setErrorMsg(res.error || 'Failed to toggle status')
    })
  }

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement)
    if (editingServiceId) form.append('id', editingServiceId)
    
    startTransition(async () => {
      const res = await upsertService(form)
      if (res.success) {
        setEditingServiceId(null)
        setIsAddingService(false)
        setSuccess('Service saved successfully.')
        router.refresh()
      } else setErrorMsg(res.error || 'Failed to save service.')
    })
  }

  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement)
    if (editingPhotoId) form.append('id', editingPhotoId)
    
    startTransition(async () => {
      const res = await upsertGalleryPhoto(form)
      if (res.success) {
        setEditingPhotoId(null)
        setIsAddingPhoto(false)
        setSuccess('Gallery photo saved successfully.')
        router.refresh()
      } else setErrorMsg(res.error || 'Failed to save photo.')
    })
  }

  const handleDeletePhoto = async (id: string) => {
    if (!confirm('Are you sure you want to delete this result photo?')) return
    startTransition(async () => {
      const res = await deleteGalleryPhoto(id)
      if (res.success) {
        setSuccess('Photo removed from gallery.')
        router.refresh()
      } else setErrorMsg(res.error || 'Error deleting photo.')
    })
  }

  const handleMediaUpload = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: 'before' | 'after' | 'serviceIcon') => {
      const file = event.target.files?.[0]
      if (!file) return
      
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `gallery/${fileName}`

      setSuccess('Uploading image...')
      const supabase = createClient()
      const { data, error } = await supabase.storage.from('clinic_assets').upload(filePath, file)
      
      if (error) {
        setErrorMsg('Upload failed: ' + error.message)
        return
      }

      const { data: { publicUrl } } = supabase.storage.from('clinic_assets').getPublicUrl(filePath)
      
      if (fieldName === 'before') setPhotoFormData(prev => ({ ...prev, before_image_url: publicUrl }))
      if (fieldName === 'after') setPhotoFormData(prev => ({ ...prev, after_image_url: publicUrl }))
      if (fieldName === 'serviceIcon') setServiceFormData(prev => ({ ...prev, image_url: publicUrl }))
      
      setSuccess('Upload complete!')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-charcoal mb-2">Clinic Asset Manager</h1>
          <p className="text-gray-500 text-lg">Central hub for treatment records and marketing assets.</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'gallery' ? 'bg-white text-charcoal shadow-sm' : 'text-gray-500 hover:text-charcoal'}`}
          >
            <div className="flex items-center gap-2"><ImageIcon size={16} /> Image Gallery</div>
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'services' ? 'bg-white text-charcoal shadow-sm' : 'text-gray-500 hover:text-charcoal'}`}
          >
            <div className="flex items-center gap-2"><Layout size={16} /> Service Menu</div>
          </button>
        </div>
      </div>

      {success && (
        <div className="p-4 bg-teal/10 text-teal-700 rounded-2xl border border-teal-200 flex items-center justify-between font-medium animate-in fade-in">
           <div className="flex items-center gap-2"><CheckCircle2 size={18} /> {success}</div>
           <button onClick={() => setSuccess('')}><X size={16} /></button>
        </div>
      )}
      
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200 flex items-center justify-between font-medium">
           <div className="flex items-center gap-2"><AlertTriangle size={18} /> {errorMsg}</div>
           <button onClick={() => setErrorMsg('')}><X size={16} /></button>
        </div>
      )}

      {activeTab === 'gallery' ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-serif text-charcoal flex items-center gap-2">
              <TrendingUp className="text-rose-gold" size={24} /> 
              Patient Results Gallery
            </h2>
            <button 
              onClick={() => {
                setIsAddingPhoto(true)
                setEditingPhotoId(null)
                setPhotoFormData({})
              }}
              className="bg-charcoal hover:bg-black text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-md group"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add Before/After
            </button>
          </div>

          {(isAddingPhoto || editingPhotoId) && (
            <div className="glass bg-white p-8 rounded-3xl border-2 border-rose-gold/20 shadow-xl">
              <form onSubmit={handleSavePhoto} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Patient Result Title</label>
                        <input required name="title" type="text" defaultValue={photoFormData.title} className="w-full px-4 py-3 border rounded-xl outline-none focus:border-teal" placeholder="e.g. 2 Sessions Laser Resurfacing" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Linked Treatment</label>
                        <select name="service_id" defaultValue={photoFormData.service_id} className="w-full px-4 py-3 border rounded-xl outline-none focus:border-teal">
                          <option value="">No specific treatment linked</option>
                          {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Clinical Notes</label>
                        <textarea rows={3} name="description" defaultValue={photoFormData.description} className="w-full px-4 py-3 border rounded-xl outline-none focus:border-teal resize-none" placeholder="Details about patient reaction, downtime..." />
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-700">Before Photo</label>
                        <div className="aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center relative overflow-hidden group">
                           {photoFormData.before_image_url ? (
                             <img src={photoFormData.before_image_url} className="w-full h-full object-cover" />
                           ) : (
                             <Upload size={32} className="text-gray-300" />
                           )}
                           <input type="file" accept="image/*" onChange={(e) => handleMediaUpload(e, 'before')} className="absolute inset-0 opacity-0 cursor-pointer" />
                           <input type="hidden" name="before_image_url" value={photoFormData.before_image_url || ''} />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold pointer-events-none">CHANGE</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-700">After Photo</label>
                        <div className="aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center relative overflow-hidden group">
                           {photoFormData.after_image_url ? (
                             <img src={photoFormData.after_image_url} className="w-full h-full object-cover" />
                           ) : (
                             <Upload size={32} className="text-gray-300" />
                           )}
                           <input type="file" accept="image/*" onChange={(e) => handleMediaUpload(e, 'after')} className="absolute inset-0 opacity-0 cursor-pointer" />
                           <input type="hidden" name="after_image_url" value={photoFormData.after_image_url || ''} />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold pointer-events-none">CHANGE</div>
                        </div>
                      </div>
                   </div>
                </div>

                <div className="flex flex-wrap gap-6 items-center justify-between pt-6 border-t border-gray-100">
                   <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="is_published" defaultChecked={photoFormData.is_published ?? true} className="w-4 h-4 text-teal rounded" />
                        <span className="text-sm font-medium text-gray-600">Publish to Website</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input required type="checkbox" name="consent_given" defaultChecked={photoFormData.consent_given} className="w-4 h-4 text-teal rounded" />
                        <span className="text-sm font-medium text-gray-600">Patient Consent Verified</span>
                      </label>
                   </div>
                   <div className="flex gap-4">
                      <button type="button" onClick={() => { setIsAddingPhoto(false); setEditingPhotoId(null); }} className="px-6 py-2 underline text-gray-500">Discard</button>
                      <button disabled={isPending} type="submit" className="bg-teal text-white px-10 py-3 rounded-xl font-bold shadow-lg hover:bg-teal-light transition-all disabled:bg-gray-300">
                        {isPending ? 'Syncing...' : 'Save Result'}
                      </button>
                   </div>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {gallery.map(photo => (
               <div key={photo.id} className="glass bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col group">
                  <div className="flex h-48 overflow-hidden bg-gray-100 relative">
                     <div className="flex-1 border-r border-white/50 relative">
                        <img src={photo.before_image_url} className="w-full h-full object-cover grayscale opacity-80" />
                        <span className="absolute bottom-2 left-2 bg-white/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold">BEFORE</span>
                     </div>
                     <div className="flex-1 relative">
                        <img src={photo.after_image_url} className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 right-2 bg-teal text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm">AFTER</span>
                     </div>
                     
                     <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditingPhotoId(photo.id); setPhotoFormData(photo); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="p-2 bg-white rounded-full text-teal shadow-lg hover:scale-110 transition-transform">
                           <Edit size={16} />
                        </button>
                        <button onClick={() => handleDeletePhoto(photo.id)} className="p-2 bg-white rounded-full text-red-500 shadow-lg hover:scale-110 transition-transform">
                           <Trash2 size={16} />
                        </button>
                     </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-teal mb-2">
                        {photo.services?.name || 'General Skin Care'}
                     </span>
                     <h4 className="font-serif text-lg text-charcoal mb-1 leading-tight">{photo.title}</h4>
                     <p className="text-xs text-gray-500 line-clamp-2 italic mb-4">{photo.description || 'No additional notes provided.'}</p>
                     
                     <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-50">
                        <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${photo.is_published ? 'text-green-600' : 'text-gray-400'}`}>
                           <div className={`w-1.5 h-1.5 rounded-full ${photo.is_published ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                           {photo.is_published ? 'Live on Site' : 'Unpublished'}
                        </div>
                        <span className="text-[10px] text-gray-400">{new Date(photo.created_at).toLocaleDateString()}</span>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      ) : (
        /* SERVICES TAB - REMAINS LARGELY SAME BUT INTEGRATED */
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-serif text-charcoal flex items-center gap-2">
              <Package className="text-teal" size={24} /> 
              Treatment Menu
            </h2>
            <button 
              onClick={() => { setIsAddingService(true); setEditingServiceId(null); setServiceFormData({}); }}
              className="bg-teal hover:bg-teal-light text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-md"
            >
              <Plus size={18} /> Add New Treatment
            </button>
          </div>

          {(isAddingService || editingServiceId) && (
            <div className="glass bg-white p-8 rounded-3xl border-2 border-teal/20 shadow-xl">
              <form onSubmit={handleSaveService} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Service Name</label>
                    <input required name="name" type="text" defaultValue={serviceFormData.name} className="w-full px-4 py-3 border rounded-xl outline-none focus:border-teal" placeholder="e.g. Advanced Chemical Peel" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Price (₹)</label>
                      <input required name="price" type="number" defaultValue={serviceFormData.price} className="w-full px-4 py-3 border rounded-xl outline-none focus:border-teal" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Duration (Min)</label>
                      <input required name="duration_minutes" type="number" defaultValue={serviceFormData.duration_minutes} className="w-full px-4 py-3 border rounded-xl outline-none focus:border-teal" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                    <input list="category-options" required name="category" type="text" defaultValue={serviceFormData.category} className="w-full px-4 py-3 border rounded-xl outline-none focus:border-teal" />
                    <datalist id="category-options">{categories.map(c => <option key={c} value={c} />)}</datalist>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Service Image URL</label>
                    <div className="flex gap-2">
                       <input name="image_url" type="text" value={serviceFormData.image_url || ''} readOnly className="flex-1 px-4 py-3 border rounded-xl bg-gray-50 text-xs" />
                       <label className="bg-gray-100 p-3 rounded-xl cursor-pointer hover:bg-gray-200"><Upload size={20} /><input type="file" className="hidden" onChange={(e) => handleMediaUpload(e, 'serviceIcon')} /></label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                    <textarea rows={5} required name="description" defaultValue={serviceFormData.description} className="w-full px-4 py-3 border rounded-xl outline-none focus:border-teal resize-none" />
                  </div>
                </div>
                <div className="md:col-span-2 flex justify-between items-center pt-4 border-t border-gray-100">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="is_active" defaultChecked={serviceFormData.is_active ?? true} className="w-4 h-4 text-teal rounded" />
                        <span className="text-sm font-medium text-gray-600">Active and Bookable</span>
                    </label>
                    <div className="flex gap-4">
                      <button type="button" onClick={() => { setIsAddingService(false); setEditingServiceId(null); }} className="px-4 py-2">Cancel</button>
                      <button disabled={isPending} type="submit" className="bg-charcoal text-white px-8 py-3 rounded-xl font-bold shadow-lg">Save Treatment</button>
                    </div>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b bg-gray-50/50">
                      <th className="py-4 px-6 font-semibold text-sm">Treatment</th>
                      <th className="py-4 px-6 font-semibold text-sm">Category</th>
                      <th className="py-4 px-6 font-semibold text-sm text-right">Price</th>
                      <th className="py-4 px-6 font-semibold text-sm text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(s => (
                      <tr key={s.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="py-5 px-6">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                {s.image_url ? <img src={s.image_url} className="w-full h-full object-cover" /> : <Package className="w-full h-full p-2 text-gray-300" />}
                              </div>
                              <div className="font-bold">{s.name}</div>
                           </div>
                        </td>
                        <td className="py-5 px-6"><span className="px-2 py-1 rounded bg-rose-gold/10 text-rose-gold text-[10px] font-bold uppercase">{s.category}</span></td>
                        <td className="py-5 px-6 text-right font-bold">₹{s.price}</td>
                        <td className="py-5 px-6 text-center flex justify-center gap-2">
                           <button onClick={() => { setEditingServiceId(s.id); setServiceFormData(s); setIsAddingService(false); }} className="p-2 text-teal"><Edit size={18} /></button>
                           <button onClick={() => handleToggleService(s.id, s.is_active)} className={s.is_active ? 'text-green-500' : 'text-gray-300'}>{s.is_active ? <Eye size={18} /> : <EyeOff size={18} />}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        </div>
      )}
    </div>
  )
}
