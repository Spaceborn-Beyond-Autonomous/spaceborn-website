'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldSet, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; text: string }>({
    type: "",
    text: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: "", text: "" })

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus({ type: "success", text: "Message sent successfully!" })
        setFormData({ name: "", email: "", company: "", message: "" })
      } else setStatus({ type: "error", text: "Failed to send message." })
    } catch {
      setStatus({ type: "error", text: "Error sending message." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="bg-black text-white py-24">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold tracking-tight mb-4">Get in Touch</h2>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            Have a project in mind or a question? Fill out the form below and we’ll respond soon.
          </p>
        </div>

        {/* bordered container */}
        <div className="border border-neutral-800 bg-neutral-950/50 rounded-2xl p-8 shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]">
          <form onSubmit={handleSubmit} className="space-y-8">
            <FieldGroup>
              <FieldSet>
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-neutral-900 border border-neutral-700 text-white focus:border-white/50 transition-colors"
                  />
                </Field>

                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="bg-neutral-900 border border-neutral-700 text-white focus:border-white/50 transition-colors"
                  />
                </Field>

                <Field>
                  <FieldLabel>Company</FieldLabel>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company (optional)"
                    className="bg-neutral-900 border border-neutral-700 text-white focus:border-white/50 transition-colors"
                  />
                </Field>

                <Field>
                  <FieldLabel>Message</FieldLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                    rows={6}
                    className="bg-neutral-900 border border-neutral-700 text-white focus:border-white/50 resize-none transition-colors"
                  />
                  <FieldDescription>Include details about your project or inquiry.</FieldDescription>
                </Field>
              </FieldSet>
            </FieldGroup>

            <div className="pt-4 flex flex-col items-center gap-3">
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 font-semibold tracking-wide"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>

              {status.text && (
                <p
                  className={`text-sm ${status.type === "success" ? "text-green-400" : "text-red-400"
                    }`}
                >
                  {status.text}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
