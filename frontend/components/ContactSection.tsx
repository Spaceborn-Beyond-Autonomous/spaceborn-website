'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MapPin, Phone, Send, Rocket } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const contactInfo = [
    { icon: Mail, title: 'Email', details: 'contact@spaceborn.com', description: 'Send us a message anytime' },
    { icon: Phone, title: 'Phone', details: '+1 (555) 123-4567', description: '24/7 mission support' },
    { icon: MapPin, title: 'Location', details: 'Silicon Valley, CA', description: 'Space Technology Hub' }
  ]

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-gray-900/10 via-gray-800/10 to-gray-900/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-glow">
            <span className="text-white tracking-wider">SECURE YOUR FUTURE</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Ready to enhance your security with autonomous technology? Get in touch with our team 
            and let's discuss how Spaceborn can protect your assets and operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="hologram">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Rocket className="h-6 w-6 text-white" />
                <span className="uppercase tracking-wide">Secure Your Assets</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
                      Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
                    Company
                  </label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 resize-none"
                    placeholder="Tell us about your project and how we can help..."
                  />
                </div>

                <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 group" size="lg">
                  <span className="uppercase tracking-wider">Send Message</span>
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide text-glow">Get In Touch</h3>
              <p className="text-white/80 mb-8">
                Whether you need perimeter security, facility monitoring, event protection, 
                or want to integrate autonomous security drones into your operations, our team is here to help.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info) => {
                const InfoIcon = info.icon
                return (
                  <div key={info.title} className="flex items-start gap-4 p-4 rounded-lg hologram hover:border-white/50 transition-all duration-300">
                    <div className="p-3 bg-white rounded-lg">
                      <InfoIcon className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white uppercase tracking-wide">{info.title}</h4>
                      <p className="text-white font-medium">{info.details}</p>
                      <p className="text-sm text-white/60">{info.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="hologram rounded-2xl p-6">
              <h4 className="text-xl font-semibold text-white mb-3 uppercase tracking-wide text-glow">
                Security Operations Center
              </h4>
              <p className="text-white/80 mb-4">
                Our security operations center operates 24/7, providing real-time monitoring 
                and support for all Spaceborn security drone deployments worldwide.
              </p>
              <div className="flex items-center gap-2 text-white">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-medium uppercase tracking-wider">Online Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
