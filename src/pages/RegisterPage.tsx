import React from 'react';
import { RegisterForm } from '../components/RegisterForm';
import { FAQ } from '../components/FAQ';

export const RegisterPage: React.FC = () => {
  return (
    <div style={{ paddingTop: 'var(--space-2xl)' }}>
      {/* Dedicated Registration Section */}
      <RegisterForm />

      {/* Relevant Registration Questions */}
      <FAQ />
    </div>
  );
};
