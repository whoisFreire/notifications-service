import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
  const notificationsRepository = new InMemoryNotificationsRepository();
  const cancelNotification = new CancelNotification(notificationsRepository);

  it('should be able to cancel a notification', async () => {
    const newNotification = makeNotification();

    await notificationsRepository.create(newNotification);

    await cancelNotification.execute({ notificationId: newNotification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification.', async () => {
    expect(() =>
      cancelNotification.execute({ notificationId: 'fakeId' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
