import SlightFlip from '@/components/magicui/flip-text';
import NotificationCard from './notificationcard';
import { useGet } from '@/context/logic/global_functions/useGetOption';
import { notification_all_view } from '@/context/api/url';
import { config } from '@/context/api/token';
import { useEffect } from 'react';
import { IoCheckmarkDone } from "react-icons/io5";

const Notification = () => {
    const { data, getData } = useGet(notification_all_view, config)
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="p-6">
            <div className='flex justify-between'>
                <SlightFlip
                    justify='left'
                    word='Notification'
                    className="text-3xl font-bold mb-6 text-gray-800" />
                <IoCheckmarkDone size={30} className='cursor-pointer' color='#16423C' />
            </div>
            {data?.length > 0 ? (
                data?.map((notification: any) => (
                    <NotificationCard
                        key={notification?.id}
                        title={notification?.title}
                        message={notification?.content}
                        time={notification?.create}
                        type={notification?.read}
                    />
                ))
            ) : (
                <p className="text-center text-gray-600">Sizda yangi xabarlar yo'q</p>
            )}
        </div>
    );
};

export default Notification;
