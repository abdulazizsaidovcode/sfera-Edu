import SlightFlip from '@/components/magicui/flip-text';
import NotificationCard from './notificationcard';
import { useGet } from '@/context/logic/global_functions/useGetOption';
import { notification_all_view, notification_read } from '@/context/api/url';
import { config } from '@/context/api/token';
import { useEffect, useState } from 'react';
import { IoCheckmarkDone } from "react-icons/io5";
import { usePost } from '@/context/logic/global_functions/usePostOption';

// Sanani formatlash uchun funksiya
const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const Notification = () => {
    const { data, getData } = useGet(notification_all_view, config);
    const [dataID, setDataID] = useState<any>([]);
    const { postData } = usePost(notification_read, { ids: dataID }, config);

    useEffect(() => {
        getData();
    }, []);

    const markAllAsRead = async () => {
        // O'qilmagan xabarlarni yig'ish
        const unreadNotifications = data?.filter((notification: any) => !notification.read);

        // Agar o'qilmagan xabarlar bo'lsa, ID-larni yig'ib yuborish
        if (unreadNotifications?.length > 0) {
            const notificationIds = unreadNotifications.map((notification: any) => notification.id);
            setDataID(notificationIds); // ID-larni state-ga yuklash
            await postData(); // postData orqali yuborish
            getData(); // Xabarlarni o'qilgan qilib belgilash
            window.location.reload();
        }
    };

    return (
        <div className="p-6">
            <div className='flex justify-between'>
                <SlightFlip
                    justify='left'
                    word='Notification'
                    className="text-3xl font-bold mb-6 text-gray-800" />
                <IoCheckmarkDone
                    onClick={markAllAsRead}
                    size={30}
                    className='cursor-pointer'
                    color='#16423C'
                />
            </div>
            {data?.length > 0 ? (
                // Xabarlarni sanasi bo'yicha saralash
                data
                    .sort((a: any, b: any) => new Date(b.create).getTime() - new Date(a.create).getTime())
                    .map((notification: any) => (
                        <NotificationCard
                            key={notification?.id}
                            title={notification?.title}
                            message={notification?.content}
                            time={formatDate(notification?.create)} // Sanani formatlash
                            type={String(notification?.read)}
                        />
                    ))
            ) : (
                <p className="text-center text-gray-600">Sizda yangi xabarlar yo'q</p>
            )}
        </div>
    );
};

export default Notification;
