
import React, { useState } from 'react';
import { NavBar } from '@/components/ui/nav-bar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { ThemeProvider } from '@/hooks/use-theme';
import { useElementInView } from '@/hooks/use-intersection-observer';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { personalInfo } from '@/lib/data';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [formRef, isFormVisible] = useElementInView<HTMLFormElement>({ threshold: 0.1 });
  const [infoRef, isInfoVisible] = useElementInView<HTMLDivElement>({ threshold: 0.1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setIsDialogOpen(true);
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      setSubject('');
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: 'Email',
      value: personalInfo.email,
      link: `mailto:${personalInfo.email}`
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: 'Phone',
      value: personalInfo.phone,
      link: `tel:${personalInfo.phone}`
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: 'Location',
      value: personalInfo.location,
      link: `https://maps.google.com/?q=${personalInfo.location}`
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="h-5 w-5" />,
      link: personalInfo.socials.linkedin,
      name: 'LinkedIn'
    },
    {
      icon: <Github className="h-5 w-5" />,
      link: personalInfo.socials.github,
      name: 'GitHub'
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      link: personalInfo.socials.twitter,
      name: 'Twitter'
    }
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <NavBar />
        
        <main className="flex-grow">
          {/* Hero section */}
          <section className="relative py-20 md:py-28">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"></div>
            <div className="container-custom mx-auto relative z-10">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                  <span className="text-gradient">Get in Touch</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
                  Let's discuss your project or opportunities for collaboration.
                  I'm always open to new ideas and connections.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Contact form */}
                <form 
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className={`glass-panel p-8 transition-all duration-1000 ${
                    isFormVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200"
                        placeholder="Project Inquiry"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200 resize-none"
                        placeholder="Tell me about your project or inquiry..."
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-[1.02] group"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'} 
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </form>
                
                {/* Contact info */}
                <div 
                  ref={infoRef}
                  className={`transition-all duration-1000 ${
                    isInfoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  <div className="glass-panel p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    
                    <div className="space-y-6">
                      {contactMethods.map((method, index) => (
                        <a 
                          href={method.link} 
                          key={index}
                          target={method.title === 'Location' ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 dark:hover:bg-black/10 transition-colors duration-300"
                        >
                          <div className="mt-1">{method.icon}</div>
                          <div>
                            <h3 className="font-medium text-foreground">{method.title}</h3>
                            <p className="text-muted-foreground mt-1">{method.value}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="glass-panel p-8">
                    <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
                    
                    <div className="flex flex-wrap gap-4">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-3 rounded-lg border border-input hover:border-primary hover:text-primary transition-all duration-300 hover:scale-105"
                        >
                          {social.icon}
                          <span>{social.name}</span>
                        </a>
                      ))}
                    </div>
                    
                    <div className="mt-8 p-5 bg-primary/10 rounded-lg border border-primary/20">
                      <h3 className="font-medium text-foreground flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" /> 
                        Quick Response
                      </h3>
                      <p className="text-muted-foreground mt-2">
                        I typically respond to all inquiries within 24-48 hours. 
                        Looking forward to hearing from you!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
      
      {/* Success Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Message Sent Successfully!
            </DialogTitle>
            <DialogDescription>
              Thank you for reaching out. I'll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default ContactPage;
