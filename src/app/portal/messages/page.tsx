import { createClient } from '@/lib/supabase/server'
import { Send, UserCheck, User } from 'lucide-react'
import { sendMessage } from './actions'
import { format } from 'date-fns'

export default async function MessagesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch messages where user is either sender or recipient
  const { data: messages } = await supabase
    .from('messages')
    .select('*, sender:profiles!messages_sender_id_fkey(full_name, role), recipient:profiles!messages_recipient_id_fkey(full_name, role)')
    .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
    .order('created_at', { ascending: true })

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      <div className="mb-6 border-b border-charcoal/10 pb-4">
        <h1 className="text-3xl font-serif text-charcoal">Secure Messages</h1>
        <p className="text-gray-600 text-sm mt-1">Communicate directly with your care team. Responses typically take 24 hours.</p>
      </div>

      {/* Chat History Area */}
      <div className="flex-1 overflow-y-auto glass rounded-3xl p-6 mb-6 shadow-sm border border-white custom-scrollbar flex flex-col space-y-6">
        {(!messages || messages.length === 0) ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center text-teal mb-4">
              <UserCheck size={32} />
            </div>
            <h3 className="text-xl font-serif text-charcoal mb-2">Your Care Team is Here</h3>
            <p className="text-gray-500 max-w-sm">
              Use this secure thread to ask questions about your treatments, request refills, or follow up on your appointments.
            </p>
          </div>
        ) : (
          messages.map((msg: any) => {
            const isMe = msg.sender_id === user.id
            return (
              <div key={msg.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[80%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${isMe ? 'bg-teal/20 text-teal' : 'bg-charcoal text-rose-gold'}`}>
                    {isMe ? <User size={18} /> : <span className="font-serif font-bold">DG</span>}
                  </div>

                  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-500">
                        {isMe ? 'You' : msg.sender?.full_name || 'Clinic Team'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {format(new Date(msg.created_at), 'MMM d, h:mm a')}
                      </span>
                    </div>

                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      isMe 
                        ? 'bg-teal text-white rounded-tr-none' 
                        : 'bg-white text-charcoal rounded-tl-none border border-gray-100'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Message Input Area */}
      <form action={sendMessage} className="relative z-10 shrink-0">
        <div className="glass p-2 rounded-[2rem] border border-white flex items-center shadow-lg bg-white/70">
          <textarea
            name="content"
            placeholder="Type your message securely..."
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none h-14 py-4 px-6 outline-none text-charcoal"
            required
          ></textarea>
          <button 
            type="submit" 
            className="w-14 h-14 bg-rose-gold hover:bg-rose-gold-light text-white rounded-full flex items-center justify-center shrink-0 transition-colors shadow-md"
          >
            <Send size={20} className="ml-1" />
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-3 flex items-center justify-center gap-1">
          Messages are encrypted securely. For emergencies, please dial 911.
        </p>
      </form>
    </div>
  )
}
