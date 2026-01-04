import { Head, Link } from '@inertiajs/react';

interface ErrorPageProps {
    status: number;
    message?: string;
}

const titles: { [key: number]: string } = {
    401: 'غير مصرح',
    403: 'محظور',
    404: 'الصفحة غير موجودة',
    419: 'انتهت صلاحية الصفحة',
    422: 'خطأ في المعالجة',
    429: 'طلبات كثيرة جداً',
    500: 'خطأ في الخادم',
    503: 'الخدمة غير متاحة',
};

const descriptions: { [key: number]: string } = {
    401: 'عذراً، أنت غير مصرح لك بالوصول إلى هذه الصفحة.',
    403: 'عذراً، ليس لديك صلاحية الوصول إلى هذه الصفحة.',
    404: 'عذراً، الصفحة التي تبحث عنها غير موجودة.',
    419: 'عذراً، انتهت صلاحية جلستك. يرجى تحديث الصفحة والمحاولة مرة أخرى.',
    422: 'عذراً، لا يمكن معالجة طلبك.',
    429: 'عذراً، لقد أرسلت الكثير من الطلبات. يرجى المحاولة لاحقاً.',
    500: 'عذراً، حدث خطأ في الخادم. نعمل على حل المشكلة.',
    503: 'عذراً، الخدمة غير متاحة حالياً. يرجى المحاولة لاحقاً.',
};

export default function Error({ status, message }: ErrorPageProps) {
    const title = titles[status] || 'خطأ غير معروف';
    const description = message || descriptions[status] || 'حدث خطأ غير متوقع.';

    return (
        <>
            <Head title={`${status} - ${title}`} />
            <div className="error-page">
                <div className="error-content">
                    <div className="error-code">{status}</div>
                    <h1 className="error-title">{title}</h1>
                    <p className="error-description">{description}</p>
                    <div className="error-actions">
                        <Link href="/" className="btn-home">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            العودة للرئيسية
                        </Link>
                        <button onClick={() => window.history.back()} className="btn-back">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                            الرجوع للخلف
                        </button>
                    </div>
                </div>

                <style>{`
                    .error-page {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
                        font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif;
                        direction: rtl;
                        padding: 2rem;
                    }
                    
                    .error-content {
                        text-align: center;
                        max-width: 600px;
                        animation: fadeInUp 0.6s ease-out;
                    }
                    
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    .error-code {
                        font-size: clamp(8rem, 20vw, 12rem);
                        font-weight: 900;
                        background: linear-gradient(135deg, #d4a74a 0%, #f5d89a 50%, #d4a74a 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        line-height: 1;
                        text-shadow: 0 0 80px rgba(212, 167, 74, 0.3);
                        animation: pulse 2s ease-in-out infinite;
                    }
                    
                    @keyframes pulse {
                        0%, 100% {
                            opacity: 1;
                        }
                        50% {
                            opacity: 0.8;
                        }
                    }
                    
                    .error-title {
                        font-size: clamp(1.5rem, 4vw, 2.5rem);
                        color: #ffffff;
                        margin: 1rem 0;
                        font-weight: 700;
                    }
                    
                    .error-description {
                        font-size: clamp(1rem, 2vw, 1.25rem);
                        color: #94a3b8;
                        margin-bottom: 2.5rem;
                        line-height: 1.8;
                    }
                    
                    .error-actions {
                        display: flex;
                        gap: 1rem;
                        justify-content: center;
                        flex-wrap: wrap;
                    }
                    
                    .btn-home, .btn-back {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 1rem 2rem;
                        font-size: 1rem;
                        font-weight: 600;
                        border-radius: 12px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-family: inherit;
                        text-decoration: none;
                    }
                    
                    .btn-home {
                        background: linear-gradient(135deg, #d4a74a 0%, #c9963d 100%);
                        color: #0f172a;
                        border: none;
                        box-shadow: 0 4px 20px rgba(212, 167, 74, 0.4);
                    }
                    
                    .btn-home:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 30px rgba(212, 167, 74, 0.5);
                    }
                    
                    .btn-back {
                        background: transparent;
                        color: #ffffff;
                        border: 2px solid rgba(255, 255, 255, 0.2);
                    }
                    
                    .btn-back:hover {
                        border-color: rgba(255, 255, 255, 0.4);
                        background: rgba(255, 255, 255, 0.05);
                        transform: translateY(-2px);
                    }
                    
                    .icon {
                        width: 1.25rem;
                        height: 1.25rem;
                    }
                    
                    @media (max-width: 480px) {
                        .error-actions {
                            flex-direction: column;
                        }
                        
                        .btn-home, .btn-back {
                            width: 100%;
                            justify-content: center;
                        }
                    }
                `}</style>
            </div>
        </>
    );
}
