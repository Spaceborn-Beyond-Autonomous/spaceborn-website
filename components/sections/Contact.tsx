'use client'

import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
    return (
        <div id='contact' className="min-h-screen bg-black flex">
            <div className="w-full shadow-2xl py-10">

                <div className="px-8 py-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">Get In Touch</h1>
                    <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
                        We'll create high-quality solutions and help you scale your product effectively.
                    </p>
                </div>

                <div className="flex flex-col md:h-[70vh] cartoon-border2 mx-auto rounded-3xl overflow-clip md:flex-row max-w-[85vw]">

                    <div className="md:w-1/3 h-[70vh] bg-[#0f0f0f] p-8 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-white mb-6">Contact Information</h2>

                            <div className="space-y-5 text-zinc-300 text-sm">
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4" />
                                    <span>+91 9876543210</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4" />
                                    <span>support@example.com</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4" />
                                    <span>Jharkhand, India</span>
                                </div>

                            </div>
                            <img src="/images/logo.png" alt="" />
                        </div>

                        <div className="mt-10 h-24 w-24 bg-zinc-900 rounded-full opacity-30" />
                    </div>

                    <div className="md:w-2/3 p-8 bg-white/5">
                        <form className="space-y-6">

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs text-zinc-400">Your Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full bg-transparent border-b border-zinc-700 py-2 text-white focus:outline-none focus:border-white transition" />
                                </div>

                                <div>
                                    <label className="text-xs text-zinc-400">Your Email</label>
                                    <input type="email" placeholder="john@example.com" className="w-full bg-transparent border-b border-zinc-700 py-2 text-white focus:outline-none focus:border-white transition" />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-zinc-400">Subject</label>
                                <input type="text" placeholder="I want to work with you" className="w-full bg-transparent border-b border-zinc-700 py-2 text-white focus:outline-none focus:border-white transition" />
                            </div>

                            <div>
                                <label className="text-xs text-zinc-400">Message</label>
                                <textarea rows={4} placeholder="Write your message" className="w-full bg-transparent border-b border-zinc-700 py-2 text-white focus:outline-none focus:border-white transition resize-none" />
                            </div>

                            <button type="submit" className="mt-4 px-6 py-2 border bg-white text-black border-zinc-600 cursor-pointer rounded-lg hover:bg-white/80 hover:text-black transition">
                                Send Message
                            </button>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}