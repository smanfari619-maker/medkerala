'use server';

export interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface SubmissionRecord extends EnquiryData {
  id: string;
  timestamp: string;
}

export async function submitEnquiry(data: EnquiryData) {
  try {
    const referenceId = `MK-ENQ-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
    const newSubmission: SubmissionRecord = {
      id: referenceId,
      timestamp: new Date().toISOString(),
      ...data,
    };

    // Securely log submission on server console.
    // In a production scenario, this will be piped to a persistent database or CRM endpoint.
    console.log('[Submission Saved]', JSON.stringify(newSubmission, null, 2));

    return { success: true, referenceId };
  } catch (error) {
    console.error('Server action: Failed to save enquiry:', error);
    return { success: false, error: 'Submission processing error' };
  }
}

