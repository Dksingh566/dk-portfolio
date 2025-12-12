
import React, { useState, useEffect } from 'react';
import { NavBar } from '@/components/ui/nav-bar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils'; 
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter,
  ArrowRight,
  CheckCircle,
  FileText,
  Download,
  Sparkles,
  Heart,
  Star
} from 'lucide-react';
import { ThemeProvider } from '@/hooks/use-theme';
import { useElementInView } from '@/hooks/use-intersection-observer';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { personalInfo } from '@/lib/data';
import { toast } from 'sonner';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  
  const [formRef, isFormVisible] = useElementInView<HTMLFormElement>({ threshold: 0.1 });
  const [infoRef, isInfoVisible] = useElementInView<HTMLDivElement>({ threshold: 0.1 });

  // Mouse position for interactive elements
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Form validation
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!name.trim()) errors.name = "Name is required";
    
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    
    if (!subject.trim()) errors.subject = "Subject is required";
    if (!message.trim()) errors.message = "Message is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }
    
    setIsSubmitting(true);
    
    // Show sending toast
    toast.loading("Sending your message.");
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setIsDialogOpen(true);
      
      // Remove loading toast and show success
      toast.dismiss();
      toast.success("Message sent successfully!");
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      setSubject('');
      setFormErrors({});
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

  // Simple resume data
  const resumeData = {
    name: "Dhirendra Singh",
    title: "Full Stack Developer",
    summary: "Experienced full stack developer with a passion for creating beautiful and functional web applications.",
    skills: ["React", "JavaScript", "Node.js", "CSS/Tailwind", "UI/UX Design", "Responsive Development"],
    experience: [
      {
        role: "Web Developer",
        company: "Property Expert Realtor",
        period: "2025 - Present",
        description: "Lead development of enterprise web applications and mentored junior developers."
      },
    ],
    education: {
      degree: "Bachelor of Science in Computer Science",
      institution: "Chandigarh University",
      year: "2025"
    },
    contact: {
      email: "singhdk9041@gmail.com",
      phone: "+91-9041909256"
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Interactive particle component
  const ContactParticle = ({ index }: { index: number }) => {
    return (
      <motion.div
        className="absolute bg-primary/20 rounded-full z-0"
        style={{
          width: Math.random() * 10 + 5,
          height: Math.random() * 10 + 5,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          x: [0, Math.random() * 40 - 20],
          y: [0, Math.random() * 40 - 20],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.2, 1]
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: Math.random() * 5 + 5,
          delay: index * 0.2
        }}
      />
    );
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <NavBar />
        
        <main className="flex-grow">
          {/* Hero section */}
          <section className="relative py-20 md:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"></div>
            
            {/* Interactive background particles */}
            {Array.from({ length: 20 }).map((_, index) => (
              <ContactParticle key={index} index={index} />
            ))}
            
            <div className="container-custom mx-auto relative z-10">
              <div className="text-center mb-16">
                <motion.h1 
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative inline-block"
                >
                  <span className="text-gradient relative">
                    Get in Touch
                    <motion.span
                      className="absolute -right-8 -top-8 text-primary"
                      animate={{
                        rotate: [0, 15, 0, -15, 0],
                        scale: [1, 1.2, 1, 1.2, 1]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    >
                      <Sparkles className="h-6 w-6 md:h-8 md:w-8" />
                    </motion.span>
                  </span>
                </motion.h1>
                <motion.p 
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
                  style={{ animationDelay: '200ms' }}
                >
                  Let's discuss your project or opportunities for collaboration.
                  I'm always open to new ideas and connections.
                </motion.p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Contact form */}
                <motion.form 
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="glass-panel p-8 max-w-xl mx-auto lg:mx-0 w-full relative"
                  initial="hidden"
                  animate={isFormVisible ? "visible" : "hidden"}
                  variants={fadeInUp}
                >
                  {/* Decorative effect for active form */}
                  <AnimatePresence>
                    {focusedField && (
                      <motion.div 
                        className="absolute -inset-px rounded-lg border-2 border-primary/40 z-0 pointer-events-none"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <span>Send Me a Message</span>
                      <motion.span
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                        className="ml-2"
                      >
                        <Heart className="h-5 w-5 text-primary" />
                      </motion.span>
                    </h2>
                    
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
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className={cn(
                            "w-full px-4 py-3 rounded-md border bg-background transition-colors duration-200 hover:border-violet-500 focus:border-primary focus:ring-1 focus:ring-primary",
                            formErrors.name ? "border-destructive" : "border-input"
                          )}
                          placeholder="John Doe"
                        />
                        {formErrors.name && (
                          <p className="text-destructive text-sm mt-1">{formErrors.name}</p>
                        )}
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
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className={cn(
                            "w-full px-4 py-3 rounded-md border bg-background transition-colors duration-200 hover:border-violet-500 focus:border-primary focus:ring-1 focus:ring-primary",
                            formErrors.email ? "border-destructive" : "border-input"
                          )}
                          placeholder="you@example.com"
                        />
                        {formErrors.email && (
                          <p className="text-destructive text-sm mt-1">{formErrors.email}</p>
                        )}
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
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => setFocusedField(null)}
                          className={cn(
                            "w-full px-4 py-3 rounded-md border bg-background transition-colors duration-200 hover:border-violet-500 focus:border-primary focus:ring-1 focus:ring-primary",
                            formErrors.subject ? "border-destructive" : "border-input"
                          )}
                          placeholder="Project Inquiry"
                        />
                        {formErrors.subject && (
                          <p className="text-destructive text-sm mt-1">{formErrors.subject}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          rows={5}
                          className={cn(
                            "w-full px-4 py-3 rounded-md border bg-background transition-colors duration-200 hover:border-violet-500 focus:border-primary focus:ring-1 focus:ring-primary resize-none",
                            formErrors.message ? "border-destructive" : "border-input"
                          )}
                          placeholder="Tell me about your project or inquiry..."
                        />
                        {formErrors.message && (
                          <p className="text-destructive text-sm mt-1">{formErrors.message}</p>
                        )}
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full py-3 bg-primary hover:bg-violet-600 text-primary-foreground transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          {isSubmitting ? 'Sending...' : 'Send Message'} 
                          <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 via-primary to-violet-600 bg-[length:200%_100%] group-hover:animate-background-shine z-0"></span>
                      </Button>
                      
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: isSuccess ? 1 : 0,
                          height: isSuccess ? 'auto' : 0
                        }}
                        className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center overflow-hidden"
                      >
                        <CheckCircle className="h-6 w-6 text-primary mx-auto mb-2" />
                        <p>Thank you for your message! I'll get back to you soon.</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.form>
                
                {/* Contact info */}
                <motion.div 
                  ref={infoRef}
                  initial="hidden"
                  animate={isInfoVisible ? "visible" : "hidden"}
                  variants={staggerContainer}
                  className="space-y-8 max-w-xl mx-auto lg:mx-0 w-full"
                >
                  <motion.div 
                    variants={itemVariant}
                    className="glass-panel p-8 mb-8 hover:border-violet-500/30 transition-colors duration-300 relative overflow-hidden group"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="absolute right-0 bottom-0 w-32 h-32 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors duration-300 blur-xl"></div>
                    
                    <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-lg">
                      <img 
                        src="/lovable-uploads/05eda115-dd99-4bf1-b9a4-e1456f7bdbb3.png" 
                        alt="Profile Photo"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <span>Contact Information</span>
                      <Star className="h-5 w-5 text-primary ml-2" />
                    </h2>
                    
                    <motion.div variants={staggerContainer} className="space-y-6">
                      {contactMethods.map((method, index) => (
                        <motion.a 
                          variants={itemVariant}
                          key={index}
                          href={method.link} 
                          target={method.title === 'Location' ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 dark:hover:bg-black/10 transition-colors duration-300 group"
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <div className="mt-1 group-hover:text-violet-500 transition-colors">{method.icon}</div>
                          <div>
                            <h3 className="font-medium text-foreground group-hover:text-violet-500 transition-colors">{method.title}</h3>
                            <p className="text-muted-foreground mt-1">{method.value}</p>
                          </div>
                        </motion.a>
                      ))}
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    variants={itemVariant}
                    className="glass-panel p-8 hover:border-violet-500/30 transition-colors duration-300 relative overflow-hidden"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="absolute -right-20 -bottom-20 w-56 h-56 bg-primary/5 rounded-full blur-xl"></div>
                    
                    <h2 className="text-2xl font-bold mb-6 relative z-10">Connect With Me</h2>
                    
                    <motion.div
                      variants={staggerContainer}
                      className="flex flex-wrap gap-4 relative z-10"
                    >
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={index}
                          variants={itemVariant}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-3 rounded-lg border border-input hover:border-violet-500 hover:text-violet-500 transition-all duration-300 hover:scale-105"
                          whileHover={{ 
                            y: -3,
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                          }}
                        >
                          {social.icon}
                          <span>{social.name}</span>
                        </motion.a>
                      ))}
                      
                      <motion.button
                        variants={itemVariant}
                        onClick={() => setIsResumeOpen(true)}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg border border-input hover:border-violet-500 hover:text-violet-500 transition-all duration-300 hover:scale-105"
                        whileHover={{ 
                          y: -3,
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        <FileText className="h-5 w-5" />
                        <span>View Resume</span>
                      </motion.button>
                    </motion.div>
                    
                    <motion.div 
                      variants={itemVariant}
                      className="mt-8 p-5 bg-primary/10 rounded-lg border border-primary/20 hover:border-violet-500/30 transition-colors duration-300 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <h3 className="font-medium text-foreground flex items-center gap-2 relative z-10">
                        <CheckCircle className="h-5 w-5 text-primary" /> 
                        Quick Response
                      </h3>
                      <p className="text-muted-foreground mt-2 relative z-10">
                        I typically respond to all inquiries within 24-48 hours. 
                        Looking forward to hearing from you!
                      </p>
                      <motion.div 
                        className="absolute bottom-0 right-0 h-8 w-8 text-primary/20"
                        animate={{
                          rotate: [0, 360],
                          opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      >
                        <Sparkles className="h-full w-full" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
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
      
      {/* Resume Dialog */}
      <Dialog open={isResumeOpen} onOpenChange={setIsResumeOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <FileText className="h-5 w-5 text-primary" />
              Resume
            </DialogTitle>
          </DialogHeader>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold">{resumeData.name}</h1>
              <p className="text-lg text-primary mt-1">{resumeData.title}</p>
              <div className="flex justify-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>{resumeData.contact.email}</span>
                <span>{resumeData.contact.phone}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">Summary</h2>
              <p>{resumeData.summary}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {resumeData.skills.map((skill, index) => (
                  <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">Experience</h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="ml-4 relative">
                    <div className="absolute w-2 h-2 rounded-full bg-primary left-[-1rem] top-2"></div>
                    <h3 className="font-medium">{exp.role}</h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary">{exp.company}</span>
                      <span className="text-muted-foreground">{exp.period}</span>
                    </div>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">Education</h2>
              <div className="ml-4 relative">
                <div className="absolute w-2 h-2 rounded-full bg-primary left-[-1rem] top-2"></div>
                <h3 className="font-medium">{resumeData.education.degree}</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-primary">{resumeData.education.institution}</span>
                  <span className="text-muted-foreground">{resumeData.education.year}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setIsResumeOpen(false)}>
              Close
            </Button>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default ContactPage;
