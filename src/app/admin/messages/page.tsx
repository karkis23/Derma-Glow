import { createClient } from '@/lib/supabase/server'
import { MessageSquare, CheckCircle, Send } from 'lucide-react'
import { replyToMessage, markMessageRead } from './actions'

export default async function AdminMessagesPage() {
  const supabase = await createClient()

  const { data: messages, error } = await supabase
    .from('messages')
    .select('*, sender:profiles!sender_id(full_name, phone, role)')
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
              messages?.map((msg: any) => (
                 <div key={msg.id} className={`border p-4 rounded-xl flex flex-col gap-4 hover:shadow-sm transition-shadow ${msg.is_read ? 'bg-gray-50/30' : 'bg-amber-50/30 border-amber-200/50'}`}>
                    <div className="flex items-start gap-4">
                      <div className="bg-rose-gold/10 p-3 rounded-full shrink-0 text-rose-gold">
                        <MessageSquare size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                             <h4 className="font-bold text-charcoal flex items-center gap-2">
                               {msg.sender?.full_name}
                               {!msg.is_read && (
                                 <span className="inline-block w-2 h-2 bg-amber-500 rounded-full" title="Unread"></span>
                               )}
                             </h4>
                             <p className="text-xs text-gray-500">{msg.sender?.phone || 'No phone'} · {msg.sender?.role || 'patient'}</p>
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(msg.created_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-700 bg-white p-3 rounded-lg border text-sm">{msg.content}</p>
                        
                        <div className="mt-3 flex items-center gap-3">
                          {/* Mark Read Button */}
                          {!msg.is_read && (
                            <form action={async () => {
                              'use server'
                              await markMessageRead(msg.id)
                            }}>
                              <button 
                                type="submit"
                                className="text-gray-400 text-sm hover:text-green-600 transition-colors flex items-center gap-1"
                              >
                                <CheckCircle size={14} /> Mark Read
                              </button>
                            </form>
                          )}
                          {msg.is_read && (
                            <span className="text-green-500 text-xs flex items-center gap-1">
                              <CheckCircle size={12} /> Read
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Reply Form */}
                    <form action={async (formData: FormData) => {
                      'use server'
                      await replyToMessage(formData)
                    }} className="ml-14">
                      <input type="hidden" name="recipient_id" value={msg.sender_id} />
                      <div className="flex gap-2">
                        <input
                          name="content"
                          type="text"
                          required
                          placeholder={`Reply to ${msg.sender?.full_name?.split(' ')[0] || 'patient'}...`}
                          className="flex-1 px-4 py-2 border rounded-xl text-sm outline-none focus:border-teal focus:ring-1 focus:ring-teal/20 bg-gray-50"
                        />
                        <button 
                          type="submit"
                          className="bg-teal hover:bg-teal-light text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1 shadow-sm"
                        >
                          <Send size={14} /> Reply
                        </button>
                      </div>
                    </form>
                 </div>
              ))
            )}
         </div>
      </div>
    </div>
  )
}
