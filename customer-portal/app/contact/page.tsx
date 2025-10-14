// customer-portal/app/contact/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast.success("Thank you for your message! We'll be in touch soon.");
    reset();
  };

  return (
    <div className="relative bg-gray-900 text-white">
      {/* Background Image & Overlay - Same as services page */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/hero-background.jpg')" }}></div>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      <div className="relative z-10">
        {/* Page Header */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Get In Touch
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
              Have a question or a special request? We&apos;re here and ready to help.
            </p>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="pb-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              
              {/* Column 1: Contact Information with Glassmorphism */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <p className="text-gray-300 mb-8">Find us at our office or reach out via phone or email for a prompt response.</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-lg"><MapPin className="h-6 w-6 text-blue-300" /></div>
                    <div>
                      <h3 className="font-semibold text-lg text-white">Our Office</h3>
                      <p className="text-gray-300">123 Logistics Ave, Suite 100<br />Metropolis, USA 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-lg"><Phone className="h-6 w-6 text-blue-300" /></div>
                    <div>
                      <h3 className="font-semibold text-lg text-white">Phone</h3>
                      <p className="text-gray-300">(123) 456-7890</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-lg"><Mail className="h-6 w-6 text-blue-300" /></div>
                    <div>
                      <h3 className="font-semibold text-lg text-white">Email</h3>
                      <p className="text-gray-300">contact@logipro.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Contact Form with Glassmorphism */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                    <Input 
                      id="name" 
                      {...register("name", { required: "Name is required." })}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 mt-2" 
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      {...register("email", { required: "Email is required." })} 
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 mt-2" 
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-gray-300">Message</Label>
                    <Textarea 
                      id="message" 
                      rows={5} 
                      {...register("message", { required: "Message is required." })} 
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 mt-2"
                      placeholder="Your message..." 
                    />
                    {errors.message && <p className="text-sm text-red-400 mt-1">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 transition-transform hover:scale-105">
                    Send Message <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Contact Info Section */}
        <section className="pb-24">
          <div className="container mx-auto px-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Business Hours</h2>
              <div className="grid md:grid-cols-3 gap-6 text-gray-300">
                <div>
                  <h3 className="font-semibold text-white mb-2">Customer Service</h3>
                  <p>Mon - Fri: 8:00 AM - 8:00 PM</p>
                  <p>Sat: 9:00 AM - 5:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Emergency Support</h3>
                  <p>24/7 for Active Deliveries</p>
                  <p>Emergency Hotline</p>
                  <p>Quick Response Guaranteed</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Response Time</h3>
                  <p>Email: Within 2 hours</p>
                  <p>Phone: Immediate</p>
                  <p>Live Chat: Instant</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}