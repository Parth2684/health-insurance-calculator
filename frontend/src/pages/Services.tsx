import React, { JSX, useState } from 'react';
import { Heart, Home, Car, Umbrella, Shield, Briefcase, Check } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  features: string[];
  details: {
    coverage: string[];
    benefits: string[];
    process: string[];
  };
}

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services: Service[] = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Health Insurance',
      description: 'Comprehensive health coverage for individuals and families',
      features: ['24/7 Medical Support', 'Preventive Care', 'Specialist Consultations'],
      details: {
        coverage: [
          'Emergency medical treatment',
          'Hospitalization coverage',
          'Prescription medication',
          'Mental health services',
          'Preventive care and wellness'
        ],
        benefits: [
          'Low deductibles',
          'Wide network of providers',
          'Telehealth services included',
          'No waiting period for preventive care'
        ],
        process: [
          'Choose your coverage level',
          'Select primary care physician',
          'Get your insurance card',
          'Start using your benefits immediately'
        ]
      }
    },
    {
      icon: <Home className="h-6 w-6" />,
      title: 'Home Insurance',
      description: 'Protect your home and belongings with our comprehensive coverage',
      features: ['Property Protection', 'Natural Disaster Coverage', 'Personal Liability'],
      details: {
        coverage: [
          'Dwelling coverage',
          'Personal property protection',
          'Liability coverage',
          'Additional living expenses',
          'Natural disaster protection'
        ],
        benefits: [
          'Replacement cost coverage',
          'Bundle discounts available',
          'Quick claim processing',
          'Free home inspection'
        ],
        process: [
          'Get a home evaluation',
          'Choose coverage options',
          'Set up payment plan',
          'Receive policy documents'
        ]
      }
    },
    {
      icon: <Car className="h-6 w-6" />,
      title: 'Auto Insurance',
      description: 'Complete protection for your vehicles and peace of mind on the road',
      features: ['Collision Coverage', 'Roadside Assistance', 'Third-party Liability'],
      details: {
        coverage: [
          'Collision coverage',
          'Comprehensive coverage',
          'Liability protection',
          'Personal injury protection',
          'Uninsured motorist coverage'
        ],
        benefits: [
          'Safe driver discounts',
          '24/7 roadside assistance',
          'Rental car coverage',
          'Accident forgiveness'
        ],
        process: [
          'Get a quote online',
          'Choose coverage types',
          'Set deductibles',
          'Start your policy'
        ]
      }
    },
    {
      icon: <Umbrella className="h-6 w-6" />,
      title: 'Life Insurance',
      description: 'Secure your family\'s future with our life insurance plans',
      features: ['Term Life Coverage', 'Whole Life Plans', 'Investment Options'],
      details: {
        coverage: [
          'Death benefit protection',
          'Terminal illness benefit',
          'Cash value accumulation',
          'Premium waiver option',
          'Child rider available'
        ],
        benefits: [
          'Flexible payment options',
          'Tax-advantaged growth',
          'Policy loan option',
          'Guaranteed insurability'
        ],
        process: [
          'Choose policy type',
          'Complete health questionnaire',
          'Select coverage amount',
          'Name beneficiaries'
        ]
      }
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Disability Insurance',
      description: 'Protect your income in case of disability',
      features: ['Income Protection', 'Rehabilitation Support', 'Long-term Care'],
      details: {
        coverage: [
          'Short-term disability',
          'Long-term disability',
          'Own-occupation coverage',
          'Partial disability benefits',
          'Cost of living adjustment'
        ],
        benefits: [
          'Monthly income replacement',
          'Rehabilitation services',
          'Return to work benefits',
          'Portable coverage'
        ],
        process: [
          'Assess income needs',
          'Choose benefit period',
          'Select waiting period',
          'Complete application'
        ]
      }
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: 'Business Insurance',
      description: 'Comprehensive coverage for your business operations',
      features: ['Property Insurance', 'Liability Coverage', 'Employee Benefits'],
      details: {
        coverage: [
          'General liability',
          'Professional liability',
          'Workers compensation',
          'Commercial property',
          'Business interruption'
        ],
        benefits: [
          'Customizable coverage',
          'Multi-policy discounts',
          'Risk management services',
          'Claims support'
        ],
        process: [
          'Business risk assessment',
          'Choose coverage types',
          'Set up payment schedule',
          'Receive policy documents'
        ]
      }
    }
  ];

  const handleLearnMore = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-lg text-gray-600">
          Comprehensive insurance solutions tailored to your needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
            </div>
            
            <p className="text-gray-600 mb-4">{service.description}</p>
            
            <ul className="space-y-2">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-gray-600">
                  <Shield className="h-4 w-4 text-blue-600 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <Button 
              className="mt-6 w-full"
              onClick={() => handleLearnMore(service)}
            >
              Learn More
            </Button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedService?.title || ''}
      >
        {selectedService && (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Coverage Details</h4>
              <ul className="space-y-2">
                {selectedService.details.coverage.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Key Benefits</h4>
              <ul className="space-y-2">
                {selectedService.details.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Application Process</h4>
              <ol className="space-y-2">
                {selectedService.details.process.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-600">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};