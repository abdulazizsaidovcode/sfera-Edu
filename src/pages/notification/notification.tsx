import NotificationCard from './notificationcard';

const Notification = () => {
  const notifications = [
    {
      id: 1,
      title: 'Xush kelibsiz!',
      message: 'Siz muvaffaqiyatli tizimga kirdingiz.',
      time: '5 daqiqa oldin',
      type: 'true',
    },
    {
      id: 2,
      title: 'Yangi yangilik',
      message: 'Yangilangan ma\'lumotlarni o\'qish uchun bosing.',
      time: '10 daqiqa oldin',
      type: 'true',
    },
    {
      id: 3,
      title: 'Xato yuz berdi',
      message: 'Ma\'lumot yuklanishida xato yuz berdi. Iltimos, qayta urinib ko\'ring.',
      time: '1 soat oldin',
      type: 'true',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Notification</h2>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            title={notification.title}
            message={notification.message}
            time={notification.time}
            type={notification.type}
          />
        ))
      ) : (
        <p className="text-center text-gray-600">Sizda yangi xabarlar yo'q</p>
      )}
    </div>
  );
};

export default Notification;
