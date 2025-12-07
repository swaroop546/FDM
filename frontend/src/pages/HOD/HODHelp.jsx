import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  HelpCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  AlertCircle,
  FileText,
  BookOpen,
  Users,
  Shield
} from 'lucide-react';

const HODHelp = () => {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    message: '',
    priority: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const categories = [
    { value: 'feedback-management', label: 'Feedback Management', icon: FileText },
    { value: 'analytics', label: 'Analytics & Reports', icon: BookOpen },
    { value: 'student-data', label: 'Student Data', icon: Users },
    { value: 'technical', label: 'Technical Issue', icon: AlertCircle },
    { value: 'account', label: 'Account & Access', icon: Shield },
    { value: 'other', label: 'Other', icon: HelpCircle }
  ];

  const faqs = [
    {
      question: "How do I publish feedback forms for a specific semester?",
      answer: "Navigate to Feedback Management, select the batch and regulation, then choose the semester. Review the timetable and click 'Publish Feedback' to make it available to students."
    },
    {
      question: "Can I view analytics before all students submit their feedback?",
      answer: "Yes, analytics are updated in real-time as students submit their feedback. You can view partial results anytime through the Feedback Analytics section."
    },
    {
      question: "How do I export analytics reports?",
      answer: "In the Analytics Report view, click the 'Export' button in the top-right corner. You can choose to export as PDF or Excel format."
    },
    {
      question: "What if I need to modify the timetable or faculty assignments?",
      answer: "HODs cannot modify timetables directly. All subject-faculty mappings are managed by the Admin. Please contact the admin team for any changes needed."
    },
    {
      question: "How are feedback responses kept anonymous?",
      answer: "All student feedback is completely anonymous. No identifying information is stored with responses, ensuring honest and unbiased feedback."
    },
    {
      question: "Can I see which students have submitted feedback?",
      answer: "You can see the total number of responses but not individual student identities. This maintains feedback anonymity while providing completion metrics."
    }
  ];

  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSubmitError('');
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.category || !formData.message) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitSuccess(true);
      setFormData({
        subject: '',
        category: '',
        message: '',
        priority: 'normal'
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError('Failed to submit your request. Please try again or contact support directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-sm text-gray-600 mt-1">Get assistance and find answers to common questions</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <HelpCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Contact Support</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Email Support</p>
                  <a href="mailto:support@jntugvcev.edu.in" className="text-sm font-medium text-blue-600 hover:underline">
                    support@jntugvcev.edu.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Phone Support</p>
                  <a href="tel:+918942123456" className="text-sm font-medium text-green-600 hover:underline">
                    +91 8942 123 456
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Office Address</p>
                  <p className="text-sm text-gray-900">Admin Block, 2nd Floor<br />JNTUGV Campus, Vizianagaram</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Support Hours</p>
                  <p className="text-sm text-gray-900">Mon - Fri: 9:00 AM - 5:00 PM<br />Sat: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-emerald-700 hover:text-emerald-900 hover:underline">
                User Manual (PDF)
              </a>
              <a href="#" className="block text-sm text-emerald-700 hover:text-emerald-900 hover:underline">
                Video Tutorials
              </a>
              <a href="#" className="block text-sm text-emerald-700 hover:text-emerald-900 hover:underline">
                System Status
              </a>
              <a href="#" className="block text-sm text-emerald-700 hover:text-emerald-900 hover:underline">
                Report a Bug
              </a>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Submit Request Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border-2 border-gray-200 p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Submit Support Request</h2>

            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
              >
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">Request submitted successfully!</p>
                  <p className="text-xs text-green-700 mt-1">Our team will respond within 24-48 hours.</p>
                </div>
              </motion.div>
            )}

            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
              >
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{submitError}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Brief description of your issue"
                  required
                />
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="low">Low - General inquiry</option>
                  <option value="normal">Normal - Standard issue</option>
                  <option value="high">High - Urgent assistance needed</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  placeholder="Describe your issue in detail..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border-2 border-gray-200 p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HelpCircle className="h-5 w-5 text-gray-400" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedFaq === index ? 'auto' : 0,
                      opacity: expandedFaq === index ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-700">{faq.answer}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HODHelp;
