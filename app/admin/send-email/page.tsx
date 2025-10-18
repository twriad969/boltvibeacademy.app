'use client';

import { useState } from 'react';

export default function SendReminderEmailPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!email) {
      setMessage('Please enter an email address.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/send-reminder-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail: email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Successfully sent email to ${email}. Email ID: ${data.emailId}`);
        setEmail(''); // Clear email input on success
      } else {
        setMessage(`Failed to send email: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage('An error occurred while sending the email. Please check the console.');
    }
    setIsLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Send Cart Reminder Email</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#555' }}>User Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            placeholder="Enter user\'s email address"
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? '#ccc' : '#5D28E0',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease'
          }}
        >
          {isLoading ? 'Sending...' : 'Send Reminder Email'}
        </button>
      </form>
      {message && (
        <p style={{
          marginTop: '20px', 
          padding: '10px', 
          border: message.startsWith('Failed') || message.startsWith('An error') || message.startsWith('Please') ? '1px solid #ff4d4f' : '1px solid #52c41a', 
          backgroundColor: message.startsWith('Failed') || message.startsWith('An error') || message.startsWith('Please') ? '#fff1f0' : '#f6ffed',
          color: message.startsWith('Failed') || message.startsWith('An error') || message.startsWith('Please') ? '#cf1322' : '#389e0d',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {message}
        </p>
      )}
      <style jsx global>{`
        button:hover {
            background-color: ${isLoading ? '#ccc' : '#4A20B5'} !important;
        }
      `}</style>
    </div>
  );
} 
