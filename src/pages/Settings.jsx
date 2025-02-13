import React, { useState } from 'react';
import { HiSave } from 'react-icons/hi';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [settings, setSettings] = useState({
    companyName: 'TrackNStock',
    email: 'admin@tracknstock.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    currency: 'USD',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    security: {
      twoFactor: true,
      sessionTimeout: '30',
      passwordExpiry: '90',
    },
  });

  const handleSettingChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: typeof prev[section] === 'object'
        ? { ...prev[section], [field]: value }
        : value,
    }));
  };

  const handleSaveSettings = () => {
    // Save settings to backend
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Settings
        </h1>
        <Button onClick={handleSaveSettings}>
          <HiSave className="w-5 h-5 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Company Settings */}
      <Card title="Company Information">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            label="Company Name"
            value={settings.companyName}
            onChange={(e) => handleSettingChange('companyName', null, e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            value={settings.email}
            onChange={(e) => handleSettingChange('email', null, e.target.value)}
          />
          <Input
            label="Phone"
            value={settings.phone}
            onChange={(e) => handleSettingChange('phone', null, e.target.value)}
          />
          <Input
            label="Address"
            value={settings.address}
            onChange={(e) => handleSettingChange('address', null, e.target.value)}
          />
        </div>
      </Card>

      {/* Localization Settings */}
      <Card title="Localization">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Select
            label="Currency"
            value={settings.currency}
            onChange={(e) => handleSettingChange('currency', null, e.target.value)}
            options={[
              { value: 'USD', label: 'US Dollar (USD)' },
              { value: 'EUR', label: 'Euro (EUR)' },
              { value: 'GBP', label: 'British Pound (GBP)' },
              { value: 'JPY', label: 'Japanese Yen (JPY)' },
            ]}
          />
          <Select
            label="Timezone"
            value={settings.timezone}
            onChange={(e) => handleSettingChange('timezone', null, e.target.value)}
            options={[
              { value: 'America/New_York', label: 'Eastern Time (ET)' },
              { value: 'America/Chicago', label: 'Central Time (CT)' },
              { value: 'America/Denver', label: 'Mountain Time (MT)' },
              { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
            ]}
          />
          <Select
            label="Date Format"
            value={settings.dateFormat}
            onChange={(e) => handleSettingChange('dateFormat', null, e.target.value)}
            options={[
              { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
              { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
              { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
            ]}
          />
          <Select
            label="Language"
            value={settings.language}
            onChange={(e) => handleSettingChange('language', null, e.target.value)}
            options={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Spanish' },
              { value: 'fr', label: 'French' },
              { value: 'de', label: 'German' },
            ]}
          />
        </div>
      </Card>

      {/* Appearance Settings */}
      <Card title="Appearance">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Dark Mode
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enable dark mode for a better viewing experience in low-light conditions
              </p>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className={`
                  relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                  transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                  ${darkMode ? 'bg-purple-600' : 'bg-gray-200'}
                `}
                role="switch"
                aria-checked={darkMode}
                onClick={toggleDarkMode}
              >
                <span
                  aria-hidden="true"
                  className={`
                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                    transition duration-200 ease-in-out
                    ${darkMode ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card title="Notifications">
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                  {key} Notifications
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive notifications via {key}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className={`
                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                    transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                    ${value ? 'bg-purple-600' : 'bg-gray-200'}
                  `}
                  role="switch"
                  aria-checked={value}
                  onClick={() => handleSettingChange('notifications', key, !value)}
                >
                  <span
                    aria-hidden="true"
                    className={`
                      pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                      transition duration-200 ease-in-out
                      ${value ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Security Settings */}
      <Card title="Security">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className={`
                  relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                  transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                  ${settings.security.twoFactor ? 'bg-purple-600' : 'bg-gray-200'}
                `}
                role="switch"
                aria-checked={settings.security.twoFactor}
                onClick={() => handleSettingChange('security', 'twoFactor', !settings.security.twoFactor)}
              >
                <span
                  aria-hidden="true"
                  className={`
                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                    transition duration-200 ease-in-out
                    ${settings.security.twoFactor ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Select
              label="Session Timeout (minutes)"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
              options={[
                { value: '15', label: '15 minutes' },
                { value: '30', label: '30 minutes' },
                { value: '60', label: '1 hour' },
                { value: '120', label: '2 hours' },
              ]}
            />
            <Select
              label="Password Expiry (days)"
              value={settings.security.passwordExpiry}
              onChange={(e) => handleSettingChange('security', 'passwordExpiry', e.target.value)}
              options={[
                { value: '30', label: '30 days' },
                { value: '60', label: '60 days' },
                { value: '90', label: '90 days' },
                { value: '180', label: '180 days' },
              ]}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings; 