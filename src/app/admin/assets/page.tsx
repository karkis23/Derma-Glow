'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { UploadCloud, CheckCircle2, Image as ImageIcon } from 'lucide-react'

export default function AssetManagerPage() {
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setErrorMsg('')
      setSuccess('')
      
      if (!event.target.files || event.target.files.length === 0) {
        return
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = `gallery/${fileName}`

      setUploading(true)

      const supabase = createClient()
      
      const { error: uploadError } = await supabase.storage
        .from('clinic_assets')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      setSuccess('Image uploaded successfully.')
    } catch (error: any) {
      setErrorMsg(error.message || 'Error uploading file.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-serif text-charcoal mb-2">Asset Manager</h1>
      <p className="text-gray-500 mb-8">Upload clinic images, before/after photos, and gallery assets.</p>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-medium mb-6">Upload New Image</h2>
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 flex items-center gap-2 font-medium">
             <CheckCircle2 size={18} /> {success}
          </div>
        )}
        
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 font-medium">
             {errorMsg}
          </div>
        )}

        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:bg-gray-50 transition-colors">
          <UploadCloud size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">Drag and drop an image, or click to browse</p>
          
          <label className="bg-teal hover:bg-teal-light text-white px-6 py-3 rounded-lg cursor-pointer transition-colors shadow-sm inline-block font-medium">
            {uploading ? 'Uploading...' : 'Select File'}
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>
    </div>
  )
}
