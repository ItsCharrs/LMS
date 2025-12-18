// customer-portal/app/contact/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Clock, Users, Shield, MessageCircle } from "lucide-react";
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
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="fixed inset-0 bg-gradient-to-br from-background to-muted/30 -z-10"></div>

      <div className="relative z-10 flex-grow pt-20">
        {/* Page Header */}
        <section className="pt-16 pb-12">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-lg rounded-full px-6 py-3 border border-primary/20 mb-6">
              <MessageCircle className="h-6 w-6 text-primary" />
              <span className="text-sm font-semibold text-primary">GET IN TOUCH</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-4">
              Contact <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have a question or a special request? We&apos;re here and ready to help with your logistics needs.
            </p>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

              {/* Column 1: Contact Information */}
              <div className="space-y-8">
                <div className="bg-card backdrop-blur-lg rounded-2xl border border-border shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                  <h2 className="text-3xl font-black text-foreground mb-6">Contact Information</h2>
                  <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                    Find us at our office or reach out via phone or email for a prompt response to your logistics inquiries.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4 group">
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-foreground mb-2">Our Office</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          123 Logistics Ave, Suite 100<br />
                          Metropolis, USA 12345
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-foreground mb-2">Phone</h3>
                        <p className="text-muted-foreground text-lg">(123) 456-7890</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-foreground mb-2">Email</h3>
                        <p className="text-muted-foreground text-lg">contact@logipro.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours Card */}
                <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 backdrop-blur-lg rounded-2xl border border-border shadow-xl p-8">
                  <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
                    <Clock className="h-6 w-6 text-primary" />
                    Business Hours
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3 text-lg">Customer Service</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Mon - Fri: 8:00 AM - 8:00 PM</p>
                        <p>Sat: 9:00 AM - 5:00 PM</p>
                        <p>Sun: Closed</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3 text-lg">Emergency Support</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>24/7 for Active Deliveries</p>
                        <p>Emergency Hotline Available</p>
                        <p>Quick Response Guaranteed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Contact Form */}
              <div className="bg-card backdrop-blur-lg rounded-2xl border border-border shadow-xl p-8 transition-all duration-500 hover:shadow-2xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 mb-4 shadow-lg">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-foreground mb-2">Send a Message</h2>
                  <p className="text-muted-foreground">We typically respond within 2 hours during business hours</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-muted-foreground font-medium text-sm uppercase tracking-wide">Full Name</Label>
                    <Input
                      id="name"
                      {...register("name", { required: "Name is required." })}
                      className="bg-background border-input text-foreground placeholder:text-muted-foreground h-14 rounded-xl focus:border-primary transition-colors text-lg"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-muted-foreground font-medium text-sm uppercase tracking-wide">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", { required: "Email is required." })}
                      className="bg-background border-input text-foreground placeholder:text-muted-foreground h-14 rounded-xl focus:border-primary transition-colors text-lg"
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-muted-foreground font-medium text-sm uppercase tracking-wide">Message</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      {...register("message", { required: "Message is required." })}
                      className="bg-background border-input text-foreground placeholder:text-muted-foreground rounded-xl focus:border-primary transition-colors resize-none text-lg"
                      placeholder="Tell us about your logistics needs, questions, or special requests..."
                    />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 shadow-lg group"
                  >
                    Send Message <Send className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>

                {/* Response Time Info */}
                <div className="mt-6 p-4 bg-muted/20 rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Quick Response Guarantee</p>
                      <p className="text-xs text-muted-foreground">We respond to all inquiries within 2 hours during business hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-lg rounded-2xl border border-border shadow-xl p-8 text-center">
                <h2 className="text-3xl font-black text-foreground mb-6">Why Choose Our Support?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10 mb-4">
                      <Users className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">Expert Team</h3>
                    <p className="text-muted-foreground text-sm">Our logistics specialists have years of industry experience</p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-500/10 mb-4">
                      <Clock className="h-6 w-6 text-green-500" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">Fast Response</h3>
                    <p className="text-muted-foreground text-sm">Quick responses to get your logistics questions answered</p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 mb-4">
                      <Shield className="h-6 w-6 text-amber-500" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">Secure & Reliable</h3>
                    <p className="text-muted-foreground text-sm">Your information is protected with enterprise security</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}