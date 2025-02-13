import React, { useState } from 'react';
import {
  HiOutlineSearch,
  HiOutlineQuestionMarkCircle,
  HiOutlineDocumentText,
  HiOutlineChat,
  HiOutlineMail,
  HiChevronDown,
  HiChevronUp,
} from 'react-icons/hi';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';

const faqs = [
  {
    question: 'How do I track a shipment?',
    answer: 'You can track a shipment by navigating to the Shipments page and entering the tracking number in the search bar. The system will display real-time location and status updates for your shipment.',
  },
  {
    question: 'How do I manage inventory levels?',
    answer: 'To manage inventory levels, go to the Inventory page where you can view current stock levels, set reorder points, and receive notifications when items are running low. You can also add new items and update existing stock quantities.',
  },
  {
    question: 'How do I create a new order?',
    answer: 'To create a new order, navigate to the Orders page and click the "New Order" button. Fill in the required information including customer details, items, and shipping information. The system will automatically generate an order number and tracking details.',
  },
  {
    question: 'How do I generate reports?',
    answer: 'Reports can be generated from the Analytics page. Select the desired date range and metrics, then click "Generate Report". You can export reports in various formats including PDF and CSV.',
  },
  {
    question: 'How do I add a new user?',
    answer: 'To add a new user, go to the Users page and click "Add User". Fill in the user\'s details including name, email, role, and department. You can also set their permissions and access levels.',
  },
];

const documentation = [
  {
    title: 'Getting Started Guide',
    description: 'Learn the basics of using TrackNStock',
    link: '/docs/getting-started',
  },
  {
    title: 'User Manual',
    description: 'Detailed documentation of all features',
    link: '/docs/user-manual',
  },
  {
    title: 'API Documentation',
    description: 'Integration guides and API reference',
    link: '/docs/api',
  },
  {
    title: 'Best Practices',
    description: 'Tips and recommendations for optimal use',
    link: '/docs/best-practices',
  },
];

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    // Handle ticket submission
    console.log('Submitting ticket:', { subject: ticketSubject, message: ticketMessage });
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Support Center
        </h1>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <Input
          placeholder="Search help articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<HiOutlineSearch className="w-5 h-5 text-gray-400" />}
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="text-center">
          <div className="p-6">
            <HiOutlineQuestionMarkCircle className="w-12 h-12 mx-auto text-purple-600" />
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              FAQs
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Find answers to common questions
            </p>
          </div>
        </Card>
        <Card className="text-center">
          <div className="p-6">
            <HiOutlineDocumentText className="w-12 h-12 mx-auto text-purple-600" />
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Documentation
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Browse detailed guides and tutorials
            </p>
          </div>
        </Card>
        <Card className="text-center">
          <div className="p-6">
            <HiOutlineChat className="w-12 h-12 mx-auto text-purple-600" />
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Contact Support
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Get help from our support team
            </p>
          </div>
        </Card>
      </div>

      {/* FAQs */}
      <Card title="Frequently Asked Questions">
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <button
                className="flex items-center justify-between w-full py-4 text-left focus:outline-none"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <span className="text-base font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                {expandedFaq === index ? (
                  <HiChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <HiChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {expandedFaq === index && (
                <div className="pb-4">
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Documentation */}
      <Card title="Documentation">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {documentation.map((doc, index) => (
            <a
              key={index}
              href={doc.link}
              className="block p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {doc.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {doc.description}
              </p>
            </a>
          ))}
        </div>
      </Card>

      {/* Contact Support */}
      <Card title="Contact Support">
        <form onSubmit={handleSubmitTicket} className="space-y-6">
          <Input
            label="Subject"
            value={ticketSubject}
            onChange={(e) => setTicketSubject(e.target.value)}
            required
          />
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={ticketMessage}
              onChange={(e) => setTicketMessage(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="submit">
              <HiOutlineMail className="w-5 h-5 mr-2" />
              Submit Ticket
            </Button>
          </div>
        </form>
      </Card>

      {/* Contact Information */}
      <Card title="Additional Contact Information">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Email
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              support@tracknstock.com
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Phone
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              +1 (555) 123-4567
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Hours
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Monday - Friday<br />
              9:00 AM - 6:00 PM EST
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Support; 