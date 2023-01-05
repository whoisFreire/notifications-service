import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const unreadNotification = new UnreadNotification(notificationsRepository);

  it('should be able to unread a notification', async () => {
    const newNotification = makeNotification({ readAt: new Date() });

    await notificationsRepository.create(newNotification);

    await unreadNotification.execute({ notificationId: newNotification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able unread a non existing notification.', async () => {
    expect(() =>
      unreadNotification.execute({ notificationId: 'fakeId' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
