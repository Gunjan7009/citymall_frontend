// src/components/common/NotificationArea.js
import React from 'react';
import { AlertTriangle, PlusCircle } from 'lucide-react';

const NotificationArea = ({ notifications }) => (
    <div className="notification-area">
        {notifications.map(notif => (
            <div key={notif.id} className={`notification-item ${notif.type} animate-fadeInRight`}>
                {notif.type === 'error' && <AlertTriangle className="icon icon-md" />}
                {notif.type === 'success' && <PlusCircle className="icon icon-md" />}
                <span>{notif.message}</span>
            </div>
        ))}
    </div>
);

export default NotificationArea;
