import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import ChatInterface from '../dashboard/components/ChatInterface';

export default function WorkerMessages() {
    return (
        <DashboardLayout title="Worker Messages">
            <ChatInterface role="worker" />
        </DashboardLayout>
    );
}
