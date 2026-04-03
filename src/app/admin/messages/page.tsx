import { createClient } from '@/lib/supabase/server'
import { MessageSquare, CheckCircle } from 'lucide-react'

export default async function AdminMessagesPage() {
  const supabase = await createClient()

  // Fetch all messages that are unread or meant for admin
  const { data: messages, error } = await supabase
    .from('messages')
    .select('*, sender:profiles!sender_id(full_name, phone)')
    .order('created_at', { ascending: false })
    
  if (error) console.error("Messages fetch error:", error.message)

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-serif text-charcoal mb-2">Patient Messages</h1>
      <p className="text-gray-500 mb-8">Secure communication inbox</p>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
         <div className="space-y-4">
            {messages?.length === 0 ? (
               <p className="text-center py-8 text-gray-500">No messages in the inbox.</p>
            ) : (
              messages?.map((msg) => (
                 <div key={msg.id} className="border p-4 rounded-xl flex items-start gap-4 hover:shadow-sm transition-shadow bg-gray-50/50">
                    <div className="bg-rose-gold/10 p-3 rounded-full shrink-0 text-rose-gold">
                      <MessageSquare size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                           <h4 className="font-bold text-charcoal">{msg.sender?.full_name}</h4>
                           <p className="text-xs text-gray-500">{msg.sender?.phone || 'No phone'}</p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(msg.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700 bg-white p-3 rounded-lg border text-sm">{msg.content}</p>
                      
                      <div className="mt-3 flex gap-2">
                        <button className="text-teal text-sm font-medium hover:underline">Reply</button>
                        <button className="text-gray-400 text-sm hover:text-charcoal transition-colors flex items-center gap-1 ml-4 border-l pl-4">
                           <CheckCircle size={14} /> Mark Read
                        </button>
                      </div>
                    </div>
                 </div>
              ))
            )}
         </div>
      </div>
    </div>
  )
}
