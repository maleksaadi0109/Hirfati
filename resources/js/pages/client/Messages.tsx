import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import ChatInterface from '../dashboard/components/ChatInterface';

export default function ClientMessages() {
    return (
        <DashboardLayout title="Client Messages">
            <ChatInterface role="client" />
        </DashboardLayout>
    );
}
