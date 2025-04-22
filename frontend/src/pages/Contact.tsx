import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { FormField } from '../components/ui/FormField';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          Get in touch with our team for any inquiries or support
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-600">+91 9876543212</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">support@insureguard.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Address</h3>
                  <p className="text-gray-600">123 Insurance Guard, Building - H11 <br />Sion, Mumbai</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Name"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={() => handleChange}
              required
              placeholder="Your full name"
            />
            
            <FormField
              label="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={() => handleChange}
              required
              placeholder="your@email.com"
            />
            
            <FormField
              label="Phone"
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={() => handleChange}
              placeholder="Your phone number"
            />
            
            <FormField
              label="Subject"
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={() => handleChange}
              required
              placeholder="How can we help?"
            />
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message..."
              />
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="text-green-700">Your message has been sent successfully!</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-700">Failed to send message. Please try again.</p>
              </div>
            )}
            
            <Button type="submit" isLoading={isSubmitting}>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};