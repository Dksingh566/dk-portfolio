
import React, { useState } from 'react';
import { NavBar } from '@/components/ui/nav-bar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
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
  Download
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
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  
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

  // Simple resume data
  const resumeData = {
    name: "John Doe",
    title: "Full Stack Developer",
    summary: "Experienced full stack developer with a passion for creating beautiful and functional web applications.",
    skills: ["React", "TypeScript", "Node.js", "CSS/Tailwind", "UI/UX Design", "Responsive Development"],
    experience: [
      {
        role: "Senior Developer",
        company: "Tech Solutions Inc.",
        period: "2020 - Present",
        description: "Lead development of enterprise web applications and mentored junior developers."
      },
      {
        role: "Web Developer",
        company: "Creative Digital",
        period: "2018 - 2020",
        description: "Built responsive websites and implemented modern frontend frameworks."
      }
    ],
    education: {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      year: "2018"
    },
    contact: {
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567"
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

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
                <motion.h1 
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                >
                  <span className="text-gradient">Get in Touch</span>
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
                  className="glass-panel p-8 max-w-xl mx-auto lg:mx-0 w-full"
                  initial="hidden"
                  animate={isFormVisible ? "visible" : "hidden"}
                  variants={fadeInUp}
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
                        className="w-full px-4 py-3 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200 hover:border-violet-500"
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
                        className="w-full px-4 py-3 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200 hover:border-violet-500"
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
                        className="w-full px-4 py-3 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200 hover:border-violet-500"
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
                        className="w-full px-4 py-3 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200 resize-none hover:border-violet-500"
                        placeholder="Tell me about your project or inquiry..."
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="w-full py-3 bg-primary hover:bg-violet-600 text-primary-foreground transition-all duration-300 hover:scale-[1.02] group"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'} 
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </motion.form>
                
                {/* Contact info */}
                <motion.div 
                  ref={infoRef}
                  initial="hidden"
                  animate={isInfoVisible ? "visible" : "hidden"}
                  variants={fadeInUp}
                  className="space-y-8 max-w-xl mx-auto lg:mx-0 w-full"
                >
                  <div className="glass-panel p-8 mb-8 hover:border-violet-500/30 transition-colors duration-300">
                    <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-lg">
                      <img 
                        src="/lovable-uploads/05eda115-dd99-4bf1-b9a4-e1456f7bdbb3.png" 
                        alt="Profile Photo"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    
                    <div className="space-y-6">
                      {contactMethods.map((method, index) => (
                        <a 
                          href={method.link} 
                          key={index}
                          target={method.title === 'Location' ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 dark:hover:bg-black/10 transition-colors duration-300 group"
                        >
                          <div className="mt-1 group-hover:text-violet-500 transition-colors">{method.icon}</div>
                          <div>
                            <h3 className="font-medium text-foreground group-hover:text-violet-500 transition-colors">{method.title}</h3>
                            <p className="text-muted-foreground mt-1">{method.value}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="glass-panel p-8 hover:border-violet-500/30 transition-colors duration-300">
                    <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
                    
                    <div className="flex flex-wrap gap-4">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-3 rounded-lg border border-input hover:border-violet-500 hover:text-violet-500 transition-all duration-300 hover:scale-105"
                        >
                          {social.icon}
                          <span>{social.name}</span>
                        </a>
                      ))}
                      
                      <Button
                        onClick={() => setIsResumeOpen(true)}
                        variant="outline"
                        className="flex items-center gap-2 px-4 py-3 rounded-lg border border-input hover:border-violet-500 hover:text-violet-500 transition-all duration-300 hover:scale-105 h-auto"
                      >
                        <FileText className="h-5 w-5" />
                        <span>View Resume</span>
                      </Button>
                    </div>
                    
                    <div className="mt-8 p-5 bg-primary/10 rounded-lg border border-primary/20 hover:border-violet-500/30 transition-colors duration-300">
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
