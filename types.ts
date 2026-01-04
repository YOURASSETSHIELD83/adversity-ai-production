
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface BenefitProps {
  title: string;
  description: string;
}

export interface TranscriptionItem {
  type: 'user' | 'model';
  text: string;
}

export interface ReportItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string; // Markdown or plain text for report body
  stats: { label: string; value: string }[];
  date: string;
}
